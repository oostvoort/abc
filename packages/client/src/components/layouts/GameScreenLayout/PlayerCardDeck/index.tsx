import {clsx} from 'clsx'
import React from 'react'
import {Button} from '../../../ui/button'
import {useAbstracted} from "../../../../hooks/useAbstracted";
import useDuelInfo from "../../../../hooks/useDuelInfo";
import BadgeContainer from '../ControlsAndBadge/BadgeContainer'
import {Entity} from "../../../../generated/graphql";
import DeckContainer from "../../../DeckContainer";
import { constants } from 'ethers'

export default function PlayerCardDeck({ selectedIndex, onSelectedCard}: { selectedIndex?: number, onSelectedCard?: (deckCardEntity: Entity) => void }) {
  const {
    hooks: {
      useExtendedComponentValue
    },
    setup: {
      components: {
        PlayerInDuel
      },
      network: {
        playerEntity
      },
      systemCalls: {
        leaveDuel
      }
    }
  } = useAbstracted()

  const duelInfo = useDuelInfo()
  const playerInDuel = useExtendedComponentValue(PlayerInDuel, [playerEntity])

  return (
    <div className={clsx([
        'max-h-[292px] h-full',
        'mx-sm px-lg pt-sm',
        'bg-gradient-darkblue',
        'border-x border-t border-brand-violet',
        'rounded-t-18',
        'flex flex-col',
      ])}
    >
      <div className={clsx(['flex justify-between items-center mb-xs'])}>
        <h3 className={'text-pink'}>Your Cards</h3>

        {
          !duelInfo?.ongoing ? (
            <Button
              disabled={playerInDuel.ready}
              onClick={async () => await leaveDuel()}
              className={clsx(
                [
                  'max-w-[137px] w-full max-h-[47px]',
                  'text-sm',
                  'rounded-lg',
                ],
              )}>
              Leave Game
            </Button>
            ) :
              <BadgeContainer isOpponent={false}/>
        }
      </div>
      {
        playerEntity !== constants.HashZero &&
        <DeckContainer
          playerEntity={playerEntity as Entity}
          selectedIndex={selectedIndex}
          onSelectedCard={onSelectedCard}
        />
      }

    </div>
    )
}
