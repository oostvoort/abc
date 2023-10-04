#[system]
mod open_pack_system {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::{Into, TryInto};
    use option::OptionTrait;
    use dojo::world::Context;

    use dojo_examples::components::{PlayerCard, Ownership, CustomUniqueEntity, Player};
    use dojo_examples::constants::{CARD_UNIQUE_ENTITY_TABLE_ID, PLAYER_CARD_UNIQUE_ENTITY_TABLE_ID};

    fn execute(ctx: Context, pack: felt252) -> Array::<felt252> {
        let mut minted = ArrayTrait::new();
        let player_entity: felt252 = ctx.origin.into();

        let is_registered = get!(ctx.world, player_entity, (Player));

        assert(is_registered.value, 'NOT_REGISTERED_PLAYER');

        let mut i: u64 = 0;
        let pack: u64 = pack.try_into().unwrap();
        loop {
            if i >= 5 {
                break;
            }

            minted.append(
                mint_card(
                    ctx,
                    player_entity,
                    random_card(ctx, pack, i + 1)
                )
            );

            i += 1;
        };

        minted
    }

    fn random_card(ctx: Context, pack: u64, salt: u64) -> felt252 {
        let cards_count = get!(ctx.world, CARD_UNIQUE_ENTITY_TABLE_ID, (CustomUniqueEntity));
        let cards_count: u64 = cards_count.value.try_into().unwrap();

        assert(cards_count > 0, 'NO_CARDS');

        ((starknet::get_block_timestamp() + pack + salt ) % cards_count).into()
    }

    fn mint_card(ctx: Context, player_entity: felt252, link_card_entity: felt252) -> felt252 {
        let player_card_entity = get_unique_entity(ctx, PLAYER_CARD_UNIQUE_ENTITY_TABLE_ID);

        set!(
            ctx.world,
            (
                PlayerCard {
                    id: player_card_entity,
                    card_entity: link_card_entity,
                    exp: 0
                },
                Ownership {
                    id: player_card_entity,
                    value: player_entity
                }
            )
        );

        player_card_entity
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
}
