import React from 'react'
import {CrownIcon} from '../../../../Icon'
import {clsx} from 'clsx'
import {useAbstracted} from "../../../../../hooks/useAbstracted";
import {getComponentValueStrict} from '@latticexyz/recs'
import useLatestBlockTimestamp from "../../../../../hooks/useLatestBlockTimestamp";

export default function BadgeContainer({isOpponent}: {
  isOpponent?: boolean
}) {
  const {
    hooks: {
      useExtendedComponentValue
    },
    setup: {
      components: {
        PlayerInDuel,
        Duel
      },
      network: {
        playerEntity
      }
    }
  } = useAbstracted()

  const latestBlockTimestamp = useLatestBlockTimestamp()

  const crowns = Array.from({length: 3}, (_, index) => index)
  const playerInDuelData = getComponentValueStrict(PlayerInDuel, playerEntity.toString() as any) //returns the duelEntity = {duelEntity, ready}
  const duelData = useExtendedComponentValue(Duel, [playerInDuelData.duelEntity])

  const playerWins = duelData.player0 == playerEntity
      ? duelData.player0Wins
      : duelData.player1Wins

  const opponentWins = duelData.player0 != playerEntity
      ? duelData.player0Wins
      : duelData.player1Wins

  const timeRemaining: number | undefined = latestBlockTimestamp ? Number(duelData?.deadline) - latestBlockTimestamp : undefined
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isTimeRemainingLessThanZero = Boolean(timeRemaining < 0)
  const isPreparationPhase = !isTimeRemainingLessThanZero

  return (
      <div className={clsx(['flex items-center gap-x-60', {'gap-x-15': isPreparationPhase}])}>
        {
          crowns.map((num, index) => {
            return (
                <CrownIcon key={index} className={clsx([
                  'fill-brand-orange',
                  {'fill-brand-pink': (isOpponent ? opponentWins : playerWins) <= num},
                  {'fill-brand-pink/30': (isOpponent ? opponentWins : playerWins) <= num && isPreparationPhase},
                  {'h-[26px] w-[32px] ': isPreparationPhase},
                ])}/>
            )
          })
        }
      </div>
  )
}
