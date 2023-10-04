#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

export DOJO_WORLD_ADDRESS="0x794bd3b318633d438f0eb6bea03f2f7a35ad6697026986dacbeaf4b4858604d"

# make sure all components/systems are deployed
COMPONENTS=("Counter" "Player" "Name" "Image" "Ownership" "CustomUniqueEntity" "DeckCard" "PlayerCard" "Card" "HeroCard" "ItemCard" "Duel" "PlayerInDuel" "TeamHero" "TeamItem")
SYSTEMS=("increment" "register_player_system" "reset_deck_system" "config_hero_card_system" "config_item_card_system" "open_pack_system" "place_to_deck_system" "save_deck_system" "clear_deck_slot_system" "create_duel_system" "join_duel_system" "leave_duel_system" "toggle_ready_system" "start_duel_system" "set_round_winner_system" "place_to_team_system" "mock_up_system")

# check components
for component in ${COMPONENTS[@]}; do
    sozo component entity $component
done

# check systems
for system in ${SYSTEMS[@]}; do
    SYSTEM_OUTPUT=$(sozo system get $system)
    if [[ "$SYSTEM_OUTPUT" == "0x0" ]]; then
        echo "Error: $system is not deployed"
        exit 1
    fi
done

# Iterate through components and systems
for component in ${COMPONENTS[@]}; do
    for system in ${SYSTEMS[@]}; do
        sozo auth writer $component $system
    done
done

sozo execute mock_up_system

echo "Default authorizations have been successfully set."
