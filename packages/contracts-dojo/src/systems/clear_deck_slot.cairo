#[system]
mod clear_deck_slot_system {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use dojo::world::Context;

    use dojo_examples::components::{DeckCard, Player};

    fn execute(ctx: Context, order: u8) {
        let player_entity: felt252 = ctx.origin.into();
        let is_registered = get!(ctx.world, player_entity, (Player));

        assert(is_registered.value, 'NOT_REGISTERED_PLAYER');

        set!(
                ctx.world,
                (
                    DeckCard {
                        player_id: player_entity,
                        index: order,
                        value: 0
                    },
                )
            );
    }
}
