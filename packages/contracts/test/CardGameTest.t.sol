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
import { DuelPoints } from "../src/codegen/tables/DuelPoints.sol";

contract CardGameTest is MudTest {
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

    function testWorldExists() public {
        uint256 codeSize;
        address addr = worldAddress;
        assembly {
            codeSize := extcodesize(addr)
        }
        assertTrue(codeSize > 0);
    }

    function test_configHeroCard() public {
        bytes32 heroCardEntity = world.configHeroCard("Hero A", "/hero_default.png", HeroCardData(1, 2));
        HeroCardData memory heroCardData = HeroCard.get(world, heroCardEntity);

        assertEq(Name.get(world, heroCardEntity), "Hero A", "test_configHeroCard");
        assertEq(Image.get(world, heroCardEntity), "/hero_default.png", "test_configHeroCard");
        assertEq(heroCardData.attack, 1, "test_configHeroCard");
        assertEq(heroCardData.health, 2, "test_configHeroCard");
    }

    function test_configItemCard() public {
        bytes32 itemCardEntity = world.configItemCard("Item B", "/item_default.png", ItemCardData(1, 2, 3, 4));
        ItemCardData memory itemCardData = ItemCard.get(world, itemCardEntity);

        assertEq(Name.get(world, itemCardEntity), "Item B", "test_configItemCard");
        assertEq(Image.get(world, itemCardEntity), "/item_default.png", "test_configItemCard");
        assertEq(itemCardData.buff_attack, 1, "test_configItemCard");
        assertEq(itemCardData.buff_health, 2, "test_configItemCard");
        assertEq(itemCardData.debuff_attack, 3, "test_configItemCard");
        assertEq(itemCardData.debuff_health, 4, "test_configItemCard");
    }

    function test_registerPlayer() public {
        world.registerPlayer();
        assertEq(Player.get(playerEntity), true, "test_registerPlayer::1");
    }

    function test_createDuel() public {
        world.registerPlayer();
        bytes32 duelEntity = world.createDuel();

        DuelData memory duelDatum = Duel.get(world, duelEntity);

        assertEq(duelDatum.player0, playerEntity, "test_createDuel::1");
        assertEq(duelDatum.player1, bytes32(0), "test_createDuel::2");
        assertEq(duelDatum.deadline, 0, "test_createDuel::3");
        assertEq(duelDatum.ongoing, false, "test_createDuel::4");
        assertEq(duelDatum.player0Wins, 0, "test_createDuel::5");
        assertEq(duelDatum.player1Wins, 0, "test_createDuel::6");

        PlayerInDuelData memory playerInDuel = PlayerInDuel.get(playerEntity);

        assertEq(playerInDuel.duelEntity, duelEntity, "test_createDuel::7");
        assertEq(playerInDuel.ready, false, "test_createDuel::8");

        for (uint8 i = 0; i < CARD_LENGTH; i++) {
            assertEq(TeamHero.get(playerEntity, i), bytes32(0), "test_createDuel::9");
            assertEq(TeamItem.get(playerEntity, i), bytes32(0), "test_createDuel::10");
        }

    }

    function test_joinDuel() public {
        vm.startPrank(player0);
        world.registerPlayer();
        bytes32 duelEntity = world.createDuel();
        vm.stopPrank();

        vm.startPrank(player1);
        world.registerPlayer();
        world.joinDuel(duelEntity);
        vm.stopPrank();

        DuelData memory duelDatum = Duel.get(world, duelEntity);

        assertEq(duelDatum.player0, player0Entity, "test_joinDuel::1");
        assertEq(duelDatum.player1, player1Entity, "test_joinDuel::2");

        PlayerInDuelData memory playerInDuel = PlayerInDuel.get(player1Entity);

        assertEq(playerInDuel.duelEntity, duelEntity, "test_joinDuel::3");
        assertEq(playerInDuel.ready, false, "test_joinDuel::4");

        for (uint8 i = 0; i < CARD_LENGTH; i++) {
            assertEq(TeamHero.get(playerEntity, i), bytes32(0), "test_joinDuel::5");
            assertEq(TeamItem.get(playerEntity, i), bytes32(0), "test_joinDuel::6");
        }

    }

    function test_leaveDuel() public {
        world.registerPlayer();
        bytes32 duelEntity = world.createDuel();
        world.leaveDuel();

        DuelData memory duelDatum = Duel.get(world, duelEntity);

        assertEq(duelDatum.player0, 0, "test_leaveDuel::1");

        PlayerInDuelData memory playerInDuel = PlayerInDuel.get(player1Entity);

        assertEq(playerInDuel.duelEntity, bytes32(0), "test_leaveDuel::2");
        assertEq(playerInDuel.ready, false, "test_leaveDuel::3");

        for (uint8 i = 0; i < CARD_LENGTH; i++) {
            assertEq(TeamHero.get(playerEntity, i), bytes32(0), "test_leaveDuel::4");
            assertEq(TeamItem.get(playerEntity, i), bytes32(0), "test_leaveDuel::5");
        }
    }

    function test_toggleReady() public {
        world.registerPlayer();
        world.createDuel();
        world.toggleReady();

        bool isReady = PlayerInDuel.getReady(world, playerEntity);
        assertTrue(isReady);

        world.toggleReady();
        isReady = PlayerInDuel.getReady(world, playerEntity);
        assertEq(isReady, false, "test_toggleReady::1");

    }

    function test_startDuel() public {
        vm.startPrank(player0);
        world.registerPlayer();
        bytes32 duelEntity = world.createDuel();
        world.toggleReady();
        vm.stopPrank();

        vm.startPrank(player1);
        world.registerPlayer();
        world.joinDuel(duelEntity);
        world.toggleReady();

        uint256 duelRoundDeadline = DUEL_ROUND_DEADLINE + block.timestamp;

        world.startDuel();
        vm.stopPrank();

        DuelData memory duelDatum = Duel.get(world, duelEntity);
        assertEq(duelDatum.deadline, duelRoundDeadline, "test_startDuel::1");
        assertEq(duelDatum.ongoing, true, "test_startDuel::2");
    }

    function test_setRoundWinner() public {
        vm.startPrank(player0);
        world.registerPlayer();
        bytes32 duelEntity = world.createDuel();
        world.toggleReady();
        vm.stopPrank();

        vm.startPrank(player1);
        world.registerPlayer();
        world.joinDuel(duelEntity);
        world.toggleReady();
        world.startDuel();

        DuelData memory duelDatum = Duel.get(world, duelEntity);
        uint256 duelDeadline = DUEL_ROUND_DEADLINE + block.timestamp;
        vm.warp(duelDeadline);

        world.setRoundWinner(-1);
        duelDatum = Duel.get(world, duelEntity);
        duelDeadline = DUEL_ROUND_DEADLINE + block.timestamp;
        assertEq(duelDatum.deadline, duelDeadline, "test_setRoundWinner::1");
        vm.warp(duelDeadline);

        world.setRoundWinner(0);
        duelDatum = Duel.get(world, duelEntity);
        duelDeadline = DUEL_ROUND_DEADLINE + block.timestamp;
        assertEq(duelDatum.deadline, duelDeadline, "test_setRoundWinner::2");
        assertEq(duelDatum.player0Wins, 1, "test_setRoundWinner::3");
        vm.warp(duelDeadline);

        world.setRoundWinner(1);
        duelDatum = Duel.get(world, duelEntity);
        duelDeadline = DUEL_ROUND_DEADLINE + block.timestamp;
        assertEq(duelDatum.deadline, duelDeadline, "test_setRoundWinner::4");
        assertEq(duelDatum.player1Wins, 1, "test_setRoundWinner::5");
        vm.warp(duelDeadline);

        world.setRoundWinner(1);
        duelDatum = Duel.get(world, duelEntity);
        assertEq(duelDatum.deadline, 0, "test_setRoundWinner::6");
        assertEq(duelDatum.player0, player0Entity, "test_setRoundWinner::7");
        assertEq(duelDatum.player1, player1Entity, "test_setRoundWinner::8");
        assertEq(duelDatum.ongoing, false, "test_setRoundWinner::9");
        assertEq(duelDatum.player0Wins, 0, "test_setRoundWinner::10");
        assertEq(duelDatum.player1Wins, 0, "test_setRoundWinner::11");

        vm.stopPrank();

        uint256 player0DuelPoints = DuelPoints.get(world, player0Entity);
        assertEq(player0DuelPoints, 0, "test_setRoundWinner::12");

        uint256 player1DuelPoints = DuelPoints.get(world, player1Entity);
        assertEq(player1DuelPoints, 10, "test_setRoundWinner::13");

        // making sure round wins is empty when starting a new duel
        vm.startPrank(player0);
        world.toggleReady();
        vm.stopPrank();

        vm.startPrank(player1);
        world.toggleReady();
        world.startDuel();
        duelDatum = Duel.get(world, duelEntity);
        assertEq(duelDatum.player0Wins, 0, "test_setRoundWinner::14");
        assertEq(duelDatum.player1Wins, 0, "test_setRoundWinner::15");
        vm.stopPrank();
    }

    function test_placeToTeam() public {
        world.configHeroCard("Hero A", "/hero_default.png", HeroCardData(1, 2));
        world.configItemCard("Item B", "/item_default.png", ItemCardData(0, 0, 2, 2));
        world.configItemCard("Item F", "/item_default.png", ItemCardData(0, 0, 6, 7));
        world.configHeroCard("Hero B", "/hero_default.png", HeroCardData(2, 2));
        world.configHeroCard("Hero C", "/hero_default.png", HeroCardData(3, 7));
        world.configItemCard("Item C", "/item_default.png", ItemCardData(0, 0, 3, 7));
        world.configItemCard("Item D", "/item_default.png", ItemCardData(0, 0, 4, 6));
        world.configHeroCard("Hero D", "/hero_default.png", HeroCardData(4, 6));
        world.configItemCard("Item E", "/item_default.png", ItemCardData(0, 0, 4, 3));
        world.configHeroCard("Hero E", "/hero_default.png", HeroCardData(4, 3));
        world.configHeroCard("Hero F", "/hero_default.png", HeroCardData(6, 7));
        world.configItemCard("Item G", "/item_default.png", ItemCardData(0, 0, 2, 3));
        world.configHeroCard("Hero G", "/hero_default.png", HeroCardData(2, 3));
        world.configHeroCard("Hero H", "/hero_default.png", HeroCardData(8, 3));
        world.configItemCard("Item A", "/item_default.png", ItemCardData(0, 0, 1, 2));
        world.configItemCard("Item H", "/item_default.png", ItemCardData(0, 0, 8, 3));

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
    }
}
