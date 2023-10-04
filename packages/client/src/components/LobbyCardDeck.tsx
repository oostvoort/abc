import { clsx } from 'clsx'
import React from 'react'
import { cn } from '../lib/utils'
import { useAbstracted } from '../hooks/useAbstracted'
import { getComponentValueStrict } from '@latticexyz/recs'
import { DeckCardLobbyProps, PlayerCardContainerProps } from '../types'
import { Entity } from '../generated/graphql'
import { Button } from './ui/button'
import { useSetAtom } from 'jotai'
import { ACTIVE_PAGE, activePage_atom } from '../atoms'
import useDeck from '../hooks/useDeck'
import { constants } from 'ethers'
import useCard from '../hooks/useCard'
import { useMainLayout } from './MainLayout'

export default function LobbyCardDeck() {
  const {
    setup: {
      network: {
        playerEntity,
      },
    },
  } = useAbstracted()

  const { playerCardValues } = useDeck(playerEntity as Entity)
  const { setStoredValue } = useMainLayout()

  return (
    <div
      className={clsx([ 'w-full', 'flex flex-col', 'p-md', 'bg-gradient-darkblue opacity-[0.77] rounded-21' ])}>
      <div className={clsx(['flex justify-between items-center'])}>
        <p className={'text-pink'}>Your Deck</p>
        {/*<p className={'text-pink normal-case'}>Battle Power: 12</p>*/}
      </div>

      <Wrapper>
        {
            playerCardValues.map((playerCardValue, key) => {
                return (
                    <React.Fragment key={key}>
                        {
                            playerCardValue && playerCardValue.playerCardEntity !== constants.HashZero as Entity
                                ? <ImageWrapper playerCardEntity={playerCardValue.playerCardEntity as Entity}/>
                                : <div
                                    className={cn(['max-w-[84px] w-full h-[92px] border border-brand-navyblue bg-brand-darkAccent'])}/>
                        }
                    </React.Fragment>
                )
            })
        }
      </Wrapper>

        <Button
            size={'outline'}
            className={clsx(['mt-sm', 'bg-brand-pinkAccent'])}
            onClick={() => {
              setStoredValue(ACTIVE_PAGE.INVENTORY)
            }}
        >
            Manage Deck
        </Button>
    </div>
  )
}

const Wrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((
  // eslint-disable-next-line react/prop-types
  { className, ...otherProps }, ref) => (
  <div
    className={cn([
      // 'flex items-center flex-wrap gap-2.5 mt-xs',
      'grid gap-2.5 grid-cols-4 mt-xs',
    className,
    ])}
    ref={ref}
    {...otherProps}
  />
))

Wrapper.displayName = 'Wrapper'

const ImageWrapper = React.forwardRef<HTMLDivElement, PlayerCardContainerProps>((
  // eslint-disable-next-line react/prop-types
  { className, playerCardEntity, ...otherProps }, ref) => {

  const {
    setup: {
      components: {
        PlayerCard,
      },
    },
  } = useAbstracted()

  const playerCardData = getComponentValueStrict(PlayerCard, playerCardEntity.toString() as any) //get the {cardEntity, exp}

  return (
    <div
      className={cn([
        'max-w-[84px] w-full max-h-[92px] h-full overflow-hidden',
        className,
      ])}
      ref={ref}
      {...otherProps}
    >
      <Image cardEntity={playerCardData.cardEntity as Entity}/>
    </div>
  )
})

ImageWrapper.displayName = 'ImageWrapper'

const Image = React.forwardRef<
  HTMLImageElement,
  DeckCardLobbyProps
  // eslint-disable-next-line react/prop-types
>(({ alt, className, cardEntity, ...props }, ref) => {
    const {image} = useCard(cardEntity)

  return (
    <img
        src={`/assets/card/${image.link}`}
      alt={alt}
      ref={ref}
      draggable={false}
        className={cn(['scale-125 origin-top', className])}
      {...props}
    />
  )
})

Image.displayName = 'Image'

const EmptyCardDeck = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  // eslint-disable-next-line react/prop-types
  ({className, ...props}, ref) => {
      const setCurrentPage = useSetAtom(activePage_atom)

    return(
      <div
        className={clsx([ 'w-full', 'flex flex-col', 'p-md', 'bg-gradient-darkblue opacity-[0.77] rounded-21', className ])} ref={ref} {...props}>
        <div className={clsx(['flex justify-between items-center'])}>
          <p className={'text-pink'}>Your Deck</p>
          {/*<p className={'text-pink normal-case'}>Battle Power: 12</p>*/}
        </div>

        <div className={clsx(['flex-center', 'mt-xs', 'min-h-[100px] h-full'])}>
          <p className={'uppercase font-hydrophilia'}>No Deck of card</p>

        </div>
          <Button
              size={'outline'}
              className={clsx(['mt-sm', 'bg-brand-pinkAccent'])}
              onClick={() => setCurrentPage(ACTIVE_PAGE.INVENTORY)}
          >
              Manage Deck
          </Button>
      </div>
    )
  }
)

EmptyCardDeck.displayName = 'EmptyCardDeck'


LobbyCardDeck.Wrapper = Wrapper
LobbyCardDeck.ImageWrapper = ImageWrapper
LobbyCardDeck.Image = Image
LobbyCardDeck.EmptyCardDeck = EmptyCardDeck

