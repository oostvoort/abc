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

contract CardMintingTest is MudTest {
    IWorld public world;
    bytes32 public playerEntity;

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
    }

    function test_openPack() public {
        bytes32[] memory mintedCards = world.openPack(bytes32(uint256(1)));

        bytes32[] memory playerCards = getKeysWithValue(
            world,
            OwnershipTableId,
            Ownership.encode(playerEntity)
        );

        assertEq(playerCards.length, mintedCards.length, "test_openPack");
    }
}