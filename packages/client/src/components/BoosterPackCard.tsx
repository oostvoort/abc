import {Entity} from '../generated/graphql'
import {useAbstracted} from '../hooks/useAbstracted'
import {getComponentValueStrict} from '@latticexyz/recs'
import {clsx} from 'clsx'
import React from 'react'
import {CardInterface} from '../types'
import useCard from "../hooks/useCard";

export default function BoosterPackCard({ playerCardEntity }: {
  playerCardEntity: Entity
}) {
  const {
    setup: {
      components: {
        PlayerCard,
      },
    },
  } = useAbstracted()

  const playerCardValue = getComponentValueStrict(PlayerCard, playerCardEntity.toString() as any)

  return (
    <>
      <BoosterPackImageRenderer
        cardEntity={playerCardValue.cardEntity as Entity}/>
    </>
  )
}

const BoosterPackImageRenderer =
  React.forwardRef<HTMLDivElement, CardInterface>(
    ({ cardEntity, ...props }, ref) => {

      const {image, name, hero} = useCard(cardEntity)

      return (
        <div
          className={'mask-card scale-[0.89] max-w-[386px] h-[620px] relative'}
          ref={ref}
          {...props}
        >
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

      )
    },
  )

BoosterPackImageRenderer.displayName = 'BoosterPackImageRenderer'


