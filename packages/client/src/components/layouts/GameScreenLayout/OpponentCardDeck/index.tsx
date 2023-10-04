import { clsx } from 'clsx'
import React from 'react'
import useDuelInfo from '../../../../hooks/useDuelInfo'
import BadgeContainer from '../ControlsAndBadge/BadgeContainer'
import DeckContainer from '../../../DeckContainer'
import { Entity } from '../../../../generated/graphql'
import { constants } from 'ethers'

export default function OpponentCardDeck() {
  const duelInfo = useDuelInfo()

    return (
        <div className={clsx(
            [
                'max-h-[292px] h-full',
                'mx-sm px-lg py-sm',
                'bg-gradient-darkviolet',
                'border-x border-b border-brand-brownAccent',
                'rounded-b-18',
                'flex flex-col',
            ],
          )}>

            <div className={clsx([
                    'flex gap-15',
                    'overflow-x-auto'
                ]
            )}>
              {
                duelInfo.opponentId !== constants.HashZero &&
                <DeckContainer playerEntity={duelInfo.opponentId as Entity}/>
              }
            </div>

          <div className={clsx(['flex justify-between items-center'])}>
            <h3 className={'text-pink'}>Opponent Cards</h3>

            <div className={clsx(['flex items-center gap-30'])}>
              {
                duelInfo.ongoing &&
                  <BadgeContainer isOpponent={true}/>
              }
            </div>
          </div>
        </div>
    )
}
