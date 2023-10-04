#[system]
mod reset_deck_system {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use dojo::world::Context;

    use dojo_examples::components::DeckCard;
    use dojo_examples::constants::{DECK_LENGTH};

    fn execute(ctx: Context) {
        let mut i: u8 = 0;
        loop {
            if i >= DECK_LENGTH {
                break;
            }

            set!(
                ctx.world,
                (
                    DeckCard {
                        player_id: ctx.origin.into(),
                        index: i,
                        value: 0
                    },
                )
            );

            i += 1;
        }
    }
}
