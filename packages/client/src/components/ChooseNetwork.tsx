import { Button } from './ui/button'
import { useAbstracted } from '../hooks/useAbstracted'
import { clsx } from 'clsx'
import { useMainLayout } from './MainLayout'
import React from 'react'

export default function ChooseNetwork() {
  const {
    setNetwork,
  } = useAbstracted()

  const {setHasNavbar, setHasBackground} = useMainLayout()

  React.useEffect(() => {
    setHasNavbar(false)
    setHasBackground(true)
  }, [])

  return (
    <div className={clsx([ 'flex-center flex-col h-screen' ])}>
      <h1
        className={clsx([ 'text-pink text-5xl font-hydrophilia', 'mb-[80px]' ])}>Choose
        Network</h1>

      <div className="flex items-center justify-center gap-x-60">
        <Button
          size={'image'}
          variant={'image'}
          className={clsx([
            'flex-col transparent  p-0'
          ])}
          onClick={() => {
            setNetwork('mud')
          }}
        >
          <img
            src={'/assets/svg/polygon_logo.svg'}
            alt={'Polygon Logo'}
            className={'h-[124px] w-[124px] rounded-full'}
          />
          <p className={'mt-xs text-lg text-brand-yellow font-noto-sans'}>Polygon</p>
        </Button>
        <Button
          size={'image'}
          variant={'image'}
          className={clsx([
            'flex-col transparent  p-0'
          ])}
          onClick={() => setNetwork('dojo')}
        >
          <img
            src={'/assets/svg/starknet_logo.svg'}
            alt={'Starknet Logo'}
            className={'h-[124px] w-[124px] rounded-full'}
          />
          <p className={'mt-xs text-lg text-brand-yellow font-noto-sans'}>Starknet</p>
        </Button>
      </div>
    </div>
  )
}
