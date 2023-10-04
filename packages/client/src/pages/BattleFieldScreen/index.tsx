import React, { Reducer } from 'react'
import GameScreenLayout from '../../components/layouts/GameScreenLayout'
import { clsx } from 'clsx'
import ControlsAndBadge
  from '../../components/layouts/GameScreenLayout/ControlsAndBadge'
import { useAbstracted } from '../../hooks/useAbstracted'
import { getComponentValueStrict } from '@latticexyz/recs'
import useCurrentPage from '../../hooks/useCurrentPage'
import useSetRoundWinner from '../../hooks/useSetRoundWinner'
import { WINNER } from '../../mud/createSystemCalls'
import { ACTIVE_PAGE } from '../../atoms'
import { decodeLog } from 'common'
import {
  ANIMATION_DURATION,
  BATTLE_STATUS,
  BATTLE_TRANSITION,
} from '../../constants'
import useDuelInfo from '../../hooks/useDuelInfo'
import { DuelLogOpCode } from 'common/src/types'
import TeamDeckContainer from '../../components/TeamDeckContainer'
import { Entity } from '../../generated/graphql'
import useGetRoundLogsQuery from '../../hooks/useGetRoundLogs'
import OpponentTeamDeckContainer
  from '../../components/OpponentTeamDeckContainer'

export default function BattleFieldScreen() {
  const {
    setup: {
      components: {
        PlayerInDuel,
      },
      network: {
        playerEntity,
      },
    },
  } = useAbstracted()

  const [battleStatus, dispatch] = React.useReducer<Reducer<BATTLE_STATUS, BATTLE_TRANSITION>>((prevState, action) => {
    switch (action) {
      case BATTLE_TRANSITION.FIGHT:
        return BATTLE_STATUS.FIGHTING
      case BATTLE_TRANSITION.SHOW_RESULT:
        return BATTLE_STATUS.RESULT
      default:
        return BATTLE_STATUS.INITIAL
    }}, BATTLE_STATUS.INITIAL)

  const [localRoundWinner, setLocalRoundWinner] = React.useState<string | undefined>(undefined)

  const playerInDuelValue = getComponentValueStrict(PlayerInDuel, playerEntity) //{duelEntity, ready}
  const setRoundWinner = useSetRoundWinner()
  const [ , setCurrentPage ] = useCurrentPage()
  const duelInfo = useDuelInfo()

  const resultCondition = localRoundWinner == playerEntity ? 'You win' : 'You lose'

  const getRoundLogs = useGetRoundLogsQuery(playerInDuelValue.duelEntity as `0x${string}`)
console.info("getRoundLogs", getRoundLogs.data);
  React.useEffect(() => {
        console.info(getRoundLogs.error)
        if (getRoundLogs.isSuccess) {
            getRoundLogs.data.map((log: string) => {
              const decodedLog = decodeLog(log)
              console.info("decodedLog", decodedLog);
              switch (decodedLog.opCode) {
                case DuelLogOpCode.ATTACK:
                  break;
                case DuelLogOpCode.ROUND_WINNER:
                  setLocalRoundWinner(decodedLog.winnerEntity)
                  break;
                case DuelLogOpCode.ROUND_LOSER:
                  break;
              }
            })
        }
    }, [getRoundLogs.data])

    if (localRoundWinner !== undefined) console.log('the winner: ', localRoundWinner)

    React.useMemo(() => {
        if (battleStatus == BATTLE_STATUS.INITIAL) {
            setTimeout(() => {
                dispatch(BATTLE_TRANSITION.FIGHT)
            }, 3000)
        }
        if (battleStatus == BATTLE_STATUS.FIGHTING) {
            setTimeout(() => {
                dispatch(BATTLE_TRANSITION.SHOW_RESULT)
            }, ANIMATION_DURATION.NORMAL * 1000)
        }
        if (battleStatus == BATTLE_STATUS.RESULT) {
            setTimeout(() => {
                setRoundWinner.mutateAsync(
                    localRoundWinner == duelInfo?.player0
                        ? WINNER.PLAYER0
                        : localRoundWinner == duelInfo?.player1
                            ? WINNER.PLAYER1
                            : WINNER.TIE
                ).finally(() => {
                  setCurrentPage(ACTIVE_PAGE.PREPARATION)
                })
            }, 3000)
        }
    }, [battleStatus])

    return (
        <GameScreenLayout>
            <React.Fragment>
                <ControlsAndBadge/>
                <div className={clsx(
                    [
                        'flex flex-col flex-1',
                        'mx-sm py-lg',
                    ],
                )}>
                    <h3
                        className={clsx(['text-center text-pink text-[100px] leading-[136px]'])}>
                        {
                          battleStatus == BATTLE_STATUS.INITIAL && 'Fight!'
                        }
                        {
                            // empty string
                            battleStatus == BATTLE_STATUS.FIGHTING && '‎'
                        }
                        {
                            battleStatus == BATTLE_STATUS.RESULT && resultCondition
                        }
                    </h3>

                    <div className={clsx(
                        [
                            'w-full',
                            'flex justify-between items-center gap-x-10',
                        ],
                    )}>
                        {/*Player Cards*/}
                        <div className={clsx(
                            [
                                'basis-1/2',
                                'flex justify-end items-center gap-2.5',
                            ],
                        )}>
                          <TeamDeckContainer
                            playerEntity={playerEntity as Entity}/>
                        </div>

                        {/*Opponent Cards*/}
                        <div className={clsx(
                            [
                                'basis-1/2',
                                'flex justify-start items-center gap-2.5',
                            ],
                        )}>
                          <OpponentTeamDeckContainer
                            playerEntity={duelInfo.opponentId as Entity}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </GameScreenLayout>
    )
}
