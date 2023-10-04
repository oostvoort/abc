import { IconProps } from '../types'

export function PlusSignIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36.001"
         viewBox="0 0 36 36.001" {...props}>
      <path id="icon_plusSign"
            d="M15.5,36V20.5H0v-5H15.5V0h5V15.5H36v5H20.5V36Z"/>
    </svg>
  )
}

export function CrownIcon({ isActive, ...props }: IconProps & { isActive?: boolean}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="63.742" height="50.994"
         viewBox="0 0 63.742 50.994" {...props}>
      {
        isActive && (
          <linearGradient x1="50%" y1="92.034%" x2="50%" y2="7.2%" id="a">
            <stop offset="0%" stopColor="red" />
            <stop stopOpacity="0" offset="100%" stopColor="white" />
          </linearGradient>
        )
      }
      <path id="icon_crown"
            d="M52.587,44.619H11.155a1.6,1.6,0,0,0-1.594,1.594V49.4a1.6,1.6,0,0,0,1.594,1.594H52.587A1.6,1.6,0,0,0,54.181,49.4V46.213A1.6,1.6,0,0,0,52.587,44.619Zm6.374-31.871a4.782,4.782,0,0,0-4.781,4.781,4.684,4.684,0,0,0,.438,1.972l-7.211,4.322a3.183,3.183,0,0,1-4.4-1.155l-8.117-14.2a4.781,4.781,0,1,0-6.036,0l-8.117,14.2a3.185,3.185,0,0,1-4.4,1.155L9.133,19.5A4.779,4.779,0,1,0,4.781,22.31a4.882,4.882,0,0,0,.767-.08l7.2,19.2H50.994l7.2-19.2a4.882,4.882,0,0,0,.767.08,4.781,4.781,0,1,0,0-9.561Z"/>
    </svg>
  )
}

export function GoldCrownIcon(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="31.756" height="25.405" viewBox="0 0 31.756 25.405">
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#fc0"/>
          <stop offset="1" stopColor="#ffa200"/>
        </linearGradient>
      </defs>
      <path id="Icon_awesome-crown" data-name="Icon awesome-crown" d="M26.2,22.229H5.557a.8.8,0,0,0-.794.794v1.588a.8.8,0,0,0,.794.794H26.2a.8.8,0,0,0,.794-.794V23.023A.8.8,0,0,0,26.2,22.229ZM29.374,6.351a2.382,2.382,0,0,0-2.382,2.382,2.333,2.333,0,0,0,.218.982l-3.592,2.153a1.586,1.586,0,0,1-2.193-.576L17.381,4.218a2.382,2.382,0,1,0-3.007,0l-4.044,7.076a1.587,1.587,0,0,1-2.193.576L4.55,9.715a2.381,2.381,0,1,0-2.168,1.4,2.432,2.432,0,0,0,.382-.04l3.587,9.566H25.4l3.587-9.566a2.432,2.432,0,0,0,.382.04,2.382,2.382,0,1,0,0-4.763Z" fill="url(#linear-gradient)"/>
    </svg>
  )
}

export function SilverCrownIcon(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="31.756" height="25.405" viewBox="0 0 31.756 25.405">
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#ebebf8"/>
          <stop offset="1" stopColor="#5a5c87"/>
        </linearGradient>
      </defs>
      <path id="Icon_awesome-crown" data-name="Icon awesome-crown" d="M26.2,22.229H5.557a.8.8,0,0,0-.794.794v1.588a.8.8,0,0,0,.794.794H26.2a.8.8,0,0,0,.794-.794V23.023A.8.8,0,0,0,26.2,22.229ZM29.374,6.351a2.382,2.382,0,0,0-2.382,2.382,2.333,2.333,0,0,0,.218.982l-3.592,2.153a1.586,1.586,0,0,1-2.193-.576L17.381,4.218a2.382,2.382,0,1,0-3.007,0l-4.044,7.076a1.587,1.587,0,0,1-2.193.576L4.55,9.715a2.381,2.381,0,1,0-2.168,1.4,2.432,2.432,0,0,0,.382-.04l3.587,9.566H25.4l3.587-9.566a2.432,2.432,0,0,0,.382.04,2.382,2.382,0,1,0,0-4.763Z" fill="url(#linear-gradient)"/>
    </svg>
  )
}

export function BronzeCrownIcon(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="31.756" height="25.405" viewBox="0 0 31.756 25.405">
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#bf7725"/>
          <stop offset="1" stopColor="#784204"/>
        </linearGradient>
      </defs>
      <path id="Icon_awesome-crown" data-name="Icon awesome-crown" d="M26.2,22.229H5.557a.8.8,0,0,0-.794.794v1.588a.8.8,0,0,0,.794.794H26.2a.8.8,0,0,0,.794-.794V23.023A.8.8,0,0,0,26.2,22.229ZM29.374,6.351a2.382,2.382,0,0,0-2.382,2.382,2.333,2.333,0,0,0,.218.982l-3.592,2.153a1.586,1.586,0,0,1-2.193-.576L17.381,4.218a2.382,2.382,0,1,0-3.007,0l-4.044,7.076a1.587,1.587,0,0,1-2.193.576L4.55,9.715a2.381,2.381,0,1,0-2.168,1.4,2.432,2.432,0,0,0,.382-.04l3.587,9.566H25.4l3.587-9.566a2.432,2.432,0,0,0,.382.04,2.382,2.382,0,1,0,0-4.763Z" fill="url(#linear-gradient)"/>
    </svg>
  )
}

export function PurpleCrownIcon(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="31.756" height="25.405" viewBox="0 0 31.756 25.405">
      <path id="Icon_awesome-crown" data-name="Icon awesome-crown" d="M26.2,22.229H5.557a.8.8,0,0,0-.794.794v1.588a.8.8,0,0,0,.794.794H26.2a.8.8,0,0,0,.794-.794V23.023A.8.8,0,0,0,26.2,22.229ZM29.374,6.351a2.382,2.382,0,0,0-2.382,2.382,2.333,2.333,0,0,0,.218.982l-3.592,2.153a1.586,1.586,0,0,1-2.193-.576L17.381,4.218a2.382,2.382,0,1,0-3.007,0l-4.044,7.076a1.587,1.587,0,0,1-2.193.576L4.55,9.715a2.381,2.381,0,1,0-2.168,1.4,2.432,2.432,0,0,0,.382-.04l3.587,9.566H25.4l3.587-9.566a2.432,2.432,0,0,0,.382.04,2.382,2.382,0,1,0,0-4.763Z" fill="rgba(117,67,168,0.45)"/>
    </svg>
  )
}


