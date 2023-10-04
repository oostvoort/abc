import React from 'react'
import { clsx } from 'clsx'

export default function RoomButton({children}: {children: React.ReactNode}){
  return(
    <button className={clsx(['w-full max-h-[75px] h-full', 'font-noto-sans', 'first:mt-0 mt-xs'])}>
          {children}
    </button>
  )
}

const Lobby = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  // eslint-disable-next-line react/prop-types
  ({className, ...props}, ref) => (
    <div className={clsx(['w-full h-full', 'px-md ',  'inline-flex items-center', 'bg-rb-default bg-cover bg-center'], className)} ref={ref} {...props}/>
  )
)

Lobby.displayName = 'Lobby'

const Battle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  // eslint-disable-next-line react/prop-types
  ({className, ...props}, ref) => (
    <div className={clsx(['w-full h-full', 'px-md ',  'inline-flex items-center', 'bg-rb-battle bg-cover bg-center'], className)} ref={ref} {...props}/>
  )
)

Battle.displayName = 'Battle'

const Spectate = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  // eslint-disable-next-line react/prop-types
  ({className, ...props}, ref) => (
    <div className={clsx(['w-full h-full', 'px-md ',  'inline-flex items-center', 'bg-rb-spectate bg-cover bg-center'], className)} ref={ref} {...props}/>
  )
)

Spectate.displayName = 'Spectate'

const Text = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  // eslint-disable-next-line react/prop-types
  ({className, ...props}, ref) => (
    <p className={clsx(['text-center text-sm normal-case', ' basis-2/6'], className)} ref={ref} {...props}/>
  )
)

Text.displayName = 'Text'

const Name = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  // eslint-disable-next-line react/prop-types
  ({className, ...props}, ref) => (
    <p className={clsx(['text-left text-lg font-bold uppercase', 'mb-1.5', ' basis-2/6'], className)} ref={ref} {...props}/>
  )
)

Name.displayName = 'Name'

const Wrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  // eslint-disable-next-line react/prop-types
  ({className, ...props}, ref) => (
    <div className={clsx(['h-full mb-3 basis-[60%] ',  'flex justify-center flex-col'], className)} ref={ref} {...props}/>
  )
)

Wrapper.displayName = 'Wrapper'

const WalletAddress = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  // eslint-disable-next-line react/prop-types
  ({className, ...props}, ref) => (
    <p className={clsx(['text-center text-lg font-bold font-noto-sans uppercase'], className)} ref={ref} {...props}/>
  )
)

WalletAddress.displayName = 'WalletAddress'

const BattlePower = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  // eslint-disable-next-line react/prop-types
  ({className, ...props}, ref) => (
    <p className={clsx(['text-center text-sm font-medium font-noto-sans normal-case'], className)} ref={ref} {...props}/>
  )
)

BattlePower.displayName = 'BattlePower'

const SpectateWrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  // eslint-disable-next-line react/prop-types
  ({className, ...props}, ref) => (
    <div className={clsx(['mx-md', 'flex justify-between'], className)} ref={ref} {...props}/>
  )
)

SpectateWrapper.displayName = 'SpectateWrapper'

RoomButton.Lobby = Lobby
RoomButton.Battle = Battle
RoomButton.Spectate = Spectate
RoomButton.Wrapper = Wrapper
RoomButton.Name = Name
RoomButton.Text = Text
RoomButton.WalletAddress = WalletAddress
RoomButton.BattlePower = BattlePower
RoomButton.SpectateWrapper = SpectateWrapper
