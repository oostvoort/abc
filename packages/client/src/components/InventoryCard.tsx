import React from 'react'
import {useAbstracted} from '../hooks/useAbstracted'
import {ComponentValue, getComponentValueStrict, Has, HasValue,} from '@latticexyz/recs'
import {useEntityQuery} from '@latticexyz/react'
import {PlayerCardContainerProps} from '../types'
import {CardType} from '../atoms'
import {Entity} from '../generated/graphql'
import {HeroCardRenderer, ItemCardRenderer} from './DeckContainer'
import {clsx} from 'clsx'

export default function InventoryCard({ selectedIndex, onSelectedCard, playerEntity}: { playerEntity: Entity, selectedIndex?: Entity, onSelectedCard?: (playerCardEntity: Entity) => void }) {
  const {
    setup: {
      components: {
        Ownership,
        PlayerCard,
      },
    },
  } = useAbstracted()

  const playerCardEntities = useEntityQuery([
    Has(PlayerCard),
    HasValue(Ownership, { ownerEntity: playerEntity.toString() as any }),
  ])

  return (
    <>
      {
        playerCardEntities.length > 0
          ?
          <>
            {
              playerCardEntities.map((playerCardEntity, index) =>
                <PlayerCardContainer
                  className={clsx([{' border-brand-orange  rounded-xl border-[5px]': (selectedIndex === playerCardEntity)}])}
                  onClick={() => onSelectedCard?.(playerCardEntity as Entity)}
                  key={index}
                  playerCardEntity={playerCardEntity as Entity}
                />)
            }
          </>
          : <div
            className={clsx([ 'min-h-[100px] w-full flex-center', 'uppercase font-noto-sans text-xl' ])}>
            No Cards on your inventory
          </div>
      }
    </>
  )
}

const PlayerCardContainer = React.forwardRef<HTMLDivElement, PlayerCardContainerProps>(
  ({ className, playerCardEntity, ...props }, ref) => {

    const {
      setup: {
        components: {
          PlayerCard,
          Card,
        },
      },
    } = useAbstracted()

    const playerCardValue = getComponentValueStrict(PlayerCard, playerCardEntity.toString() as any)
      const cardValue: ComponentValue<{
      cardType: number
    }> = getComponentValueStrict(Card, playerCardValue.cardEntity.toString() as any) // get the {cardType}

    return (
      <div className={className} ref={ref} {...props}>
        {
          cardValue.cardType === CardType.Hero &&
          <HeroCardRenderer cardEntity={playerCardValue.cardEntity as Entity}/>
        }
        {
          cardValue.cardType === CardType.Item &&
          <ItemCardRenderer cardEntity={playerCardValue.cardEntity as Entity}/>
        }
      </div>
    )
  },
)

PlayerCardContainer.displayName = 'PlayerCardContainer'
