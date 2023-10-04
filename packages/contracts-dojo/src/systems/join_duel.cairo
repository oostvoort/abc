#[system]
mod join_duel_system {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use dojo::world::Context;
    use option::OptionTrait;

    use dojo_examples::components::{Player, Duel, PlayerInDuel, TeamHero, TeamItem};
    use dojo_examples::constants::{TEAM_LENGTH};

    fn execute(ctx: Context, duel_entity: felt252) {
        let player_entity: felt252 = ctx.origin.into();

        let is_registered = get!(ctx.world, player_entity, (Player));

        assert(is_registered.value, 'NOT_REGISTERED_PLAYER');

        let mut duel_data = get!(ctx.world, duel_entity, (Duel));

        assert(get_player_slot_in_duel(duel_data, player_entity).is_none(), 'PLAYER_ALREADY_IN_DUEL');

        let open_slot = get_duel_open_slot(duel_data);

        assert(open_slot.is_some(), 'DUEL_ROOM_FULL');
        let open_slot = open_slot.unwrap();
        if open_slot == 0 {
            duel_data.player0 = player_entity;
        } else {
            duel_data.player1 = player_entity;
        }

        set!(
            ctx.world,
            (
                duel_data,
                PlayerInDuel {
                    player_id: player_entity,
                    duel_entity: duel_entity,
                    ready: false
                }
            )
        );

        reset_team(ctx, player_entity);
    }

    fn get_player_slot_in_duel(duel: Duel, player_entity: felt252) -> Option<u8> {
        if duel.player0 == player_entity { Option::Some(0) }
        else if duel.player1 == player_entity { Option::Some(1) }
        else { Option::None }
    }

    fn get_duel_open_slot(duel: Duel) -> Option<u8> {
        if duel.player0 == 0 { Option::Some(0) }
        else if duel.player1 == 0 { Option::Some(1) }
        else { Option::None }
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
