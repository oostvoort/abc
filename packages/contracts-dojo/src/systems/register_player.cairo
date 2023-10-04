#[system]
mod register_player_system {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use dojo::world::Context;

    use dojo_examples::components::Player;

    fn execute(ctx: Context) {
        set!(
            ctx.world,
            (
                Player {
                    id: ctx.origin.into(),
                    value: true
                },
            )
        );
        return ();
    }
}
