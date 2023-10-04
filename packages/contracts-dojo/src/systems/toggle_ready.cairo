#[system]
mod toggle_ready_system {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use dojo::world::Context;

    use dojo_examples::components::{Player, Duel, PlayerInDuel, TeamHero, TeamItem};
    use dojo_examples::constants::{TEAM_LENGTH};

    fn execute(ctx: Context, duel_entity: felt252) {
        let player_entity: felt252 = ctx.origin.into();

        let is_registered = get!(ctx.world, player_entity, (Player));

        assert(is_registered.value, 'NOT_REGISTERED_PLAYER');

        let mut duel_data = get!(ctx.world, duel_entity, (Duel));
        let mut player_in_duel_data = get!(ctx.world, player_entity, (PlayerInDuel));

        assert(player_in_duel_data.duel_entity != 0, 'NOT_IN_DUEL');
        assert(!duel_data.ongoing, 'DUEL_ONGOING');

        player_in_duel_data.ready = !player_in_duel_data.ready;

        set!(
            ctx.world,
            (
                player_in_duel_data
            )
        );
    }
}
