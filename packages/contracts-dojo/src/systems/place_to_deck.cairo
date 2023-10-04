#[system]
mod place_to_deck_system {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use dojo::world::Context;

    use dojo_examples::components::{DeckCard, Ownership, Player};

    fn execute(ctx: Context, card_entity: felt252, order: u8) {
        let player_entity: felt252 = ctx.origin.into();
        let is_registered = get!(ctx.world, player_entity, (Player));

        assert(is_registered.value, 'NOT_REGISTERED_PLAYER');

        let owner = get!(ctx.world, card_entity, (Ownership));

        assert(player_entity == owner.value, 'CARD_NOT_OWNER');

        set!(
                ctx.world,
                (
                    DeckCard {
                        player_id: player_entity,
                        index: order,
                        value: card_entity
                    },
                )
            );
    }
}
