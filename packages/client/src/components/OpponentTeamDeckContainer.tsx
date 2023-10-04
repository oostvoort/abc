import { Entity } from '../generated/graphql'
import { useAbstracted } from '../hooks/useAbstracted'
import { constants } from 'ethers'
import { ComponentValue } from '@latticexyz/recs'
import React from 'react'
import { PlayerCardContainerProps } from '../types'
import { CardType } from '../atoms'
import { BigHeroCardRenderer } from './DeckContainer'
import { EmptySlot } from './ui/card'
import useTeam from '../hooks/useTeam'

export default function OpponentTeamDeckContainer({ playerEntity }: {
  playerEntity: Entity
}) {
  const {playerCardValues, isTimeRemainingLessThanZero} = useTeam(playerEntity)

  return (
    <>
      {
        playerCardValues.map((playerCardValue, index) => {
          return (
            <>
              {
                playerCardValue && playerCardValue.playerCardEntity !== constants.HashZero
                  ? <OpponentCardContainer key={index}
                                           playerCardEntity={playerCardValue.playerCardEntity as Entity}/>
                  : !isTimeRemainingLessThanZero
                    ? <EmptySlot>
                      <img src={'/assets/svg/opponent-empty-card-slot.svg'}
                           alt={'Empty Card Slot SVG'}/>
                    </EmptySlot>
                    : null
              }
            </>
          )
        }).reverse()
      }
    </>
  )
}

const OpponentCardContainer = React.forwardRef<HTMLDivElement, PlayerCardContainerProps>(
  ({ playerCardEntity }, ref) => {
    const {
      hooks: {
        useExtendedComponentValue,
      },
      setup: {
        components: {
          PlayerCard,
          Card,
        },
      },
    } = useAbstracted()

    const playerCardData = useExtendedComponentValue(PlayerCard, [ playerCardEntity ]) //get the {cardEntity, exp}
    const cardValue: ComponentValue<{
      cardType: number
    }> = useExtendedComponentValue(Card, [ playerCardData.cardEntity ]) // get the {cardType}
    return (
      <div ref={ref}>
        {
          cardValue.cardType === CardType.Hero && <BigHeroCardRenderer
            cardEntity={playerCardData.cardEntity as Entity}/>
        }
      </div>
    )
  },
)

OpponentCardContainer.displayName = 'OpponentCardContainer'
