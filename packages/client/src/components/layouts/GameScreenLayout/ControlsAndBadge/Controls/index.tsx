import { clsx } from 'clsx'
import React from 'react'
import { Button } from '../../../../ui/button'

export default function Controls(){
  const controls = [
    {
      name: 'Rewind',
      imgSrc: '/assets/svg/icon_rewind.svg',
      imgAlt: 'icon_rewind',
      _onClick: () => console.info('Rewind Button'),
    },
    {
      name: 'Pause',
      imgSrc: '/assets/svg/icon_pause.svg',
      imgAlt: 'icon_pause',
      _onClick: () => console.info('Pause Button'),
    },
    {
      name: 'Auto',
      imgSrc: '/assets/svg/icon_auto.svg',
      imgAlt: 'icon_auto',
      _onClick: () => console.info('Auto Button'),
    },
    {
      name: 'Fast',
      imgSrc: '/assets/svg/icon_fastForward.svg',
      imgAlt: 'icon_fastForward',
      _onClick: () => console.info('Fast Button'),
    },
    {
      name: 'Skip',
      imgSrc: '/assets/svg/icon_skip.svg',
      imgAlt: 'icon_skip',
      _onClick: () => console.info('Skip Button'),
    },
  ]

  return(
    <>
      <div className={clsx([ 'flex items-center gap-x-60' ])}>
        {
          controls.map((control, index) => (
            <Button key={index} variant={'controls'} size={'controls'}>
              <div className={clsx(['flex-center flex-col gap-y-2'])}>
                <img className={clsx(['h-[42px] w-[42px]'])} src={control.imgSrc} alt={control.imgAlt}/>
                <h5 className={clsx(['text-pink text-sm', {'text-brand-gray': control.name === 'Auto'}])}>{control.name}</h5>
              </div>
            </Button>
          ))
        }
      </div>
    </>
  )
}
