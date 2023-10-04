#[system]
mod start_duel_system {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use dojo::world::Context;

    use dojo_examples::components::{Player, Duel, PlayerInDuel, TeamHero, TeamItem};
    use dojo_examples::constants::{DUEL_ROUND_DEADLINE};

    fn execute(ctx: Context) {
        let player_entity: felt252 = ctx.origin.into();

        let is_registered = get!(ctx.world, player_entity, (Player));

        assert(is_registered.value, 'NOT_REGISTERED_PLAYER');


        let player_in_duel_data = get!(ctx.world, player_entity, (PlayerInDuel));
        let mut duel_data = get!(ctx.world, player_in_duel_data.duel_entity, (Duel));
        let player0_player_in_duel = get!(ctx.world, duel_data.player0, (PlayerInDuel));
        let player1_player_in_duel = get!(ctx.world, duel_data.player1, (PlayerInDuel));

        assert(player0_player_in_duel.ready && player1_player_in_duel.ready, 'DUEL_PLAYER_NOT_READY');
        assert(!duel_data.ongoing, 'DUEL_ONGOING');

        duel_data.ongoing = true;

        set!(ctx.world,(duel_data));

        start_round(ctx);
    }

    fn start_round(ctx: Context) {
        let player_entity: felt252 = ctx.origin.into();
        let player_in_duel_data = get!(ctx.world, player_entity, (PlayerInDuel));
        let mut duel_data = get!(ctx.world, player_in_duel_data.duel_entity, (Duel));

        let block_timestamp: u256 = starknet::get_block_timestamp().into();

        assert(
             block_timestamp >= duel_data.deadline ||
                duel_data.deadline == 0,
            'DUEL_PREPARE_DEADLINE'
        );

        duel_data.deadline = block_timestamp + DUEL_ROUND_DEADLINE.into();
        set!(ctx.world,(duel_data));
    }
}
