import React from 'react'
import {clsx} from 'clsx'
import useDuelInfo from '../../../hooks/useDuelInfo'
import usePlayerInDuel from '../../../hooks/usePlayerInDuel'
import {useMainLayout} from '../../MainLayout'
import useLatestBlockTimestamp from '../../../hooks/useLatestBlockTimestamp'

export default function GameScreenLayout({children}: {children: React.ReactNode}){
  const {setHasNavbar, setHasBackground, setHasBackgroundNavy} = useMainLayout()

  const duelInfo = useDuelInfo()
  const latestBlockTimestamp = useLatestBlockTimestamp()
  const playerInDuel = usePlayerInDuel()

  const isDuelOngoing = Boolean(duelInfo?.ongoing)

  const timeRemaining: number | undefined = latestBlockTimestamp ? Number(duelInfo?.deadline) - latestBlockTimestamp : undefined

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isTimeRemainingLessThanZero = Boolean(timeRemaining < 0)

  const isInMatchMakingRoom = playerInDuel?.duelEntity && !isDuelOngoing
  const isInPreparationScreen = !isTimeRemainingLessThanZero

  React.useEffect(() => {
    setHasNavbar(false)
    setHasBackground(false)
    setHasBackgroundNavy(false)
  }, [])

  return(
    <>
        <div
            className={clsx([
                'relative',
                'h-screen w-screen',
                'flex flex-col justify-between',
                'ease-linear duration-300 ',
                {'bg-brand-darkAccent/[0.88]': isInMatchMakingRoom},
                {'bg-brand-darkAccent/50': isInPreparationScreen}
            ],)}
        >

        {/*display background image*/}
        <div className={clsx(
          [
            'absolute top-0 left-0',
            'h-full w-full',
            'bg-default-bg bg-cover bg-bottom -z-10',
          ],
        )}
        />
        {children}
      </div>
    </>
  )
}
