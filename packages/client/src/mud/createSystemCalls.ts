import {ClientComponents} from './createClientComponents'
import {SetupNetworkResult} from './setupNetwork'
import {ethers} from 'ethers'

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export enum WINNER {
  TIE = -1,
  PLAYER0 = 0,
  PLAYER1 = 1,
}

export function createSystemCalls(
  { worldContract, waitForTransaction }: SetupNetworkResult,
  { Counter }: ClientComponents
) {
  const increment = async (account: string, index: any, entityId?: any) => {
    const tx = await worldContract.write.increment([index]);
    await waitForTransaction(tx);
  };

  const registerPlayer = async () => {
    const tx = await worldContract.write.registerPlayer();
    await waitForTransaction(tx);
  }

  const createDuel = async () => {
    const tx = await worldContract.write.createDuel();
    await waitForTransaction(tx);
  }

  const joinDuel = async (duelEntity: `0x${string}`) => {
    const tx = await worldContract.write.joinDuel([duelEntity]);
    await waitForTransaction(tx);
  }

  const leaveDuel = async () => {
    const tx = await worldContract.write.leaveDuel();
    await waitForTransaction(tx);
  }

  const openPack = async (pack: `0x${string}`) => {
    try {
      const tx = await worldContract.write.openPack([pack]);
      const {receipt} = await waitForTransaction(tx);

      const mintedPlayerCardEntities = []

      for (let i = 0; i < receipt.logs.length; i++) {
        const {topics, data} = receipt.logs[i]
        const iface = new ethers.utils.Interface(worldContract.abi)

        // TODO: make it constant
        if (receipt.logs[i].topics[0] === "0x912af873e852235aae78a1d25ae9bb28b616a67c36898c53a14fd8184504ee32") {
          const [, key,] = iface.decodeEventLog("StoreSetRecord", data, topics)
          mintedPlayerCardEntities.push(key[0])
        }
      }

      // return minted playerCardEntities
      return mintedPlayerCardEntities
    }
    catch (e) {
      throw new Error(`System call: Open pack function error: ${e?.message ?? e }`)
    }
  }

  const toggleReady = async (account: any) => {
    try {
      const tx = await worldContract.write.toggleReady();
      await waitForTransaction(tx);
      return tx
    }
    catch (e) {
      throw new Error(`System call: toggle ready function error ${e?.message ?? e }`)
    }
  }

  const startDuel = async () => {
    try {
      const tx = await worldContract.write.startDuel();
      await waitForTransaction(tx);
      return tx
    }
    catch (e) {
      throw new Error(`System call: start duel function error ${e?.message ?? e }`)
    }
  }

  const placeToTeam = async (account: any, fromDeck: number, toTeam: number) => {
    try {
      const tx = await worldContract.write.placeToTeam([fromDeck, toTeam]);
      await waitForTransaction(tx);
      return tx
    } catch (e) {
      throw new Error(`System call: place to team function error ${e?.message ?? e}`)
    }
  }

  const placeToDeck = async (playerCardEntity: `0x${string}`, order: number) => {
    try {
      const tx = await worldContract.write.placeToDeck([ playerCardEntity, order ])
      await waitForTransaction(tx)
      return tx
    }
    catch (e) {
      throw new Error(`System call: place to team function error ${e?.message ?? e }`)
    }
  }

  const clearDeckSlot = async (order: number) => {
    try {
      const tx = await worldContract.write.clearDeckSlot([ order ])
      await waitForTransaction(tx)
      return tx
    } catch (e) {
      throw new Error(`System call: place to team function error ${e?.message ?? e}`)
    }
  }

  const setRoundWinner = async (winner: WINNER) => {
    try {
      const tx = await worldContract.write.setRoundWinner([winner]);
      await waitForTransaction(tx);
      return tx
    }
    catch (e) {
      throw new Error(`System call: start round function error ${e?.message ?? e }`)
    }
  }

  const getRoundLogs = async (duelEntity: `0x${string}`) => {
    try {
      return await worldContract.read.getRoundLogs([duelEntity])
    }
    catch (e) {
      throw new Error(`System call: get round logs function error ${e?.message ?? e }`)
    }
  }

  return {
    increment,
    registerPlayer,
    createDuel,
    openPack,
    toggleReady,
    startDuel,
    placeToTeam,
    setRoundWinner,
    getRoundLogs,
    leaveDuel,
    joinDuel,
    placeToDeck,
    clearDeckSlot
  };
}
