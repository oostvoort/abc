mod register_player;
mod reset_deck;
mod config_hero_card;
mod config_item_card;
mod open_pack;
mod place_to_deck;
mod save_deck;
mod clear_deck_slot;
mod create_duel;
mod join_duel;
mod leave_duel;
mod toggle_ready;
mod start_duel;
mod set_round_winner;
mod place_to_team;
mod mock_up;

use register_player::register_player_system;
use reset_deck::reset_deck_system;
use config_hero_card::config_hero_card_system;
use config_item_card::config_item_card_system;
use open_pack::open_pack_system;
use place_to_deck::place_to_deck_system;
use save_deck::save_deck_system;
use clear_deck_slot::clear_deck_slot_system;
use create_duel::create_duel_system;
use join_duel::join_duel_system;
use leave_duel::leave_duel_system;
use toggle_ready::toggle_ready_system;
use start_duel::start_duel_system;
use set_round_winner::set_round_winner_system;
use place_to_team::place_to_team_system;
use mock_up::mock_up_system;

#[system]
mod increment {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use dojo::world::Context;

    use dojo_examples::components::Counter;

    fn execute(ctx: Context, index: u8) -> u32 {
        let player_id: felt252 = ctx.origin.into();
        let mut counter = get !(ctx.world, (player_id, index).into(), (Counter));
        counter.value += 1;
        set!(
                ctx.world,
                (
                    Counter {
                    player_id,
                    index,
                    value: counter.value
                    }
                )
            );
        counter.value
    }
}