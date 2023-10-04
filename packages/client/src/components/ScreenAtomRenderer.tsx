import React from 'react'
import HomeScreen from '../pages/HomeScreen'
import BattleFieldScreen from '../pages/BattleFieldScreen'
import PreparationScreen from '../pages/PreparationScreen'
import ChooseNetwork from './ChooseNetwork'
import MatchWaitingRoom from '../pages/MatchWaitingRoom'
import { useAbstracted } from '../hooks/useAbstracted'
import useLatestBlockTimestamp from '../hooks/useLatestBlockTimestamp'
import useDuelInfo from '../hooks/useDuelInfo'
import usePlayerInDuel from '../hooks/usePlayerInDuel'
import usePlayerStatus from '../hooks/usePlayerStatus'
import { singletonEntity } from '@latticexyz/store-sync/recs'
import { Loader2 } from 'lucide-react'
import { constants } from 'ethers'
import LobbyScreen from '../pages/LobbyScreen'
import { useAtomValue } from 'jotai'
import { ACTIVE_PAGE, activePage_atom } from '../atoms'
import InventoryScreen from '../pages/InventoryScreen'
import BoosterPackScreen from '../pages/BoosterPackScreen'
import useLocalStorage from '../hooks/useLocalStorage'
import { useMainLayout } from './MainLayout'

export enum SyncStep {
  INITIALIZE = "initialize",
  SNAPSHOT = "snapshot",
  RPC = "rpc",
  LIVE = "live",
}

type SyncProgressType = {
  message: string,
  percentage: number,
  step: SyncStep,
  latestBlockNumber: number,
  lastBlockNumberProcessed: number,
}

export default function ScreenAtomRenderer() {
  const {
    network,
    setup: {
      components: {
        SyncProgress
      },
    },
    hooks: {
      useExtendedComponentValue
    }
  } = useAbstracted()

  const syncProgress: SyncProgressType = useExtendedComponentValue(SyncProgress, [singletonEntity], {
    message: "Connecting",
    percentage: 0,
    step: SyncStep.INITIALIZE,
    latestBlockNumber: 0n,
    lastBlockNumberProcessed: 0n,
  });

  const burnerWallet = localStorage.getItem('mud:burnerWallet')
  const latestBlockTimestamp = useLatestBlockTimestamp()
  const duelInfo = useDuelInfo()
  const playerInDuel = usePlayerInDuel()
  const player = usePlayerStatus()

  const timeRemaining: number | undefined = latestBlockTimestamp ? Number(duelInfo?.deadline) - latestBlockTimestamp : undefined

  const isTimeRemainingLessThanZero = Boolean(timeRemaining < 0)
  const isDuelOngoing = Boolean(duelInfo?.ongoing)
  const isPlayerRegistered = Boolean(player?.isPlayer)
  const isLive = Boolean(syncProgress.percentage == 100)

  const activePage = useAtomValue(activePage_atom)
  const {storedValue} = useMainLayout()

  const ConditionedScreen = React.useCallback(() => {
    if (!network) return <ChooseNetwork />

    if (!isPlayerRegistered) return <HomeScreen />

    if(storedValue){
      const currentPageName = ACTIVE_PAGE[storedValue]
      if(currentPageName === 'INVENTORY'){
        return  <InventoryScreen/>
      }else if(currentPageName === 'BOOSTER_PACK'){
        return <BoosterPackScreen/>
      }
    }else{
      if (!playerInDuel?.duelEntity || playerInDuel?.duelEntity === constants.HashZero) return <LobbyScreen/>

      if (playerInDuel?.duelEntity && !isDuelOngoing) return <MatchWaitingRoom />

      if (!isTimeRemainingLessThanZero) return <PreparationScreen />

      if (isTimeRemainingLessThanZero) return <BattleFieldScreen />
    }

    return <HomeScreen />
  }, [isTimeRemainingLessThanZero, network, isDuelOngoing, isPlayerRegistered, burnerWallet, activePage, storedValue, window, window?.localStorage])

  return (
    <>
      <ConditionedScreen/>
      {
        !isLive && (
          <div className='flex-1 flex flex-col gap-5 justify-center items-center bg-main fixed top-0 left-0 w-screen h-screen'>
            <Loader2 className='animate-spin w-52'/>
            {/*<p>{syncProgress.message}...</p>*/}
          </div>
        )
      }
    </>
  )
}
