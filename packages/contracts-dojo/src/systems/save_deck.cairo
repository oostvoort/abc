#[system]
mod save_deck_system {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use dojo::world::Context;

    use dojo_examples::components::{DeckCard, Ownership, Player};
    use dojo_examples::constants::{DECK_LENGTH};

    fn execute(ctx: Context, cards: Array::<felt252>) {
        let player_entity: felt252 = ctx.origin.into();
        let is_registered = get!(ctx.world, player_entity, (Player));

        assert(is_registered.value, 'NOT_REGISTERED_PLAYER');

        let mut i = 0_u8;

        loop {
            if i >= DECK_LENGTH {
                break;
            }

            let card_entity = *cards.at(i.into());
            let owner = get!(ctx.world, card_entity, (Ownership));

            assert(player_entity == owner.value, 'CARD_NOT_OWNER');

            set!(
                ctx.world,
                (
                    DeckCard {
                        player_id: player_entity,
                        index: i,
                        value: card_entity
                    },
                )
            );

            i += 1;
        }
    }
}
