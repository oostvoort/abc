use array::ArrayTrait;

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Counter {
    #[key]
    player_id: felt252,
    #[key]
    index: u8,
    value: u32
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Player {
    #[key]
    id: felt252,
    value: bool
}

trait PlayerTrait {
    fn is_registered(self: Player) -> bool;
}

impl PlayerImpl of PlayerTrait {
    fn is_registered(self: Player) -> bool {
        self.value
    }
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Name {
    #[key]
    id: felt252,
    value: felt252
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Image {
    #[key]
    id: felt252,
    value: felt252
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Ownership {
    #[key]
    id: felt252,
    value: felt252
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct CustomUniqueEntity {
    #[key]
    id: felt252,
    value: u256
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct DeckCard {
    #[key]
    player_id: felt252,
    #[key]
    index: u8,
    value: felt252
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct PlayerCard {
    #[key]
    id: felt252,
    card_entity: felt252,
    exp: u256
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Card {
    #[key]
    id: felt252,
    value: u8
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct HeroCard {
    #[key]
    id: felt252,
    attack: u8,
    health: u8
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct ItemCard {
    #[key]
    id: felt252,
    buff_attack: u8,
    buff_health: u8,
    debuff_attack: u8,
    debuff_health: u8
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Duel {
    #[key]
    id: felt252,
    player0: felt252,
    player1: felt252,
    deadline: u256,
    ongoing: bool,
    player0wins: u8,
    player1wins: u8
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct PlayerInDuel {
    #[key]
    player_id: felt252,
    duel_entity: felt252,
    ready: bool,
}


#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct TeamHero {
    #[key]
    player_id: felt252,
    #[key]
    index: u8,
    value: felt252
}

#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct TeamItem {
    #[key]
    player_id: felt252,
    #[key]
    index: u8,
    value: felt252
}