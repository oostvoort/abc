 // SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";

import { CustomUniqueEntity } from "../codegen/tables/CustomUniqueEntity.sol";
import { Player } from "../codegen/tables/Player.sol";
import { Ownership } from "../codegen/tables/Ownership.sol";
import { Name } from "../codegen/tables/Name.sol";
import { Card } from "../codegen/tables/Card.sol";
import { Image } from "../codegen/tables/Image.sol";
import { PlayerCard } from "../codegen/tables/PlayerCard.sol";
import { DeckCard } from "../codegen/tables/DeckCard.sol";
import { HeroCard, HeroCardData } from "../codegen/tables/HeroCard.sol";
import { CardType } from "../codegen/Types.sol";
import { Duel, DuelData } from "../codegen/tables/Duel.sol";
import { PlayerInDuel, PlayerInDuelData } from "../codegen/tables/PlayerInDuel.sol";
import { TeamHero } from "../codegen/tables/TeamHero.sol";

contract MockUpSystem is System {
    bytes32 public constant CARD_UNIQUE = bytes32(abi.encodePacked(bytes16(""), bytes16("Card")));
    bytes32 public constant PLAYER_CARD_UNIQUE = bytes32(abi.encodePacked(bytes16(""), bytes16("PlayerCard")));

    bytes32 constant public player1 = bytes32(uint256(uint160(address(0x70997970C51812dc3A010C7d01b50e0d17dc79C8)))); // 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
    bytes32 constant public player2 = bytes32(uint256(uint160(address(0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC)))); // 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
    bytes32 constant public player3 = bytes32(uint256(uint160(address(0x90F79bf6EB2c4f870365E785982E1f101E93b906)))); // 0x90F79bf6EB2c4f870365E785982E1f101E93b906
    bytes32 constant public player4 = bytes32(uint256(uint160(address(0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65)))); // 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65

    function mockUp() external {
        Player.set(player1, true);
        Player.set(player2, true);
        Player.set(player3, true);
        Player.set(player4, true);

        mockUp_heroCards("Hero A");
        mockUp_heroCards("Hero B");
        mockUp_heroCards("Hero C");
        mockUp_heroCards("Hero D");
        mockUp_heroCards("Hero E");
        mockUp_heroCards("Hero F");
        mockUp_heroCards("Hero G");
        mockUp_heroCards("Hero H");
        mockUp_heroCards("Hero I");
        mockUp_heroCards("Hero J");
        mockUp_heroCards("Hero K");
        mockUp_heroCards("Hero L");
        mockUp_heroCards("Hero M");
        mockUp_heroCards("Hero N");
        mockUp_heroCards("Hero O");
        mockUp_heroCards("Hero P");
        mockUp_heroCards("Hero Q");

        mockUp_playerCards(player1);
        mockUp_playerCards(player2);
        mockUp_playerCards(player3);
        mockUp_playerCards(player4);

        mockUp_duel();
    }

    function mockUp_heroCards(string memory name) internal {
        bytes32 cardEntity = _getUniqueEntity(CARD_UNIQUE);
        Card.set(cardEntity, CardType.Hero);
        Name.set(cardEntity, name);
        uint256 cardID = uint256(cardEntity);
        Image.set(cardEntity, string(abi.encodePacked("/", _uint256ToString(cardID), ".jpg")));
        uint256 rng = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.difficulty, cardEntity)));
        uint8 attack = uint8(rng) % 30;
        uint8 health = uint8(rng) % 40;
        HeroCard.set(cardEntity, attack, health);
    }

    // mint 15 cards
    function mockUp_playerCards(bytes32 playerEntity) internal {
        for (uint8 i = 0; i < 15; i++) {
            bytes32 playerCardEntity = _getUniqueEntity(PLAYER_CARD_UNIQUE);

            PlayerCard.set(playerCardEntity, bytes32(uint256(i + 1)), 0);
            Ownership.set(playerCardEntity, playerEntity);

            // max 12 cards per deck
            if (i < 12) {
                DeckCard.set(playerEntity, i, playerCardEntity);
            }
        }
    }

    function mockUp_duel() internal {
        bytes32 duelEntity = bytes32(uint256(99999999999999));

        Duel.set(duelEntity, player1, player2, 0, false, 1, 1);

        PlayerInDuel.set(player1, duelEntity, false);
        PlayerInDuel.set(player2, duelEntity, false);

        TeamHero.set(player1, 0, bytes32(uint256(1)));
        TeamHero.set(player1, 1, bytes32(uint256(2)));

        TeamHero.set(player2, 0, bytes32(uint256(16)));
        TeamHero.set(player2, 1, bytes32(uint256(17)));
    }

    function _getUniqueEntity(bytes32 tableId) internal returns (bytes32) {
        uint256 uniqueEntity = CustomUniqueEntity.get(tableId) + 1;
        CustomUniqueEntity.set(tableId, uniqueEntity);

        return bytes32(uniqueEntity);
    }

    function _uint256ToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }

        uint256 temp = value;
        uint256 digits;

        while (temp > 0) {
            digits++;
            temp /= 10;
        }

        bytes memory buffer = new bytes(digits);
        while (value > 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }

        return string(buffer);
    }
}