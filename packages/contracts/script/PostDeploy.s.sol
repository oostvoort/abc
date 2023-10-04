// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "forge-std/console.sol";

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { IWorld } from "../src/codegen/world/IWorld.sol";
import { HeroCardData } from "../src/codegen/tables/HeroCard.sol";
import { ItemCardData } from "../src/codegen/tables/ItemCard.sol";
import { Card } from "../src/codegen/tables/Card.sol";
import { DeckCard } from "../src/codegen/tables/DeckCard.sol";
import { PlayerCard } from "../src/codegen/tables/PlayerCard.sol";
import { CardType } from "../src/codegen/Types.sol";
import { TeamHero } from "../src/codegen/tables/TeamHero.sol";
import { TeamItem } from "../src/codegen/tables/TeamItem.sol";

contract PostDeploy is Script {
  struct Hero {
    uint8 attack;
    uint8 health;
    string image;
    string name;
  }

  struct Item {
    uint8 buff_attack;
    uint8 buff_health;
    uint8 debuff_attack;
    uint8 debuff_health;
    string image;
    string name;
  }

  function run(address worldAddress) external {
//    IWorld world = IWorld(worldAddress);

    // Load the private key from the `PRIVATE_KEY` environment variable (in .env)
//    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

    // Start broadcasting transactions from the deployer account
//    vm.startBroadcast(deployerPrivateKey);

//    // get cards setup
//    string memory json = vm.readFile("startingDeckSetup.json");
//    Hero[] memory heroes = abi.decode(vm.parseJson(json, ".heroes"), (Hero[]));
//    Item[] memory items = abi.decode(vm.parseJson(json, ".items"), (Item[]));
//
//    // create all cards
//    for (uint i = 0; i < heroes.length; i++) {
//      Hero memory hero = heroes[i];
//      world.configHeroCard(hero.name, hero.image, HeroCardData(hero.attack, hero.health));
//    }
//
//    for (uint i = 0; i < items.length; i++) {
//      Item memory item = items[i];
//      world.configItemCard(item.name, item.image, ItemCardData(item.buff_attack, item.buff_health, item.debuff_attack, item.debuff_health));
//    }

//    world.mockUp();

//    vm.stopBroadcast();
  }
}
