import React from 'react'
import GameScreenLayout from '../../components/layouts/GameScreenLayout'
import OpponentCardDeck
  from '../../components/layouts/GameScreenLayout/OpponentCardDeck'
import PlayerCardDeck
  from '../../components/layouts/GameScreenLayout/PlayerCardDeck'
import { clsx } from 'clsx'
import { useAbstracted } from '../../hooks/useAbstracted'
import { decodeEntityWithIndex } from '../../lib/utils'
import useLatestBlockTimestamp from '../../hooks/useLatestBlockTimestamp'
import useDuelInfo from '../../hooks/useDuelInfo'
import { selectedCard_atom } from '../../atoms'
import { useAtom } from 'jotai'
import { Entity } from '../../generated/graphql'
import TeamDeckContainer from '../../components/TeamDeckContainer'
import OpponentTeamDeckContainer
  from '../../components/OpponentTeamDeckContainer'

export default function PreparationScreen() {
  const {
    setup: {
      network: {
        playerEntity,
      },
      account: { account },
      systemCalls: {
        placeToTeam,
      },
    },
  } = useAbstracted()

  const latestBlockTimestamp = useLatestBlockTimestamp()
  const duelInfo = useDuelInfo()

  const timeRemaining: number | undefined = latestBlockTimestamp ? Number(duelInfo?.deadline) - latestBlockTimestamp : undefined

  const [selectedCard, setSelectedCard] = useAtom(selectedCard_atom)

  const playerEntityExtended = account ? account : playerEntity

  React.useMemo(() => {
    if (selectedCard[0] != undefined && selectedCard[1] != undefined) {
      placeToTeam(playerEntityExtended, selectedCard[0], selectedCard[1]).finally(() => {
        setSelectedCard([undefined, undefined])
      })
    }
  }, [selectedCard])

  return (
    <GameScreenLayout>
      <React.Fragment>
        <OpponentCardDeck/>

        <div className={clsx(
          [
            'flex items-center flex-col flex-1',
            'mx-sm py-sm',
          ],
        )}>

          <h1 className={clsx([ 'text-pink text-6xl' ])}>Preparation</h1>
          <h3
            className={clsx(['h-[40px] text-center text-brand-white text-3xl uppercase font-bold font-noto-sans'])}>{timeRemaining !== undefined && timeRemaining < 0 ? '< 0' : timeRemaining}</h3>

          <div className={clsx(
            [
              'w-full',
              'mt-xs',
              'flex justify-between items-center gap-x-[100px]',
            ],
          )}>
            {/*Chosen Cards of Player*/}
            <div className={clsx(
              [
                'basis-1/2',
                'flex justify-end items-center gap-10 h-full',
              ],
            )}>

              <TeamDeckContainer
                playerEntity={playerEntity as Entity}
                selectedSlot={selectedCard[1]}
                setSelectedCard={(index) => {
                  setSelectedCard(
                    prev => ([
                      prev[0],
                      index
                    ])
                  )
                }}
              />
            </div>

            {/*Chosen Cards of Opponent*/}
            <div className={clsx(
              [
                'basis-1/2',
                'flex justify-start items-center gap-10',
              ],
            )}>
              <OpponentTeamDeckContainer
                playerEntity={duelInfo.opponentId as Entity}
                // opponentEntity={duelInfo.opponentId as Entity}
              />
            </div>
          </div>
        </div>

        <PlayerCardDeck
          selectedIndex={selectedCard[0]}
          onSelectedCard={(deckCardEntity) => {
            setSelectedCard(
              prev => ([
                Number(decodeEntityWithIndex(deckCardEntity.toString())[1]),
                prev[1]
              ])
            )
        }}/>
      </React.Fragment>
    </GameScreenLayout>
  )
}
