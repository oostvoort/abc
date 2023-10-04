import { clsx } from 'clsx'
import { Button } from '../../components/ui/button'
import {
  Dialog,
  DialogContent,
} from '../../components/ui/dialog'
import { useMainLayout } from '../../components/MainLayout'
import React from 'react'
import { constants } from 'ethers'
import useBoosterPack from '../../hooks/useBoosterPack'
import BoosterPackCard from '../../components/BoosterPackCard'

export default function BoosterPackScreen(){
  const [isOpen, setOpen] = React.useState(false)

  const boosterPack = useBoosterPack()
  const { setHasBackground, setHasNavbar } = useMainLayout()

  React.useEffect(() => {
    setHasBackground(false)
    setHasNavbar(true)
  }, [])

  return(
    <div
      className={clsx([ 'flex justify-center h-[calc(100vh-var(--header-height))]' ])}>
      <div className={clsx([ 'relative h-fit' ])}>
        <img src={'/assets/background/boosterPack.png'} alt={'Booster Pack Image'}/>

        <div className={'absolute -bottom-10 left-1/2 -translate-x-1/2 '}>
          <Button
            size={'outline'}
            className={ 'bg-brand-red max-w-[347px] w-full'}
            disabled={boosterPack.isLoading}
            onClick={() => {
              setOpen(true)
              boosterPack.mutate(constants.HashZero)
            }}
          >
            Open
          </Button>
        </div>

        <Dialog open={isOpen && boosterPack.isSuccess} onOpenChange={setOpen}>
          <DialogContent  >
            <div className={'flex-center'}>
              {
                boosterPack.isSuccess && boosterPack.data.map((playerCardEntity, index) => (
                  <BoosterPackCard key={index} playerCardEntity={playerCardEntity}/>
                ))
              }
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  )
}
