#[system]
mod config_hero_card_system {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::{Into, TryInto};
    use option::OptionTrait;
    use dojo::world::Context;

    use dojo_examples::components::{HeroCard, Name, Card, Image, CustomUniqueEntity};
    use dojo_examples::constants::{CARD_UNIQUE_ENTITY_TABLE_ID, CARD_HERO};

    #[derive(Serde, Drop, Copy, PartialEq)]
    struct HeroCardData {
        attack: u8,
        health: u8
    }

    fn execute(ctx: Context, name: felt252, image: felt252, data: HeroCardData) -> felt252 {
        let card_entity: felt252 = get_unique_entity(ctx, CARD_UNIQUE_ENTITY_TABLE_ID);
        set!(
            ctx.world,
            (
                Card {
                    id: card_entity,
                    value: CARD_HERO
                },
                Name {
                    id: card_entity,
                    value: name
                },
                Image {
                    id: card_entity,
                    value: image
                },
                HeroCard {
                    id: card_entity,
                    attack: data.attack,
                    health: data.health
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
