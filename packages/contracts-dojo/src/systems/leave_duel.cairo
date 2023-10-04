#[system]
mod leave_duel_system {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use dojo::world::Context;

    use dojo_examples::components::{Player, Duel, PlayerInDuel, TeamHero, TeamItem};
    use dojo_examples::constants::{TEAM_LENGTH};

    fn execute(ctx: Context) {
        let player_entity: felt252 = ctx.origin.into();

        let is_registered = get!(ctx.world, player_entity, (Player));

        assert(is_registered.value, 'NOT_REGISTERED_PLAYER');


        let mut player_in_duel_data = get!(ctx.world, player_entity, (PlayerInDuel));
        let mut duel_data = get!(ctx.world, player_in_duel_data.duel_entity, (Duel));

        assert(!player_in_duel_data.ready, 'CANNOT_LEAVE_WHILE_READY');

        if duel_data.player0 == player_entity {
            duel_data.player0 = 0;
        } else if duel_data.player1 == player_entity {
            duel_data.player1 = 0;
        } else {
            // not sure how to revert yet
            assert(false, 'NOT_IN_DUEL');
        }

        set!(
            ctx.world,
            (
                duel_data,
                PlayerInDuel {
                    player_id: player_entity,
                    duel_entity: 0,
                    ready: false
                }
            )
        );

        reset_team(ctx, player_entity);
    }

    fn reset_team(ctx: Context, player_entity: felt252) {
        let mut i = 0_u8;
        loop {
            if i >= TEAM_LENGTH {
                break;
            }

            set!(
                ctx.world,
                (
                    TeamHero {
                        player_id: player_entity,
                        index: i,
                        value: 0
                    },
                    TeamItem {
                        player_id: player_entity,
                        index: i,
                        value: 0
                    }
                )
            );


            i += 1;
        }
    }
}
