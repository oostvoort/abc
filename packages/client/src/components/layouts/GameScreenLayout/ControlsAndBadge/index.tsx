import {clsx} from 'clsx'
import React from 'react'
import BadgeContainer from './BadgeContainer'
import Controls from './Controls'

export default function ControlsAndBadge(){
  return(
    <div className={clsx(
      [
        'flex items-center justify-between',
        'p-lg',
      ]
    )}>
        <BadgeContainer isOpponent={false}/>
        <Controls/>
        <BadgeContainer isOpponent={true}/>
    </div>
  )
}
