// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "forge-std/console.sol";

import { Script } from "forge-std/Script.sol";
import { IWorld } from "../src/codegen/world/IWorld.sol";
import { HeroCardData } from "../src/codegen/tables/HeroCard.sol";

contract CreateCard is Script {
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
        IWorld world = IWorld(worldAddress);

        // Load the private key from the `PRIVATE_KEY` environment variable (in .env)
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        world.configHeroCard("Alaric Thunderstrider", "Alaric_Thunderstrider.jpg", HeroCardData(9, 11));
        world.configHeroCard("Alarik Stormseeker", "Alarik_Stormseeker.jpg", HeroCardData(13, 7));
        world.configHeroCard("Aric Blackthorn", "Aric_Blackthorn.jpg", HeroCardData(8, 14));
        world.configHeroCard("Arion Flameheart", "Arion_Flameheart.jpg", HeroCardData(8, 7));
        world.configHeroCard("Baelgard Ironclaw", "Baelgard_Ironclaw.jpg", HeroCardData(10, 10));
        world.configHeroCard("Baelor Shadowstrike", "Baelor_Shadowstrike.jpg", HeroCardData(13, 6));
        world.configHeroCard("Branoc Ironfist", "Branoc_Ironfist.jpg", HeroCardData(12, 12));
        world.configHeroCard("Caelan Nightstalker", "Caelan_Nightstalker.jpg", HeroCardData(15, 10));
        world.configHeroCard("Caelum Frostwind", "Caelum_Frostwind.jpg", HeroCardData(10, 13));
        world.configHeroCard("Cedric Stormblade", "Cedric_Stormblade.jpg", HeroCardData(14, 9));
        world.configHeroCard("Corvus Ironthorn", "Corvus_Ironthorn.jpg", HeroCardData(6, 8));
        world.configHeroCard("Corwin Ironsoul", "Corwin_Ironsoul.jpg", HeroCardData(7, 9));
        world.configHeroCard("Darian Stonehelm", "Darian_Stonehelm.jpg", HeroCardData(10, 10));
        world.configHeroCard("Drakar Emberheart", "Drakar_Emberheart.jpg", HeroCardData(6, 15));
        world.configHeroCard("Draven Nightshade", "Draven_Nightshade.jpg", HeroCardData(7, 5));
        world.configHeroCard("Drystan Nightshroud", "Drystan_Nightshroud.jpg", HeroCardData(10, 13));
        world.configHeroCard("Ealdred Ironheart", "Ealdred_Ironheart.jpg", HeroCardData(9, 15));
        world.configHeroCard("Eamon Shadowweaver", "Eamon_Shadowweaver.jpg", HeroCardData(13, 11));
        world.configHeroCard("Eldric Emberheart", "Eldric_Emberheart.jpg", HeroCardData(10, 7));
        world.configHeroCard("Eldwin Ironsight", "Eldwin_Ironsight.jpg", HeroCardData(6, 14));
        world.configHeroCard("Elowyn Sunfire", "Elowyn_Sunfire.jpg", HeroCardData(10, 6));
        world.configHeroCard("Erevan Shadowblade", "Erevan_Shadowblade.jpg", HeroCardData(15, 11));
        world.configHeroCard("Evangeline Dragonfire", "Evangeline_Dragonfire.jpg", HeroCardData(13, 5));
        world.configHeroCard("Finnegan Moonrider", "Finnegan_Moonrider.jpg", HeroCardData(9, 9));
        world.configHeroCard("Finnian Fireforge", "Finnian_Fireforge.jpg", HeroCardData(10, 14));
        world.configHeroCard("Garrick Winterbane", "Garrick_Winterbane.jpg", HeroCardData(8, 9));
        world.configHeroCard("Gavric Emberforge", "Gavric_Emberforge.jpg", HeroCardData(6, 15));
        world.configHeroCard("Gavric Stormrider", "Gavric_Stormrider.jpg", HeroCardData(15, 9));
        world.configHeroCard("Hadrian Firewalker", "Hadrian_Firewalker.jpg", HeroCardData(6, 13));
        world.configHeroCard("Kaelen Frostfang", "Kaelen_Frostfang.jpg", HeroCardData(12, 13));
        world.configHeroCard("Kelan Stormwatcher", "Kelan_Stormwatcher.jpg", HeroCardData(10, 11));
        world.configHeroCard("Kyleric Stormfury", "Kyleric_Stormfury.jpg", HeroCardData(7, 10));
        world.configHeroCard("Lorcan Silverleaf", "Lorcan_Silverleaf.jpg", HeroCardData(13, 7));
        world.configHeroCard("Loric Fireheart", "Loric_Fireheart.jpg", HeroCardData(7, 14));
        world.configHeroCard("Loric Stormcaller", "Loric_Stormcaller.jpg", HeroCardData(12, 12));
        world.configHeroCard("Lyrion Windstrider", "Lyrion_Windstrider.jpg", HeroCardData(9, 9));
        world.configHeroCard("Orion Stormdancer", "Orion_Stormdancer.jpg", HeroCardData(14, 9));
        world.configHeroCard("Osric Frostbinder", "Osric_Frostbinder.jpg", HeroCardData(9, 13));
        world.configHeroCard("Rhodric Stormgazer", "Rhodric_Stormgazer.jpg", HeroCardData(5, 7));
        world.configHeroCard("Rhys Ironclad", "Rhys_Ironclad.jpg", HeroCardData(6, 12));
        world.configHeroCard("Rhys Ironforge", "Rhys_Ironforge.jpg", HeroCardData(10, 14));
        world.configHeroCard("Rhystan Shadowfist", "Rhystan_Shadowfist.jpg", HeroCardData(10, 11));
        world.configHeroCard("Seraphiel Stormweaver", "Seraphiel_Stormweaver.jpg", HeroCardData(10, 9));
        world.configHeroCard("Soren Moonshadow", "Soren_Moonshadow.jpg", HeroCardData(13, 14));
        world.configHeroCard("Sylvarion Ironcloak", "Sylvarion_Ironcloak.jpg", HeroCardData(8, 14));
        world.configHeroCard("Thalric Shadowshaper", "Thalric_Shadowshaper.jpg", HeroCardData(9, 14));
        world.configHeroCard("Thorian Shadowcaster", "Thorian_Shadowcaster.jpg", HeroCardData(8, 9));
        world.configHeroCard("Torian Grimhammer", "Torian_Grimhammer.jpg", HeroCardData(10, 10));
        world.configHeroCard("Torian Oakenshield", "Torian_Oakenshield.jpg", HeroCardData(14, 8));
        world.configHeroCard("Torin Frostbeard", "Torin_Frostbeard.jpg", HeroCardData(12, 8));
        world.configHeroCard("Tybalt Ironfang", "Tybalt_Ironfang.jpg", HeroCardData(5, 12));
        world.configHeroCard("Vaelris Thunderheart", "Vaelris_Thunderheart.jpg", HeroCardData(13, 10));
        world.configHeroCard("Valandor Shadowthorn", "Valandor_Shadowthorn.jpg", HeroCardData(7, 15));
        world.configHeroCard("Valdrin Frostcloak", "Valdrin_Frostcloak.jpg", HeroCardData(10, 13));
        world.configHeroCard("Valorian Thunderheart", "Valorian_Thunderheart.jpg", HeroCardData(15, 8));
        world.configHeroCard("Varion Nightwhisper", "Varion_Nightwhisper.jpg", HeroCardData(9, 10));
        world.configHeroCard("Xandor Shadowcaster", "Xandor_Shadowcaster.jpg", HeroCardData(13, 11));
        world.configHeroCard("Zandrik Ironheart", "Zandrik_Ironheart.jpg", HeroCardData(8, 13));
        world.configHeroCard("Zephyr Frostshard", "Zephyr_Frostshard.jpg", HeroCardData(15, 15));
        world.configHeroCard("Zephyron Ironclad", "Zephyron_Ironclad.jpg", HeroCardData(6, 7));

        vm.stopBroadcast();
    }
}