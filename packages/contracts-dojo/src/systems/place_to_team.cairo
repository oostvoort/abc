#[system]
mod place_to_team_system {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use dojo::world::Context;

    use dojo_examples::components::{Player, Duel, PlayerInDuel, DeckCard, PlayerCard, Card, TeamHero, TeamItem};
    use dojo_examples::constants::{CARD_UNKNOWN, CARD_HERO, CARD_ITEM};

    fn execute(ctx: Context, from_deck: u8, to_team: u8) {
        let player_entity: felt252 = ctx.origin.into();

        let is_registered = get!(ctx.world, player_entity, (Player));

        assert(is_registered.value, 'NOT_REGISTERED_PLAYER');


        let mut player_in_duel_data = get!(ctx.world, player_entity, (PlayerInDuel));
        let mut duel_data = get!(ctx.world, player_in_duel_data.duel_entity, (Duel));
        let card_entity = get!(ctx.world, (player_entity, from_deck).into(), (DeckCard));

        let block_timestamp: u256 = starknet::get_block_timestamp().into();

        assert(block_timestamp >= duel_data.deadline, 'DUEL_PREPARE_DEADLINE');

        let player_card_entity = get!(ctx.world, card_entity.value, (PlayerCard));
        let card_type = get!(ctx.world, player_card_entity.card_entity, (Card));

        if card_type.value == CARD_HERO {
            set!(ctx.world, (TeamHero { player_id: player_entity, index: to_team, value: card_entity.value }))
        } else if card_type.value == CARD_ITEM {
            set!(ctx.world, (TeamItem { player_id: player_entity, index: to_team, value: card_entity.value }))
        } else {
            assert(false, 'CARD_UNKNOWN')
        }
    }
}
