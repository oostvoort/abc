import { mudConfig, resolveTableId } from "@latticexyz/world/register";

export default mudConfig({
  enums: {
    CardType: ["Unknown", "Hero", "Item"],
  },
  tables: {
    Counter: {
      keySchema: {
        playerId: "bytes32",
        index: "uint8",
      },
      schema: "uint32",
    },
    Player: {
      keySchema: {
        playerEntity: "bytes32",
      },
      schema: {
        isPlayer: "bool",
      },
    },
    Name: "string",
    Image: {
      keySchema: {
        entity: "bytes32",
      },
      schema: {
        link: "string",
      },
    },
    Ownership: {
      keySchema: {
        entity: "bytes32",
      },
      schema: {
        ownerEntity: "bytes32",
      },
    },
    CustomUniqueEntity: "uint256",
    DeckCard: {
      keySchema: {
        playerId: "bytes32",
        index: "uint8",
      },
      schema: {
        playerCardEntity: "bytes32",
      },
    },
    PlayerCard: {
      keySchema: {
        playerCardEntity: "bytes32",
      },
      schema: {
        cardEntity: "bytes32",
        exp: "uint256",
      },
    },
    Card: {
      keySchema: {
        cardEntity: "bytes32",
      },
      schema: {
        cardType: "CardType",
      },
    },
    HeroCard: {
      keySchema: {
        cardEntity: "bytes32",
      },
      schema: {
        attack: "uint8",
        health: "uint8",
      },
    },
    ItemCard: {
      keySchema: {
        cardEntity: "bytes32",
      },
      schema: {
        buff_attack: "uint8",
        buff_health: "uint8",
        debuff_attack: "uint8",
        debuff_health: "uint8",
      },
    },
    Duel: {
      keySchema: {
        duelEntity: "bytes32",
      },
      schema: {
        player0: "bytes32",
        player1: "bytes32",
        deadline: "uint256",
        ongoing: "bool",
        player0Wins: "uint8",
        player1Wins: "uint8"
      },
    },
    PlayerInDuel: {
      keySchema: {
        playerEntity: "bytes32",
      },
      schema: {
        duelEntity: "bytes32",
        ready: "bool"
      },
    },
    TeamHero: {
      keySchema: {
        playerId: "bytes32",
        index: "uint8",
      },
      schema: {
        playerCardEntity: "bytes32"
      },
    },
    TeamItem: {
      keySchema: {
        playerId: "bytes32",
        index: "uint8"
      },
      schema: "bytes32"
    },
    DuelPoints: {
      keySchema: {
        playerEntity: "bytes32"
      },
      schema: {
        points: "uint256"
      },
    },
  },
  modules: [
    {
      name: "UniqueEntityModule",
      root: true,
      args: [],
    },
    {
      name: "KeysWithValueModule",
      root: true,
      args: [resolveTableId("Player")],
    },
    {
      name: "KeysWithValueModule",
      root: true,
      args: [resolveTableId("Ownership")],
    },
  ]
});
