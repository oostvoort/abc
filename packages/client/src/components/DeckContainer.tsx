import React from 'react'
import {ComponentValue, getComponentValueStrict,} from '@latticexyz/recs'
import {Entity} from '../generated/graphql'
import {useAbstracted} from '../hooks/useAbstracted'
import {constants} from 'ethers'
import {CardType} from '../atoms'
import {Attributes, Card, CardAttributes, CardImage,} from './ui/card'
import {clsx} from 'clsx'
import {CardInterface, PlayerCardContainerProps} from '../types'
import useDeck from "../hooks/useDeck";
import useCard from "../hooks/useCard";

export default function DeckContainer({playerEntity, selectedIndex, onSelectedCard}: {
  playerEntity: Entity,
  selectedIndex?: number,
  onSelectedCard?: (deckCardEntity: Entity) => void
}) {
  const {deckCardEntities, playerCardValues} = useDeck(playerEntity as Entity)

  return (
    <div className={clsx([
      'mb-5 pb-xs',
      'flex gap-15',
      'overflow-x-auto'
    ])}>

      {
        playerCardValues.map((playerCardValue, index) => {
          return (
            <React.Fragment key={index}>
              {
                playerCardValue && playerCardValue.playerCardEntity !== constants.HashZero as Entity ?
                  <PlayerCardContainer
                    className={clsx([ { 'border-brand-orange  rounded-xl border-[5px]': index === selectedIndex } ])}
                    onClick={() => onSelectedCard?.(deckCardEntities[index] as Entity)}
                    key={index}
                    index={index}
                    playerCardEntity={playerCardValue.playerCardEntity as Entity}/>
                  :
                    <div className={clsx(['h-[160px] w-[160px] rounded-xs border border-brand-navyblue shadow-card bg-brand-navyblue/50'])}/>
              }
            </React.Fragment>
          )
        })
      }
    </div>
  )
}

const PlayerCardContainer = React.forwardRef<
  HTMLDivElement,
  PlayerCardContainerProps
// eslint-disable-next-line react/prop-types
>(({className, playerCardEntity, index, ...props}, ref) => {
  const {
    setup: {
      components: {
        PlayerCard,
        Card
      },
    }
  } = useAbstracted()

  const playerCardData = getComponentValueStrict(PlayerCard, playerCardEntity.toString() as any) //get the {cardEntity, exp}
  const cardValue: ComponentValue<{cardType: number}> = getComponentValueStrict(Card, playerCardData.cardEntity.toString() as any) // get the {cardType}

  return (
    <div className={className} ref={ref} {...props}>
      {
        cardValue.cardType === CardType.Hero &&
        <HeroCardRenderer cardEntity={playerCardData.cardEntity as Entity}/>
      }
      {
        cardValue.cardType === CardType.Item && <ItemCardRenderer cardEntity={playerCardData.cardEntity as Entity}/>
      }
    </div>
  )
})

PlayerCardContainer.displayName = 'PlayerCardContainer'

export function HeroCardRenderer({cardEntity}: CardInterface) {
  const {hero, image} = useCard(cardEntity)

  return(
    <Card
      className={clsx([
        'flex-shrink-0',
        'w-full min-w-[var(--card-width-min)] max-w-[var(--card-width-max)]',
        'h-full min-h-[var(--card-height-min)] max-h-[var(--card-height-max)]',
      ])}
    >
      <CardImage
        src={`/assets/card/${image.link}`}
        alt={JSON.stringify(image.link)}
      />

      <CardAttributes>
        <Attributes
          attack={hero?.attack}
          level={1}
          health={hero?.health}
          isOpponent={false}
        />
      </CardAttributes>
    </Card>
  )
}

export function ItemCardRenderer({cardEntity}: CardInterface) {
  const {item, image} = useCard(cardEntity)

  return(
    <Card
      className={clsx([
        'flex-shrink-0',
        'w-full min-w-[var(--card-width-min)] max-w-[var(--card-width-max)]',
        'h-full min-h-[var(--card-height-min)] max-h-[var(--card-height-max)]',
      ])}
    >
      <CardImage
        src={`/assets/card/${image.value}`}
        alt={JSON.stringify(image.value)}
      />

      <CardAttributes>
        <Attributes
          attack={item?.attack}
          level={1}
          health={item?.health}
          isOpponent={false}
        />
      </CardAttributes>
    </Card>
  )
}

export function BigHeroCardRenderer({cardEntity}: CardInterface) {
  const {hero, image} = useCard(cardEntity)

  return(
    <Card
      className={clsx(['flex-shrink-0',
        'w-[172px] max-h-[230px]'
      ])}
    >
      <CardImage
        src={`/assets/card/${image.link}`}
        alt={JSON.stringify(image.link)}
      />

      <CardAttributes>
        <Attributes
          attack={hero?.attack}
          level={1}
          health={hero?.health}
          isOpponent={false}
        />
      </CardAttributes>
    </Card>
  )
}


