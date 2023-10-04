// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/store/src/MudTest.sol";
import { getKeysWithValue } from "@latticexyz/world/src/modules/keyswithvalue/getKeysWithValue.sol";

import { IWorld } from "../src/codegen/world/IWorld.sol";
import { Player, PlayerTableId } from "../src/codegen/tables/Player.sol";
import { Name } from "../src/codegen/tables/Name.sol";
import { Image } from "../src/codegen/tables/Image.sol";
import { HeroCard, HeroCardData } from "../src/codegen/tables/HeroCard.sol";
import { ItemCard, ItemCardData } from "../src/codegen/tables/ItemCard.sol";
import { Duel, DuelData } from "../src/codegen/tables/Duel.sol";
import { PlayerInDuel, PlayerInDuelData } from "../src/codegen/tables/PlayerInDuel.sol";
import { TeamHero } from "../src/codegen/tables/TeamHero.sol";
import { TeamItem } from "../src/codegen/tables/TeamItem.sol";
import { CardType } from "../src/codegen/Types.sol";
import { Card } from "../src/codegen/tables/Card.sol";
import { PlayerCard } from "../src/codegen/tables/PlayerCard.sol";

contract ArrayOutOfBounds is MudTest {
    uint256 public constant CARD_LENGTH = 4;
    uint256 public constant DECK_LENGTH = 12;
    uint256 public constant PACK_LENGTH = 5;
    uint8 public constant DUEL_ROUND_DEADLINE = 45; // in secs

    IWorld public world;
    bytes32 public playerEntity;

    address public player0 = address(1);
    bytes32 public player0Entity = bytes32(uint256(uint160(address(1))));
    address public player1 = address(2);
    bytes32 public player1Entity = bytes32(uint256(uint160(address(2))));

    function setUp() public override {
        super.setUp();
        world = IWorld(worldAddress);
        playerEntity = bytes32(uint256(uint160(address(this))));
    }

    function testArrayOutOfBounds() public {
        uint packsNeeded = DECK_LENGTH / PACK_LENGTH + 1;

        vm.startPrank(player0);
        world.registerPlayer();
        bytes32[DECK_LENGTH] memory player1Deck;
        for (uint i = 0; i < packsNeeded; i++) {
            bytes32[] memory pack = world.openPack(bytes32(uint256(i)));
            for (uint j = i * PACK_LENGTH; j + i < DECK_LENGTH; j++) {
                player1Deck[j] = pack[j % PACK_LENGTH];
            }
        }
        world.saveDeck(player1Deck);
        bytes32 duelEntity = world.createDuel();
        world.toggleReady();
        vm.stopPrank();

        vm.startPrank(player1);
        world.registerPlayer();
        bytes32[DECK_LENGTH] memory player2Deck;
        for (uint i = 0; i < packsNeeded; i++) {
            bytes32[] memory pack = world.openPack(bytes32(uint256(i)));
            for (uint j = i * PACK_LENGTH; j + i < DECK_LENGTH; j++) {
                player2Deck[j] = pack[j % PACK_LENGTH];
            }
        }
        world.saveDeck(player2Deck);
        world.joinDuel(duelEntity);
        world.toggleReady();
        world.startDuel();
        vm.stopPrank();

        vm.startPrank(player0);
        uint8 heroCount = 0;
        uint8 itemCount = 0;
        for (uint8 i = 0; i < DECK_LENGTH && (heroCount < CARD_LENGTH || itemCount < CARD_LENGTH); i++) {
            bytes32 card = player1Deck[i];
            CardType cardType = Card.get(world, PlayerCard.get(world, card).cardEntity);
            if (cardType == CardType.Hero && heroCount < CARD_LENGTH) {
                world.placeToTeam(i, heroCount++);
            }
            else if (cardType == CardType.Item && itemCount < CARD_LENGTH) {
                world.placeToTeam(i, itemCount++);
            }
        }
        vm.stopPrank();

        vm.startPrank(player1);
        heroCount = 0;
        itemCount = 0;
        for (uint8 i = 0; i < DECK_LENGTH && (heroCount < CARD_LENGTH || itemCount < CARD_LENGTH); i++) {
            bytes32 card = player2Deck[i];
            CardType cardType = Card.get(world, PlayerCard.get(world, card).cardEntity);
            if (cardType == CardType.Hero && heroCount < CARD_LENGTH) {
                world.placeToTeam(i, heroCount++);
            }
            else if (cardType == CardType.Item && itemCount < CARD_LENGTH) {
                world.placeToTeam(i, itemCount++);
            }
        }

        DuelData memory duelDatum = Duel.get(world, duelEntity);
        uint256 duelDeadline = DUEL_ROUND_DEADLINE + block.timestamp;
        vm.warp(duelDeadline);

        bytes[] memory logs = world.getRoundLogs(duelEntity);
        for(uint i = 0; i < logs.length; i++) {
            console.logBytes(logs[i]);
        }

        vm.stopPrank();
    }
}
