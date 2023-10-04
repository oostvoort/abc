import React from 'react'
import { clsx } from 'clsx'
import { Button } from '../../components/ui/button'
import GameScreenLayout from '../../components/layouts/GameScreenLayout'
import OpponentCardDeck
  from '../../components/layouts/GameScreenLayout/OpponentCardDeck'
import PlayerCardDeck
  from '../../components/layouts/GameScreenLayout/PlayerCardDeck'
import { useAbstracted } from '../../hooks/useAbstracted'
import useDuelInfo from '../../hooks/useDuelInfo'
import usePlayerInDuel from '../../hooks/usePlayerInDuel'
import { constants } from 'ethers'

export default function MatchWaitingRoom() {
  const playerInDuel = usePlayerInDuel()
  const {opponentId} = useDuelInfo()

  const hasOpponent =  opponentId !== constants.HashZero

  const {
        setup: {
            components: {
                PlayerInDuel,
            },
            systemCalls: {
                toggleReady,
                startDuel,
            },
            network: {
                playerEntity,
            },
            account: {account},
        },
        hooks: {
            useExtendedComponentValue,
        },
  } = useAbstracted()

  const opponentInDuel = useExtendedComponentValue(PlayerInDuel, [opponentId])

    return (
        <GameScreenLayout>
            <React.Fragment>
                {
                    hasOpponent && <OpponentCardDeck/>
                }

                <div className={clsx(
                    [
                        'flex flex-col flex-1 justify-center items-center',
                        'mx-sm py-sm',
                        {'justify-between': hasOpponent},
                    ],
                )}>
                    <div className={
                        clsx([
                            'flex items-center justify-center',
                            'min-w-[362px] min-h-[64px]',
                            'border border-brand-violet',
                            'bg-gradient-darkblue',
                            'rounded-15',
                            'text-pink',
                        ])
                    }>
                        {opponentInDuel?.ready ? 'Opponent is ready' : 'Waiting for opponent'}
                    </div>

                    {
                        playerInDuel.ready && opponentInDuel?.ready && (
                            <Button
                                size={'lg'}
                                className="w-full max-w-[362px] !rounded-15 border border-brand-violet bg-transparent text-brand-violet py-8"
                                onClick={() => startDuel()}
                            >
                                Start Duel
                            </Button>
                        )
                    }

                    <Button
                        className={clsx([
                            'text-lg',
                            {'hidden': !hasOpponent},
                        ])}
                        variant={'secondary'}
                        size={'outline'}
                        onClick={() => toggleReady(account ?? playerEntity)}
                    >
                        {playerInDuel.ready ? 'Unready' : 'Ready'}
                    </Button>
                </div>
                <PlayerCardDeck/>
            </React.Fragment>

        </GameScreenLayout>
    )
}
