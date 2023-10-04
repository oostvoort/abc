import React from 'react'
import MainLayout, { useMainLayout } from '../../components/MainLayout'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Dialog, DialogContent } from '../../components/ui/dialog'
import { clsx } from 'clsx'
import { DialogOverlay } from '@radix-ui/react-dialog'
import { useAbstracted } from '../../hooks/useAbstracted'

export default function HomeScreen() {
  const [ overrideBurner, setOverrideBurner ] = React.useState('')
  const [ showModal, setShowModal ] = React.useState(false)
  const { setHasNavbar, setHasBackground } = useMainLayout()

  const {
    setup: {
      systemCalls: {
        registerPlayer
      }
    },
  } = useAbstracted()

  function handleOverrideClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (typeof window == 'undefined') throw new Error('window is undefined, click cant proceed')
    window.localStorage.setItem('mud:burnerWallet', overrideBurner)
    setShowModal(false)
    setOverrideBurner('')
    location?.reload()
  }

  React.useEffect(() => {
    setHasNavbar(false)
    setHasBackground(true)
  }, [])

  return (
    <>
      <div className={clsx([ 'flex-center flex-col flex-1' ])}>
        <MainLayout.Logo
          className={clsx([ 'max-w-[738px] w-full max-h-[626px] h-full' ])}
        />

        <div
          className={clsx([ 'flex flex-col items-center gap-y-30', 'w-full', 'mt-xs' ])}>
          <Button
            variant={'primary'}
            className={'max-w-[448px] w-full min-h-[64px] h-full'}
            onClick={() => registerPlayer()}
          >
            Create Account
          </Button>

          <Button
            variant='outline'
            className={'max-w-[340px] w-full min-h-[64px] h-full'}
            onClick={() => setShowModal(true)}
          >
            Load Existing Account
          </Button>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogOverlay/>
        <DialogContent className="flex flex-col gap-5 p-5 max-w-2xl">
          <Input
            type="text"
            value={overrideBurner}
            onChange={e => setOverrideBurner(e.target.value)}
          />
          <Button onClick={handleOverrideClick}>Override Burner</Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
