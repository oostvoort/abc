#[system]
mod set_round_winner_system {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use dojo::world::Context;

    use dojo_examples::components::{Player, Duel, PlayerInDuel};
    use dojo_examples::constants::{DUEL_ROUND_DEADLINE, WINNER_POINTS};
    use option::OptionTrait;

    fn execute(ctx: Context, winner: Option<u8>) {
        let player_entity: felt252 = ctx.origin.into();

        let is_registered = get!(ctx.world, player_entity, (Player));

        assert(is_registered.value, 'NOT_REGISTERED_PLAYER');


        let player_in_duel_data = get!(ctx.world, player_entity, (PlayerInDuel));
        let mut duel_data = get!(ctx.world, player_in_duel_data.duel_entity, (Duel));



        let mut wins: u8 = 0;

        if winner.is_some() {
            let winner = winner.unwrap();
            if winner == 0 {
                duel_data.player0wins += 1;
                wins = duel_data.player0wins;
            } else if winner == 1 {
                duel_data.player1wins += 1;
                wins = duel_data.player1wins;
            } else {
                assert(false, 'NOT_IN_DUEL')
            }
        }

        set!(ctx.world,(duel_data));

        if wins == WINNER_POINTS {
            set_duel_winner(ctx, player_in_duel_data.duel_entity, winner);
        } else {
            start_round(ctx);
        }

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

    fn set_duel_winner(ctx: Context, duel_entity: felt252, winner: Option<u8>) {
        let mut duel_data = get!(ctx.world, duel_entity, (Duel));

        assert(winner.is_some(), 'NOT_IN_DUEL');

        let winner = winner.unwrap();

        // TODO fill this in later
        if winner == 0 {

        } else if winner == 1 {

        } else {
            assert(false, 'NOT_IN_DUEL')
        }

        duel_data.deadline = 0;
        duel_data.ongoing = false;
        duel_data.player0wins = 0;
        duel_data.player1wins = 0;

        let mut player0_player_in_duel = get!(ctx.world, duel_data.player0, (PlayerInDuel));
        let mut player1_player_in_duel = get!(ctx.world, duel_data.player1, (PlayerInDuel));

        player0_player_in_duel.ready = false;
        player1_player_in_duel.ready = false;

        set!(ctx.world,(duel_data, player0_player_in_duel, player1_player_in_duel));

    }
}
