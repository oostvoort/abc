import React from 'react'
import { clsx } from 'clsx'
import { cn } from '../lib/utils'
import { ACTIVE_PAGE } from '../atoms'
import { NavMenuProps } from '../types'
import useLocalStorage from '../hooks/useLocalStorage'

const Logo = React.forwardRef<HTMLDivElement, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>(({
  // eslint-disable-next-line react/prop-types
  className,
  ...otherProps
}, ref) => {
  return (
    <div
      className={cn([
        'z-20',
      className,
      ])}
      ref={ref}
      {...otherProps}
    >
      <img src={'/assets/logo/HomeLogo.png'} alt={'Homepage Logo'}
           draggable={false}/>
    </div>
  )
})

Logo.displayName = 'Logo'

const HeaderLogo = React.forwardRef<HTMLDivElement, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>(({
  // eslint-disable-next-line react/prop-types
  className,
  ...otherProps
}, ref) => {
  const { setStoredValue } = useMainLayout()

  return (
    <div
      className={cn([
          'w-[144px] max-h-[128px]',
          'z-50',
          'cursor-pointer',
        className,
      ])}
      ref={ref}
      onClick={() => setStoredValue(null)}
      {...otherProps}
    >
      <img src={'/assets/logo/HeaderLogo.png'} alt={'Header Logo'}
           draggable={false}/>
    </div>
  )
})

HeaderLogo.displayName = 'HeaderLogo'


const WideSubWrapper = React.forwardRef<HTMLDivElement, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>(({
  // eslint-disable-next-line react/prop-types
  className,
  children,
  ...otherProps
}, ref) => (
    <div className={cn([
      'mx-10 py-sm',
        'flex items-center gap-60',
        className
    ])}
         ref={ref}
         {...otherProps}>
        { children }
    </div>
))

WideSubWrapper.displayName = 'WideSubWrapper'

const TightSubWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className='w-[min(1200px,100%-2.5rem)] mx-auto'>
        { children }
    </div>
)

const NavMenu = React.forwardRef<HTMLDivElement, NavMenuProps>(
    // eslint-disable-next-line react/prop-types
    ({className, name, src, alt, ...props}, ref) => {
        return (
            <div
                className={clsx([
                    'w-[81px] h-[81px]',
                    'rounded-full',
                    'bg-gradient-darkblue opacity-[0.77]',
                    'relative flex flex-col justify-center items-center',
                    'cursor-pointer',
                    className
                ])}
                ref={ref}
                {...props}
            >
                <img
                    src={src}
                    alt={alt}
                    className={'inset-0 mx-auto'}
                />
                <div className={clsx([
                    'rounded-sm p-1',
                    'w-[111px] max-h-[24px]',
                    'bg-brand-darkAccent/60',
                    'text-brand-pink text-base text-center font-normal font-hydrophilia'
                ])}>
                    {name}
                </div>
            </div>
        )
    }
)

NavMenu.displayName = 'NavMenu'

type MainLayoutType = {
    setHasBackgroundNavy: React.Dispatch<React.SetStateAction<boolean>>
    setHasBackground: React.Dispatch<React.SetStateAction<boolean>>
    setHasNavbar: React.Dispatch<React.SetStateAction<boolean>>
  storedValue: number
  setStoredValue: () => void
}

export const MainLayoutContext = React.createContext<MainLayoutType>({} as MainLayoutType)

export default function MainLayout({ children }: { children: React.ReactNode }) {

  const [ hasNavbar, setHasNavbar ] = React.useState(false)
  const [ hasBackground, setHasBackground ] = React.useState(true)
  const [ hasBackgroundNavy, setHasBackgroundNavy ] = React.useState(false)
  const [ storedValue, setStoredValue ] = useLocalStorage('current-page', null)

    const menus = [
        {
            name: 'Inventory',
            src: '/assets/svg/icon_inventory.png',
            alt: 'Inventory Icon',
          onClick: () => setStoredValue(ACTIVE_PAGE.INVENTORY),
        },
        {
            name: 'Booster Pack',
            src: '/assets/svg/icon_booster.png',
            alt: 'Booster Pack Icon',
          onClick: () => setStoredValue(ACTIVE_PAGE.BOOSTER_PACK),
        },
        {
            name: 'Settings',
            src: '/assets/svg/icon_settings.png',
            alt: 'Settings Icon',
            onClick: () => console.log('No Settings Yet')
        },
    ]

    return (
    <MainLayoutContext.Provider value={{
      setHasBackground,
      setHasNavbar,
      setHasBackgroundNavy,
      storedValue,
      setStoredValue,
    }}>
      <main
          className={clsx(['min-h-screen flex flex-col', {'bg-main bg-center bg-cover': hasBackground}, {'bg-brand-navyblue': hasBackgroundNavy}])}>
        <header
          className={clsx([
            'min-h-[var(--header-height)] fixed w-full',
            'flex items-center flex-grow-0 ',
          { 'hidden': !hasNavbar },
          ])}
        >
          <WideSubWrapper>
              <HeaderLogo/>

              {
                  menus.map((menu, index) => (
                      <NavMenu
                          key={index}
                          src={menu.src}
                          name={menu.name}
                          alt={menu.alt}
                          onClick={menu.onClick}
                      />
                  ))
              }
          </WideSubWrapper>
        </header>
        <div
          className={clsx([ 'flex flex-col flex-1 ', { 'pt-[var(--header-height)]': hasNavbar } ])}>
          {children}
        </div>
      </main>
    </MainLayoutContext.Provider>
  )
}

export function useMainLayout() {
    return React.useContext(MainLayoutContext)
}

MainLayout.WideSubWrapper = WideSubWrapper
MainLayout.TightSubWrapper = TightSubWrapper
MainLayout.Logo = Logo
