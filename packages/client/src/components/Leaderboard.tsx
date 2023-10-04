import {clsx} from 'clsx'
import React from 'react'
import {cn, formatWalletAddress} from '../lib/utils'
import {useAbstracted} from "../hooks/useAbstracted";
import {ComponentValue, getComponentValue, Has} from "@latticexyz/recs";
import {useEntityQuery} from "@latticexyz/react";
import {BronzeCrownIcon, GoldCrownIcon, PurpleCrownIcon, SilverCrownIcon} from "./Icon";
import {Entity} from "../generated/graphql";

export default function Leaderboard() {
    const {
        setup: {
            components: {
                DuelPoints
            },
        }
    } = useAbstracted()

    const duelPointsEntities = useEntityQuery([
        Has(DuelPoints),
    ])

    const leaderboards = duelPointsEntities.map((duelPointsEntity): [Entity, ComponentValue<{ points: number }> | undefined] => {
        return [duelPointsEntity as Entity, getComponentValue(DuelPoints, duelPointsEntity)]
    })

  return (
    <div
      className={clsx([ ' w-full ', 'flex flex-col', 'p-md', 'bg-gradient-darkblue opacity-[0.77] rounded-21' ])}>
      <p className={'text-pink'}>Leadarboard</p>
        {
            leaderboards.length > 0
                ? <>
                    {
                        leaderboards.map(([wallet_address, battle], index) => {
                            return (
                                <Leaderboard.Wrapper key={index}>
                                    <Leaderboard.CrownIcon>
                                        {
                                            index == 0 ? <GoldCrownIcon/> : index == 1 ?
                                                <SilverCrownIcon/> : index == 2 ? <BronzeCrownIcon/> :
                                                    <PurpleCrownIcon/>
                                        }
                                    </Leaderboard.CrownIcon>
                                    <Leaderboard.WalletAddress>{formatWalletAddress(wallet_address.toString())}</Leaderboard.WalletAddress>
                                    <Leaderboard.Points>{Number(battle?.points)}</Leaderboard.Points>
                                </Leaderboard.Wrapper>
                            )
                        })
                    }
                </>
                : <div className={clsx(['w-full min-h-[150px] h-full', 'flex-center', 'font-noto-sans uppercase '])}>
                    The leaderboard is empty
                </div>
        }
    </div>
  )
}

const Wrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((
  // eslint-disable-next-line react/prop-types
  { className, ...otherProps }, ref) => (
  <div
    className={cn([
    'flex items-center py-xs',
    className,
    ])}
    ref={ref}
    {...otherProps}
  />
))

Wrapper.displayName = 'Wrapper'

const CrownIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((
  // eslint-disable-next-line react/prop-types
  {className, ...otherProps}, ref) => (
  <div
    className={cn([
    'flex items-center',
    className,
    ])}
    ref={ref}
    {...otherProps}
  />
))

CrownIcon.displayName = 'CrownIcon'

const WalletAddress = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>((
  // eslint-disable-next-line react/prop-types
  {className, ...otherProps}, ref) => (
  <h5
    className={cn([
    'text-base text-brand-yellow font-noto-sans px-xs',
    className,
    ])}
    ref={ref}
    {...otherProps}
  />
))

WalletAddress.displayName = 'WalletAddress'

const Points = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>((
  // eslint-disable-next-line react/prop-types
  {className, ...otherProps}, ref) => (
  <h5
    className={cn([
    'text-base text-right text-brand-yellow font-noto-sans px-xs flex-1',
    className,
    ])}
    ref={ref}
    {...otherProps}
  />
))

Points.displayName = 'Points'

Leaderboard.Wrapper = Wrapper
Leaderboard.CrownIcon = CrownIcon
Leaderboard.WalletAddress = WalletAddress
Leaderboard.Points = Points
