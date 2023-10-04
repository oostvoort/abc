// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/store/src/MudTest.sol";
import { getKeysWithValue } from "@latticexyz/world/src/modules/keyswithvalue/getKeysWithValue.sol";

import { IWorld } from "../src/codegen/world/IWorld.sol";
import { Name } from "../src/codegen/tables/Name.sol";
import { Image } from "../src/codegen/tables/Image.sol";
import { Ownership, OwnershipTableId } from "../src/codegen/tables/Ownership.sol";
import { HeroCard, HeroCardData } from "../src/codegen/tables/HeroCard.sol";
import { ItemCard, ItemCardData } from "../src/codegen/tables/ItemCard.sol";
import { DeckCard } from "../src/codegen/tables/DeckCard.sol";

contract BuildingDeckTest is MudTest {
    IWorld public world;
    bytes32 public playerEntity;
    bytes32[] public mintedCards;

    // used to check if reverting with the proper error code
    error CARD_NOT_OWNER();

    function setUp() public override {
        super.setUp();
        world = IWorld(worldAddress);
        playerEntity = bytes32(uint256(uint160(address(this))));

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

        world.registerPlayer();
        world.resetDeck();

        bytes32[] memory _mintedCards = world.openPack(bytes32(uint256(1)));
        for (uint256 i=0; i<_mintedCards.length; i++) mintedCards.push(_mintedCards[i]);

        _mintedCards = world.openPack(bytes32(uint256(1)));
        for (uint256 i=0; i<_mintedCards.length; i++) mintedCards.push(_mintedCards[i]);

        _mintedCards = world.openPack(bytes32(uint256(1)));
        for (uint256 i=0; i<_mintedCards.length; i++) mintedCards.push(_mintedCards[i]);
    }

    function test_placeToDeck_fromInventory() public {
        world.placeToDeck(mintedCards[0], 0);
        world.placeToDeck(mintedCards[1], 1);
        world.placeToDeck(mintedCards[2], 2);
        world.placeToDeck(mintedCards[3], 3);
        world.placeToDeck(mintedCards[4], 4);

        bytes32[12] memory deckData;
        for (uint8 i = 0; i < 12; i ++) {
            deckData[i] = DeckCard.get(playerEntity, i);
        }

        assertEq(deckData[0], mintedCards[0], "test_placeToDeck_fromInventory");
        assertEq(deckData[1], mintedCards[1], "test_placeToDeck_fromInventory");
        assertEq(deckData[2], mintedCards[2], "test_placeToDeck_fromInventory");
        assertEq(deckData[3], mintedCards[3], "test_placeToDeck_fromInventory");
        assertEq(deckData[4], mintedCards[4], "test_placeToDeck_fromInventory");
    }

    function test_placeToDeck_fromDeck() public {
        // switching the order of card
        // from order::0
        world.placeToDeck(mintedCards[0], 0);
        // any card in place will be replaced
        world.placeToDeck(mintedCards[1], 1);

        // to order::1
        world.placeToDeck(mintedCards[0], 1);

        bytes32[12] memory deckData;
        for (uint8 i = 0; i < 12; i ++) {
            deckData[i] = DeckCard.get(playerEntity, i);
        }

        assertEq(deckData[0], bytes32(0), "test_placeToDeck_fromDeck::1");
        assertEq(deckData[1], mintedCards[0], "test_placeToDeck_fromDeck::2");
    }

    function test_clearDeckSlot() public {
        world.placeToDeck(mintedCards[0], 0);

        world.clearDeckSlot(0);

        bytes32[12] memory deckData;
        for (uint8 i = 0; i < 12; i ++) {
            deckData[i] = DeckCard.get(playerEntity, i);
        }

        assertEq(deckData[0], bytes32(0), "test_clearDeckSlot::1");
    }

    function test_saveDeck() public {
        bytes32[12] memory deck;
        for (uint i = 0; i < 12; i++) {
            deck[i] = mintedCards[i];
        }
        world.saveDeck(deck);
        bytes32[12] memory deckData;
        for (uint8 i = 0; i < 12; i ++) {
            deckData[i] = DeckCard.get(playerEntity, i);
        }

        for (uint i = 0; i < 12; i++) {
            assertEq(deckData[i], deck[i], "test_saveDeck::1");
        }
    }

    function test_saveDeck_revertWhenUnowned() public {
        bytes32[12] memory deck;
        vm.expectRevert(CARD_NOT_OWNER.selector);
        world.saveDeck(deck);
    }
}