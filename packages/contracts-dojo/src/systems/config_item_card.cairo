#[system]
mod config_item_card_system {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::{Into, TryInto};
    use option::OptionTrait;
    use dojo::world::Context;

    use dojo_examples::components::{ItemCard, Name, Card, Image, CustomUniqueEntity};
    use dojo_examples::constants::{CARD_UNIQUE_ENTITY_TABLE_ID, CARD_ITEM};

    #[derive(Serde, Drop, Copy, PartialEq)]
    struct ItemCardData {
        buff_attack: u8,
        buff_health: u8,
        debuff_attack: u8,
        debuff_health: u8
    }

    fn execute(ctx: Context, name: felt252, image: felt252, data: ItemCardData) -> felt252 {
        let card_entity: felt252 = get_unique_entity(ctx, CARD_UNIQUE_ENTITY_TABLE_ID);
        set!(
            ctx.world,
            (
                Card {
                    id: card_entity,
                    value: CARD_ITEM
                },
                Name {
                    id: card_entity,
                    value: name
                },
                Image {
                    id: card_entity,
                    value: image
                },
                ItemCard {
                    id: card_entity,
                    buff_attack: data.buff_attack,
                    buff_health: data.buff_health,
                    debuff_attack: data.debuff_attack,
                    debuff_health: data.debuff_health
                }
            )
        );
        card_entity
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
