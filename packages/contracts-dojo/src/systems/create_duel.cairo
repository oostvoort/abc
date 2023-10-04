#[system]
mod create_duel_system {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::{Into, TryInto};
    use option::OptionTrait;
    use dojo::world::Context;

    use dojo_examples::components::{Player, Duel, CustomUniqueEntity, PlayerInDuel, TeamHero, TeamItem};
    use dojo_examples::constants::{DUEL_UNIQUE_ENTITY_TABLE_ID, TEAM_LENGTH};

    fn execute(ctx: Context) -> felt252 {
        let player_entity: felt252 = ctx.origin.into();

        let is_registered = get!(ctx.world, player_entity, (Player));

        assert(is_registered.value, 'NOT_REGISTERED_PLAYER');

        let duel_entity: felt252 = get_unique_entity(ctx, DUEL_UNIQUE_ENTITY_TABLE_ID);

        set!(
            ctx.world,
            (
                Duel {
                    id: duel_entity,
                    player0: player_entity,
                    player1: 0,
                    deadline: 0,
                    ongoing: false,
                    player0wins: 0,
                    player1wins: 0
                },
                PlayerInDuel {
                    player_id: player_entity,
                    duel_entity: duel_entity,
                    ready: false
                }
            )
        );

        reset_team(ctx, player_entity);

        return duel_entity;
    }

    fn get_unique_entity(ctx: Context, table_id: felt252) -> felt252 {
        let unique_entity = get!(ctx.world, table_id, (CustomUniqueEntity));
        let unique_entity = unique_entity.value + 1;
        set!(
            ctx.world,
            (
                CustomUniqueEntity {
                    id: table_id,
                    value: unique_entity
                }
            )
        );
        unique_entity.try_into().unwrap()
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
