import {clsx} from 'clsx'
import {Button} from './ui/button'
import React from 'react'
import {Entity} from '../generated/graphql'
import {useAbstracted} from '../hooks/useAbstracted'
import {getComponentValueStrict} from '@latticexyz/recs'
import useCard from "../hooks/useCard";

interface SidePanelProps {
  isSidePanelOpen: boolean
  setIsSidePanelOpen: (value:boolean) => void
  playerCardEntity: Entity
  selectedCardIndex?: number
}
export default function SidePanel({isSidePanelOpen, setIsSidePanelOpen, playerCardEntity, selectedCardIndex}: SidePanelProps){
  const {
    setup: {
      components: {
        PlayerCard,
      },
      systemCalls:{
        clearDeckSlot
      }
    }
  } = useAbstracted()

  const playerCardValue = getComponentValueStrict(PlayerCard, playerCardEntity.toString() as any) //get the {cardEntity, exp}

  const {hero, image, name} = useCard(playerCardValue.cardEntity as Entity)

  return(
    <div className={clsx(
      [
        { ' invisible': !isSidePanelOpen },
        'animate-slide-rtl fixed right-0 top-0 bottom-0 w-[482px]',
        'p-md',
        'bg-gradient-darkblue',
      ])}>
      <div className={clsx(['h-full', 'flex-center flex-col'])}>
        <div
          className={'mask-card scale-[0.89] max-w-[386px] h-[620px] relative'}>
          <img src={`/assets/card/${image.link}`} alt={'Image Holder Image'}
               className={clsx([ 'w-full h-full object-cover ' ])}/>

          <img src={'/assets/svg/card/content_holder.svg'}
               alt={'Content Holder Image'}
               className={clsx([ 'absolute bottom-0 left-0' ])}/>

          <img src={'/assets/svg/card/attack_holder.svg'}
               alt={'Attack Attribute Image'}
               className={clsx([ 'absolute top-0 left-0' ])}/>
          <img src={'/assets/svg/card/health_holder.svg'}
               alt={'Health Attribute Image'}
               className={clsx([ 'absolute top-0 right-0' ])}/>

          <img src={'/assets/svg/card/title_holder.svg'}
               alt={'Title Attribute Image'}
               className={clsx([ 'absolute bottom-[17%] left-1/2 -translate-x-1/2' ])}/>

          {/*card title*/}
          <p
            className={clsx([ 'text-lg text-brand-white font-noto-sans font-bold', 'absolute bottom-[21.5%] left-1/2 -translate-x-1/2' ])}>{name.value}</p>
          {/*card level*/}
          <p
            className={clsx([ 'text-lg text-brand-white font-noto-sans font-bold', 'absolute bottom-[17.5%] left-1/2 -translate-x-1/2' ])}>Lvl.
            3</p>

          {/*card description*/}
          <p
            className={clsx([ 'text-base text-center text-brand-yellow font-noto-sans', 'absolute bottom-[5%] left-1/2 -translate-x-1/2' ])}>Deals
            2 Damage to the Nearest Enemy</p>

          {/*attack*/}
          <p
            className={clsx([ 'text-base text-center text-brand-pink font-hydrophilia', 'absolute top-0 left-6 ' ])}>ATK</p>
          <p
            className={clsx([ 'text-[49px] leading-[66px] text-center text-brand-yellow font-noto-sans font-bold', 'absolute top-3 left-6 ' ])}>{hero.attack}</p>

          {/*health*/}
          <p
            className={clsx([ 'text-base text-center text-brand-pink font-hydrophilia', 'absolute top-0 right-7 ' ])}>HP</p>
          <p
            className={clsx([ 'text-[49px] leading-[66px] text-center text-brand-yellow font-noto-sans font-bold', 'absolute top-3 right-6 ' ])}>{hero.health}</p>
        </div>

        <Button
          size={'outline'}
          className={clsx([ 'bg-brand-red mt-sm mb-md' ])}
          onClick={() => selectedCardIndex !== undefined && clearDeckSlot(selectedCardIndex)}
        >
          Remove from battle deck
        </Button>

        <Button variant={'plain'} onClick={() => setIsSidePanelOpen(false)}>Close
          Preview</Button>
      </div>
    </div>
  )
}
