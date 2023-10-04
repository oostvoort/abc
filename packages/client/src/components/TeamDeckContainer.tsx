import { Entity } from '../generated/graphql'
import { useAbstracted } from '../hooks/useAbstracted'
import { constants } from 'ethers'
import { ComponentValue } from '@latticexyz/recs'
import {
  ButtonEmptySlotContainerProps,
  PlayerCardContainerProps,
} from '../types'
import React from 'react'
import { clsx } from 'clsx'
import { PlusSignIcon } from './Icon'
import { ButtonEmptySlot } from './ui/card'
import { CardType } from '../atoms'
import { BigHeroCardRenderer } from './DeckContainer'
import useTeam from '../hooks/useTeam'

interface TeamDectContainerProps {
  playerEntity: Entity,
  selectedSlot?: number
  setSelectedCard?: (teamIndex: number) => void
}

export default function TeamDeckContainer({
  playerEntity,
  selectedSlot,
  setSelectedCard,
}: TeamDectContainerProps) {
  const {
    playerCardValues,
    isTimeRemainingLessThanZero,
  } = useTeam(playerEntity)

  return (
    <>
      {
        playerCardValues.map((playerCardValue, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setSelectedCard?.(index)
              }}
            >
              {
                playerCardValue && playerCardValue.playerCardEntity !== constants.HashZero
                  ? <PlayerCardContainer
                      playerCardEntity={playerCardValue.playerCardEntity as Entity}
                      className={clsx([{'border-brand-orange  rounded-xl border-[5px]': index === selectedSlot}])}
                    />
                  : !isTimeRemainingLessThanZero
                    ? <ButtonEmptySlotContainer
                      selectedSlot={selectedSlot}
                      index={index}
                    />
                    : null
              }
            </div>
          )
        })
      }
    </>
  )
}

const PlayerCardContainer = React.forwardRef<
  HTMLDivElement, PlayerCardContainerProps
>(({className, playerCardEntity, ...props}, ref) => {
  const {
    hooks:{
      useExtendedComponentValue
    },
    setup: {
      components: {
        PlayerCard,
        Card,
      },
    }
  } = useAbstracted()

  const playerCardData = useExtendedComponentValue(PlayerCard, [playerCardEntity]) //get the {cardEntity, exp}
  const cardValue: ComponentValue<{ cardType: number }> = useExtendedComponentValue(Card, [playerCardData.cardEntity]) // get the {cardType}

  return (
    <div className={className} ref={ref} {...props}>
      {
        cardValue.cardType === CardType.Hero && <BigHeroCardRenderer cardEntity={playerCardData.cardEntity as Entity}/>
      }
    </div>
  )
})

PlayerCardContainer.displayName = 'PlayerCardContainer'

const ButtonEmptySlotContainer = React.forwardRef<
  HTMLDivElement, ButtonEmptySlotContainerProps
// eslint-disable-next-line react/prop-types
>(({className, selectedSlot, index, ...props}, ref) => {

  const isSelectedSlot = selectedSlot === index

  return (
    <div className={className} ref={ref} {...props}>
      <ButtonEmptySlot
        className={clsx(
          [
            'w-full min-w-[172px]',
            'h-full min-h-[230px]',
            {'border-brand-orange border-[5px]': isSelectedSlot}
          ])}
      >
        <PlusSignIcon
          className={clsx([{'fill-brand-orange': isSelectedSlot}, {'fill-brand-violetAccent03': !isSelectedSlot}])}/>
      </ButtonEmptySlot>
    </div>
  )
})

ButtonEmptySlotContainer.displayName = 'ButtonEmptySlotContainer'

