#[system]
mod mock_up_system {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::{TryInto, Into};
    use dojo::world::Context;

    use dojo_examples::components::{Player, CustomUniqueEntity, Card, Name, Image, HeroCard, PlayerCard, Ownership, DeckCard, TeamHero, Duel, PlayerInDuel};
    use dojo_examples::constants::{CARD_UNIQUE_ENTITY_TABLE_ID, PLAYER_CARD_UNIQUE_ENTITY_TABLE_ID, CARD_HERO};
    use starknet::ContractAddress;
    use option::OptionTrait;

    fn execute(ctx: Context) {
        let player1 = starknet::contract_address_const::<0x33c627a3e5213790e246a917770ce23d7e562baa5b4d2917c23b1be6d91961c>();
        let player2 = starknet::contract_address_const::<0x1d98d835e43b032254ffbef0f150c5606fa9c5c9310b1fae370ab956a7919f5>();
        let player3 = starknet::contract_address_const::<0x697aaeb6fb12665ced647f7efa57c8f466dc3048556dd265e4774c546caa059>();
        let player4 = starknet::contract_address_const::<0x21b8eb1d455d5a1ef836a8dae16bfa61fbf7aaa252384ab4732603d12d684d2>();
        let player5 = starknet::contract_address_const::<0x18e623c4ee9f3cf93b06784606f5bc1e86070e8ee6459308c9482554e265367>();

        register_player(ctx, player1);
        register_player(ctx, player2);
        register_player(ctx, player3);
        register_player(ctx, player4);
        register_player(ctx, player5);

        mock_up_hero_cards(ctx, 'Hero A', '/1.jpg', 10);
        mock_up_hero_cards(ctx, 'Hero B', '/2.jpg', 20);
        mock_up_hero_cards(ctx, 'Hero C', '/3.jpg', 30);
        mock_up_hero_cards(ctx, 'Hero D', '/4.jpg', 15);
        mock_up_hero_cards(ctx, 'Hero E', '/5.jpg', 19);
        mock_up_hero_cards(ctx, 'Hero F', '/6.jpg', 12);
        mock_up_hero_cards(ctx, 'Hero G', '/7.jpg', 1);
        mock_up_hero_cards(ctx, 'Hero H', '/8.jpg', 8);
        mock_up_hero_cards(ctx, 'Hero I', '/9.jpg', 3);
        mock_up_hero_cards(ctx, 'Hero J', '/10.jpg', 4);
        mock_up_hero_cards(ctx, 'Hero K', '/11.jpg', 9);
        mock_up_hero_cards(ctx, 'Hero L', '/12.jpg', 67);
        mock_up_hero_cards(ctx, 'Hero M', '/13.jpg', 22);
        mock_up_hero_cards(ctx, 'Hero N', '/14.jpg', 25);
        mock_up_hero_cards(ctx, 'Hero O', '/15.jpg', 18);
        mock_up_hero_cards(ctx, 'Hero P', '/16.jpg', 2);
        mock_up_hero_cards(ctx, 'Hero Q', '/17.jpg', 28);

        mock_up_player_cards(ctx, player1.into());
        mock_up_player_cards(ctx, player2.into());
        mock_up_player_cards(ctx, player3.into());
        mock_up_player_cards(ctx, player4.into());

        mock_up_duel(ctx, player1.into(), player2.into());

    }

    fn register_player(ctx: Context, player: ContractAddress) {
        set!(
            ctx.world,
            (
                Player {
                    id: player.into(),
                    value: true
                },
            )
        );
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

    fn mock_up_hero_cards(ctx: Context, name: felt252, image: felt252, random_number: u8) {
        let card_entity = get_unique_entity(ctx, CARD_UNIQUE_ENTITY_TABLE_ID);
        let block_timestamp = starknet::get_block_timestamp();
        let card_id: u64 = card_entity.try_into().unwrap();
        let attack: u8 = random_number % 30;
        let health: u8 = random_number % 40;
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
                    attack: attack,
                    health: health
                }
            )
        )
    }

    fn mock_up_player_cards(ctx: Context, player_entity: felt252) {
        let mut i: u8 = 0;
        loop {
            if i >= 15 {
                break;
            }

            let player_card_entity = get_unique_entity(ctx, PLAYER_CARD_UNIQUE_ENTITY_TABLE_ID);

            set!(
                ctx.world,
                (
                    PlayerCard {
                        id: player_card_entity,
                        card_entity: i.into(),
                        exp: 0
                    },
                    Ownership {
                        id: player_card_entity,
                        value: player_entity
                    }
                )
            );

            if i < 12 {
                set!(
                    ctx.world,
                    (
                        DeckCard {
                            player_id: player_entity,
                            index: i,
                            value: player_card_entity
                        }
                    )
                )
            }

            i += 1;
        }
    }

    fn mock_up_duel(ctx: Context, player0: felt252, player1: felt252) {
        let duel_entity = 99999999999999;

        set!(
            ctx.world,
            (
                Duel {
                   id: duel_entity,
                   player0: player0,
                   player1: player1,
                   deadline: 0,
                   ongoing: false,
                   player0wins: 0,
                   player1wins: 0
                },
                PlayerInDuel {
                    player_id: player0,
                    duel_entity: duel_entity,
                    ready: false
                },
                PlayerInDuel {
                    player_id: player1,
                    duel_entity: duel_entity,
                    ready: false
                },
                TeamHero {
                    player_id: player0,
                    index: 0,
                    value: 1
                },
                TeamHero {
                    player_id: player0,
                    index: 0,
                    value: 2
                },
                TeamHero {
                    player_id: player1,
                    index: 0,
                    value: 16
                },
                TeamHero {
                    player_id: player1,
                    index: 0,
                    value: 17
                }
            )
        )
    }
}
