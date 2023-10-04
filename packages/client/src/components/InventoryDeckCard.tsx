import React from 'react'
import { useAbstracted } from '../hooks/useAbstracted'
import { constants } from 'ethers'
import {
  ComponentValue,
  getComponentValueStrict,
} from '@latticexyz/recs'
import { PlayerCardContainerProps } from '../types'
import { Entity } from '../generated/graphql'
import { CardType } from '../atoms'
import { HeroCardRenderer, ItemCardRenderer } from './DeckContainer'
import { clsx } from 'clsx'
import { ButtonEmptySlot } from './ui/card'
import { PlusSignIcon } from './Icon'
import useDeck from '../hooks/useDeck'

export default function InventoryDeckCard({ selectedSlot, setSelectedCard, playerEntity }: {
  selectedSlot?: number,
  setSelectedCard?: (playerCardEntity: Entity, index: number) => void
  playerEntity: Entity
}) {

  const {playerCardValues} = useDeck(playerEntity as Entity)

  return (
    <div className={clsx([ 'flex gap-15 ', 'overflow-x-auto mt-5 pb-xs' ])}>
      {
        playerCardValues.map((playerCardValue, index) =>
          <PlayerCardContainer
            className={clsx([ { ' border-brand-orange  rounded-xl border-[5px]': selectedSlot === index } ])}
            onClick={() => setSelectedCard?.(playerCardValue?.playerCardEntity as Entity, index)}
            key={index}
            playerCardEntity={playerCardValue?.playerCardEntity as Entity}
          />,
        )
      }
    </div>
  )
}

const PlayerCardContainer = React.forwardRef<
  HTMLDivElement, PlayerCardContainerProps
>(({ className, playerCardEntity, ...props }, ref) => {

  return (
    <div className={clsx([ className ])} ref={ref} {...props}>
      {
        playerCardEntity && playerCardEntity !== constants.HashZero as Entity ?
          <CardWrapper playerCardEntity={playerCardEntity}/>
          :
          <ButtonEmptySlot>
            <PlusSignIcon
              className={clsx([
                'fill-brand-violetAccent03',
              ])}
            />
          </ButtonEmptySlot>
      }
    </div>
  )
})

PlayerCardContainer.displayName = 'PlayerCardContainer'

const CardWrapper = React.forwardRef<HTMLDivElement, PlayerCardContainerProps>(
  ({ className, playerCardEntity, ...props }, ref) => {

    const {
      setup: {
        components: {
          PlayerCard,
          Card,
        },
      },
    } = useAbstracted()

    const playerCardValue = getComponentValueStrict(PlayerCard, playerCardEntity.toString() as any) //get the {cardEntity, exp}
    const cardValue: ComponentValue<{
      cardType: number
    }> = getComponentValueStrict(Card, playerCardValue.cardEntity.toString() as any) // get the {cardType}

    return (
      <div className={clsx([ className ])} ref={ref} {...props}>
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

CardWrapper.displayName = 'CardWrapper'

