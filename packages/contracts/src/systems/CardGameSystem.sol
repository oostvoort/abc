// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";

import { CustomUniqueEntity } from "../codegen/tables/CustomUniqueEntity.sol";
import { Ownership } from "../codegen/tables/Ownership.sol";
import { Player } from "../codegen/tables/Player.sol";
import { Card } from "../codegen/tables/Card.sol";
import { DeckCard } from "../codegen/tables/DeckCard.sol";
import { Name } from "../codegen/tables/Name.sol";
import { Image } from "../codegen/tables/Image.sol";
import { PlayerCard } from "../codegen/tables/PlayerCard.sol";
import { HeroCard, HeroCardData } from "../codegen/tables/HeroCard.sol";
import { ItemCard, ItemCardData } from "../codegen/tables/ItemCard.sol";
import { Duel, DuelData } from "../codegen/tables/Duel.sol";
import { PlayerInDuel, PlayerInDuelData } from "../codegen/tables/PlayerInDuel.sol";
import { CardType } from "../codegen/Types.sol";
import { TeamHero } from "../codegen/tables/TeamHero.sol";
import { TeamItem } from "../codegen/tables/TeamItem.sol";
import { DuelPoints } from "../codegen/tables/DuelPoints.sol";

library DuelLogOpCode {
    uint8 public constant ATTACK = 1;
    uint8 public constant DUEL_WINNER = 101;
    uint8 public constant ROUND_WINNER = 102;
    uint8 public constant ROUND_LOSER = 103;
}

library DuelLogLib {
    function attack(bytes[] memory logs, bytes32 from, bytes32 to, uint8 to_health) internal pure returns (bytes[] memory) {
        return log(logs, abi.encode(DuelLogOpCode.ATTACK, from, to, to_health));
    }

    function duelWinner(bytes[] memory logs, bytes32 winner) internal pure returns (bytes[] memory) {
        return log(logs, abi.encode(DuelLogOpCode.DUEL_WINNER, winner));
    }

    function roundWinner(bytes[] memory logs, bytes32 winner) internal pure returns (bytes[] memory) {
        return log(logs, abi.encode(DuelLogOpCode.ROUND_WINNER, winner));
    }

    function roundLoser(bytes[] memory logs, bytes32 winner) internal pure returns (bytes[] memory) {
        return log(logs, abi.encode(DuelLogOpCode.ROUND_LOSER, winner));
    }

    function log(bytes[] memory logs, bytes memory data) private pure returns (bytes[] memory) {
        bytes[] memory newLogs = new bytes[](logs.length + 1);
        for (uint256 i = 0; i < logs.length; i++) {
            newLogs[i] = logs[i];
        }
        newLogs[newLogs.length - 1] = data;
        return newLogs;
    }
}

library DuelPlayerStateLib {
    struct HeroCardState {
        uint8 attack;
        uint8 health;
    }

    struct DuelPlayerState {
        bytes32 playerEntity;
        uint8 heroInFrontIndex;
        bytes32[4] heroCardEntities;
        bytes32[4] itemCardEntities;
        HeroCardState[4] heroCardStates;
        bool winner;
        bool loser;
    }

    function initPlayer(DuelPlayerState memory self, bytes32 playerEntity) internal view {
        self.playerEntity = playerEntity;
        for (uint8 i = 0; i < 4; i++) {
            self.heroCardEntities[i] = TeamHero.get(playerEntity, i);
            self.itemCardEntities[i] = TeamItem.get(playerEntity, i);
        }
        populateHeroState(self);
    }

    function populateHeroState(DuelPlayerState memory self) private view {
        self.heroCardStates[0].attack = HeroCard.getAttack(PlayerCard.getCardEntity(self.heroCardEntities[0]));
        self.heroCardStates[1].attack = HeroCard.getAttack(PlayerCard.getCardEntity(self.heroCardEntities[1]));
        self.heroCardStates[2].attack = HeroCard.getAttack(PlayerCard.getCardEntity(self.heroCardEntities[2]));
        self.heroCardStates[3].attack = HeroCard.getAttack(PlayerCard.getCardEntity(self.heroCardEntities[3]));

        self.heroCardStates[0].health = HeroCard.getHealth(PlayerCard.getCardEntity(self.heroCardEntities[0]));
        self.heroCardStates[1].health = HeroCard.getHealth(PlayerCard.getCardEntity(self.heroCardEntities[1]));
        self.heroCardStates[2].health = HeroCard.getHealth(PlayerCard.getCardEntity(self.heroCardEntities[2]));
        self.heroCardStates[3].health = HeroCard.getHealth(PlayerCard.getCardEntity(self.heroCardEntities[3]));
    }

    function heroCardEntityInFront(DuelPlayerState memory self) internal pure returns (bytes32) {
        return self.heroCardEntities[self.heroInFrontIndex];
    }

    function heroCardStateInFront(DuelPlayerState memory self) internal pure returns (HeroCardState memory) {
        return self.heroCardStates[self.heroInFrontIndex];
    }

    function safeReduceHealthInFront(DuelPlayerState memory self, uint8 recvdAttack) internal pure {
        return safeReduceHealth(self, self.heroInFrontIndex, recvdAttack);
    }

    function safeReduceHealth(DuelPlayerState memory self, uint8 index, uint8 recvdAttack) internal pure {
        if (index >= self.heroCardStates.length) return; // it miss

        self.heroCardStates[index].health = safeCalcHealth(
            self.heroCardStates[index].health,
            recvdAttack
        );
    }

    function safeCalcHealth(uint8 health, uint8 attack) private pure returns (uint8) {
        return health > attack ? health - attack : 0;
    }

    /// @dev player update their hero in front, and evaluate if they lose
    function updateTeam(DuelPlayerState memory self) internal pure {
        // it will not out bounds because we already declare a loser and should exit the loop
        while (self.heroInFrontIndex < self.heroCardStates.length) {
            if (self.heroCardStates[self.heroInFrontIndex].health == 0) self.heroInFrontIndex += 1;
            else break;
        }

        // declare a loser to exit loop
        if (self.heroInFrontIndex >= self.heroCardStates.length) self.loser = true;
    }
}

contract CardGameSystem is System {
    using DuelLogLib for bytes[];
    using DuelPlayerStateLib for DuelPlayerStateLib.DuelPlayerState;

    bytes32 public constant CARD_UNIQUE_ENTITY_TABLE_ID = bytes32(abi.encodePacked(bytes16(""), bytes16("Card")));
    bytes32 public constant PLAYER_CARD_UNIQUE_ENTITY_TABLE_ID = bytes32(abi.encodePacked(bytes16(""), bytes16("PlayerCard")));
    bytes32 public constant DUEL_UNIQUE_ENTITY_TABLE_ID = bytes32(abi.encodePacked(bytes16(""), bytes16("Duel")));

    uint8 public constant DUEL_ROUND_DEADLINE = 45; // in secs

    uint8 public constant DECK_LENGTH = 12;
    uint8 public constant CARD_LENGTH = 4;

    uint8 public constant WINNER_POINTS = 3; // number of points needed to win
    uint256 public constant WINNER_PRIZE = 10;
    uint256 public constant LOSER_CONSEQUENCE = 5;

    error NOT_REGISTERED_PLAYER();
    error CARD_UNKNOWN();
    error NO_CARDS();
    error CARD_NOT_OWNER();
    error PLAYER_ALREADY_IN_DUEL();
    error DUEL_ROOM_FULL();
    error CANNOT_LEAVE_WHILE_READY();
    error DUEL_ONGOING();
    error DUEL_PREPARE_DEADLINE();
    error DUEL_PLAYER_NOT_READY();
    error NOT_IN_DUEL();
    error DUEL_NOT_READY();

    struct DuelVars {
        DuelPlayerStateLib.DuelPlayerState player0;
        DuelPlayerStateLib.DuelPlayerState player1;
    }

    /// ========================================================================
    /// Internal System
    /// ========================================================================

    function _getUniqueEntity(bytes32 tableId) internal returns (bytes32) {
        uint256 uniqueEntity = CustomUniqueEntity.get(tableId) + 1;
        CustomUniqueEntity.set(tableId, uniqueEntity);

        return bytes32(uniqueEntity);
    }

    function _getUniqueEntityCount(bytes32 tableId) internal view returns (uint256) {
        return CustomUniqueEntity.get(tableId);
    }

    /// ========================================================================
    /// Player System
    /// ========================================================================

    modifier RegisteredPlayer() {
        bytes32 playerEntity = bytes32(uint256(uint160(_msgSender())));
        if (Player.get(playerEntity) == false) revert NOT_REGISTERED_PLAYER();
        _;
    }

    function registerPlayer() external {
        bytes32 playerEntity = bytes32(uint256(uint160(_msgSender())));
        Player.set(playerEntity, true);
    }

    // @note Used to initialize and reset Deck setup
    function resetDeck() external {
        bytes32 playerEntity = bytes32(uint256(uint160(_msgSender())));
        for (uint8 i = 0; i < DECK_LENGTH; i++) {
            DeckCard.set(playerEntity, i, bytes32(0));
        }
    }

    /// ========================================================================
    /// Card System
    /// ========================================================================

    function configHeroCard(string memory name, string memory image, HeroCardData memory data) external returns (bytes32) {
        bytes32 cardEntity = _getUniqueEntity(CARD_UNIQUE_ENTITY_TABLE_ID);
        Card.set(cardEntity, CardType.Hero);
        Name.set(cardEntity, name);
        Image.set(cardEntity, image);
        HeroCard.set(cardEntity, data);
        return cardEntity;
    }

    function configItemCard(string memory name, string memory image, ItemCardData memory data) external returns (bytes32) {
        bytes32 cardEntity = _getUniqueEntity(CARD_UNIQUE_ENTITY_TABLE_ID);
        Card.set(cardEntity, CardType.Item);
        Name.set(cardEntity, name);
        Image.set(cardEntity, image);
        ItemCard.set(cardEntity, data);
        return cardEntity;
    }

    function openPack(bytes32 pack) external RegisteredPlayer returns (bytes32[] memory) {
        bytes32[] memory minted = new bytes32[](5);
        bytes32 playerEntity = bytes32(uint256(uint160(_msgSender())));

        minted[0] = _mintCard(playerEntity, _randomCard(pack, bytes32(uint256(1))));
        minted[1] = _mintCard(playerEntity, _randomCard(pack, bytes32(uint256(2))));
        minted[2] = _mintCard(playerEntity, _randomCard(pack, bytes32(uint256(3))));
        minted[3] = _mintCard(playerEntity, _randomCard(pack, bytes32(uint256(4))));
        minted[4] = _mintCard(playerEntity, _randomCard(pack, bytes32(uint256(5))));
        return minted;
    }

    function placeToDeck(bytes32 playerCardEntity, uint8 order) external RegisteredPlayer {
        bytes32 playerEntity = bytes32(uint256(uint160(_msgSender())));
        if (Ownership.get(playerCardEntity) != playerEntity) revert CARD_NOT_OWNER();

        for (uint8 i=0; i<DECK_LENGTH; i++) {
            bytes32 card = DeckCard.get(playerEntity, i);
            if (card == playerCardEntity) DeckCard.set(playerEntity, i, bytes32(0));
        }
        DeckCard.set(playerEntity, order, playerCardEntity);
    }

    function saveDeck(bytes32[12] memory cards) external RegisteredPlayer {
        bytes32 playerEntity = bytes32(uint256(uint160(_msgSender())));
        for (uint8 i = 0; i < DECK_LENGTH; i ++) {
            bytes32 cardEntity = cards[i];
            if (Ownership.get(cardEntity) != playerEntity) revert CARD_NOT_OWNER();
            DeckCard.set(playerEntity, i, cardEntity);
        }
    }

    function clearDeckSlot(uint8 order) external RegisteredPlayer {
        bytes32 playerEntity = bytes32(uint256(uint160(_msgSender())));
        DeckCard.set(playerEntity, order, bytes32(0));
    }

    function _randomCard(bytes32 pack, bytes32 salt) internal view returns (bytes32) {
        uint256 cardsCount = _getUniqueEntityCount(CARD_UNIQUE_ENTITY_TABLE_ID);

        if (cardsCount == 0) revert NO_CARDS();

        // generating randomId from timestamp, difficulty, msgSender and a salt;
        uint256 cardId = uint256(keccak256(abi.encodePacked(pack, block.timestamp, msg.sender, block.difficulty, salt))) % cardsCount;
        if (cardId == 0) {
            cardId += 1;
        }

        // cast to entity
        return bytes32(cardId);
    }

    function _mintCard(bytes32 playerEntity, bytes32 linkCardEntity) internal returns (bytes32) {
        bytes32 playerCardEntity = _getUniqueEntity(PLAYER_CARD_UNIQUE_ENTITY_TABLE_ID);

        PlayerCard.set(playerCardEntity, linkCardEntity, 0);
        Ownership.set(playerCardEntity, playerEntity);
        return playerCardEntity;
    }

    /// ========================================================================
    /// Battle System
    /// ========================================================================

    function createDuel() external RegisteredPlayer returns (bytes32) {
        bytes32 playerEntity = bytes32(uint256(uint160(_msgSender())));
        bytes32 duelEntity = _getUniqueEntity(DUEL_UNIQUE_ENTITY_TABLE_ID);

        Duel.set(duelEntity, playerEntity, bytes32(0), 0, false, 0, 0);
        PlayerInDuel.set(playerEntity, duelEntity, false);
        resetTeam(playerEntity);

        return duelEntity;
    }

    function joinDuel(bytes32 duelEntity) external RegisteredPlayer {
        bytes32 playerEntity = bytes32(uint256(uint160(_msgSender())));
        DuelData memory duelData = Duel.get(duelEntity);

        if (_getPlayerSlotInDuel(duelData, playerEntity) != -1) revert PLAYER_ALREADY_IN_DUEL();

        // fill open slot
        int8 _openSlot = _getDuelOpenSlot(duelData);
        if (_openSlot < 0) revert DUEL_ROOM_FULL();
        if (_openSlot == 0) Duel.setPlayer0(duelEntity, playerEntity);
        else Duel.setPlayer1(duelEntity, playerEntity);

        PlayerInDuel.set(playerEntity, duelEntity, false);
        resetTeam(playerEntity);
    }

    function leaveDuel() external RegisteredPlayer {
        bytes32 playerEntity = bytes32(uint256(uint160(_msgSender())));
        bytes32 duelEntity = _getDuelEntity(playerEntity);
        DuelData memory duelData = Duel.get(duelEntity);

        if (PlayerInDuel.getReady(playerEntity)) revert CANNOT_LEAVE_WHILE_READY();

        // remove from slot
        if (duelData.player0 == playerEntity) Duel.setPlayer0(duelEntity, bytes32(0));
        else if (duelData.player1 == playerEntity) Duel.setPlayer1(duelEntity, bytes32(0));
        else revert NOT_IN_DUEL();

        // remove data
        PlayerInDuel.set(playerEntity, bytes32(0), false);
        resetTeam(playerEntity);
    }

    function toggleReady() external RegisteredPlayer {
        bytes32 playerEntity = bytes32(uint256(uint160(_msgSender())));
        bytes32 duelEntity = _getDuelEntity(playerEntity);

        if (duelEntity == bytes32(0)) revert NOT_IN_DUEL();

        bool isOngoing = Duel.getOngoing(duelEntity);
        if (isOngoing) revert DUEL_ONGOING();

        bool isReady = PlayerInDuel.getReady(playerEntity);
        PlayerInDuel.setReady(playerEntity, !isReady);
    }

    function startDuel() external RegisteredPlayer {
        bytes32 playerEntity = bytes32(uint256(uint160(_msgSender())));
        bytes32 duelEntity = _getDuelEntity(playerEntity);

        bytes32 player0 = Duel.getPlayer0(duelEntity);
        bytes32 player1 = Duel.getPlayer1(duelEntity);

        if (!PlayerInDuel.getReady(player0)) revert DUEL_PLAYER_NOT_READY();
        if (!PlayerInDuel.getReady(player1)) revert DUEL_PLAYER_NOT_READY();

        bool isOngoing = Duel.getOngoing(duelEntity);
        if (isOngoing) revert DUEL_ONGOING();

        Duel.setOngoing(duelEntity, true);

        startRound();
    }

    function setRoundWinner(int8 winner) external RegisteredPlayer {
        if (winner < -1 || winner > 1) revert NOT_IN_DUEL();
        bytes32 playerEntity = bytes32(uint256(uint160(_msgSender())));
        bytes32 duelEntity = _getDuelEntity(playerEntity);
        uint256 deadline = Duel.getDeadline(duelEntity);

        if (
            !Duel.getOngoing(duelEntity) ||
            (block.timestamp < deadline)
        ) revert DUEL_NOT_READY();

        uint8 wins = 0;
        if (winner == 0) {
            wins = Duel.getPlayer0Wins(duelEntity) + 1;
            Duel.setPlayer0Wins(duelEntity, wins);
        } else if (winner == 1) {
            wins = Duel.getPlayer1Wins(duelEntity) + 1;
            Duel.setPlayer1Wins(duelEntity, wins);
        }

        if (wins == WINNER_POINTS) {
            setDuelWinner(duelEntity, winner);
        } else {
            startRound();
        }
    }

    function placeToTeam(uint8 fromDeck, uint8 toTeam) external RegisteredPlayer {
        bytes32 playerEntity = bytes32(uint256(uint160(_msgSender())));
        bytes32 cardEntity = DeckCard.get(playerEntity, fromDeck);

        bytes32 duelEntity = _getDuelEntity(playerEntity);

        uint256 deadline = Duel.getDeadline(duelEntity);
        if (deadline < block.timestamp) revert DUEL_PREPARE_DEADLINE();

        CardType cardType = Card.get(PlayerCard.get(cardEntity).cardEntity);
        if (cardType == CardType.Hero) TeamHero.set(playerEntity, toTeam, cardEntity);
        else if (cardType == CardType.Item) TeamItem.set(playerEntity, toTeam, cardEntity);
        else revert CARD_UNKNOWN();
    }

    function getRoundLogs(bytes32 duelEntity) external view returns (bytes[] memory) {
        bytes[] memory logs;

        DuelVars memory vars;

        DuelData memory duelData = Duel.get(duelEntity);

        vars.player0.initPlayer(duelData.player0);
        vars.player1.initPlayer(duelData.player1);

        while (true) {
            // update team health
            // and declare if the player lose
            vars.player0.updateTeam();
            vars.player1.updateTeam();

            // for simplicity we did a player-self evaluation if they lose or not
            // player lose condition is they have no more hero in their team
            // draw is implicitly both player lose

            if (vars.player0.loser && vars.player1.loser) {
                logs = logs.roundLoser(vars.player0.playerEntity);
                logs = logs.roundLoser(vars.player1.playerEntity);
                break;
            } else if (vars.player0.loser) {
                logs = logs.roundLoser(vars.player0.playerEntity);
                logs = logs.roundWinner(vars.player1.playerEntity);
                break;
            } else if (vars.player1.loser) {
                logs = logs.roundWinner(vars.player0.playerEntity);
                logs = logs.roundLoser(vars.player1.playerEntity);
                break;
            }

            // TODO: implement skill here

            // normal attacks
            // Player1 attacks Player0
            vars.player0.safeReduceHealthInFront(
                vars.player1.heroCardStateInFront().attack
            );

            logs = logs.attack(
                vars.player0.heroCardEntityInFront(),
                vars.player1.heroCardEntityInFront(),
                vars.player0.heroCardStateInFront().health
            );

            // Player0 attacks Player1
            vars.player1.safeReduceHealthInFront(
                vars.player0.heroCardStateInFront().attack
            );

            logs = logs.attack(
                vars.player1.heroCardEntityInFront(),
                vars.player0.heroCardEntityInFront(),
                vars.player1.heroCardStateInFront().health
            );
        }

        return logs;
    }

    function resetTeam(bytes32 playerEntity) internal {
        for (uint8 i = 0; i < CARD_LENGTH; i++) {
            TeamHero.set(playerEntity, i, bytes32(0));
            TeamItem.set(playerEntity, i, bytes32(0));
        }
    }

    function startRound() internal {
        bytes32 playerEntity = bytes32(uint256(uint160(_msgSender())));
        bytes32 duelEntity = _getDuelEntity(playerEntity);

        uint256 deadline = Duel.getDeadline(duelEntity);
        if (block.timestamp >= deadline ) {
            Duel.setDeadline(duelEntity, block.timestamp + DUEL_ROUND_DEADLINE);
        }
    }

    function setDuelWinner(bytes32 duelEntity, int8 winner) internal {
        if (winner < 0 || winner > 1) revert NOT_IN_DUEL();

        bytes32 player0 = Duel.getPlayer0(duelEntity);
        bytes32 player1 = Duel.getPlayer1(duelEntity);

        bytes32 winningPlayer = winner == 0 ? player0 : player1;
        uint256 winningPlayerPoints = DuelPoints.get(winningPlayer) + WINNER_PRIZE;
        DuelPoints.set(winningPlayer, winningPlayerPoints);

        bytes32 losingPlayer = winner == 1 ? player0 : player1;
        uint256 losingPlayerPoints = DuelPoints.get(losingPlayer);
        losingPlayerPoints = losingPlayerPoints < LOSER_CONSEQUENCE ? 0 : losingPlayerPoints - LOSER_CONSEQUENCE;
        DuelPoints.set(losingPlayer, losingPlayerPoints);

        Duel.set(duelEntity, player0, player1, 0, false, 0, 0);
        PlayerInDuel.setReady(player0, false);
        PlayerInDuel.setReady(player1, false);
    }

    function _getDuelOpenSlot(DuelData memory _duel) internal pure returns (int8) {
        if (_duel.player0 == 0) return 0;
        if (_duel.player1 == 0) return 1;
        else return -1;
    }

    function _getPlayerSlotInDuel(DuelData memory _duel, bytes32 playerEntity) internal pure returns (int8) {
        if (_duel.player0 == playerEntity) return 0;
        if (_duel.player1 == playerEntity) return 1;
        else return -1;
    }

    function _getDuelEntity(bytes32 playerEntity) internal view returns (bytes32) {
        return PlayerInDuel.getDuelEntity(playerEntity);
    }
}
