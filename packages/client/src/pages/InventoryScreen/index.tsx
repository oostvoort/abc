import { clsx } from 'clsx'
import React from 'react'
import InventoryCard from '../../components/InventoryCard'
import { useMainLayout } from '../../components/MainLayout'
import InventoryDeckCard from '../../components/InventoryDeckCard'
import { useAbstracted } from '../../hooks/useAbstracted'
import { Entity } from '../../generated/graphql'
import SidePanel from '../../components/SidePanel'
import { constants } from 'ethers'

export default function InventoryScreen() {
  const {
    setup: {
      systemCalls: {
        placeToDeck,
      },
      network: {
        playerEntity,
      },
    },
  } = useAbstracted()

  const { setHasBackground, setHasNavbar } = useMainLayout()

  const [ selectedCard, setSelectedCard ] = React.useState<[ Entity | undefined, number | undefined ]>([ undefined, undefined ])
  const [ isSidePanelOpen, setIsSidePanelOpen ] = React.useState<boolean>(false)
  const [ storePlayerCardEntity, setStorePlayerCardEntity ] = React.useState<Entity | undefined>(undefined)

  React.useEffect(() => {
    setHasNavbar(true)
    setHasBackground(false)
  }, [])

  React.useMemo(() => {
    if (selectedCard[0] !== undefined && selectedCard[1] !== undefined) {
      placeToDeck(selectedCard[0].toString() as any, selectedCard[1]).finally(() => {
        setSelectedCard([ undefined, undefined ])
      })
    }
  }, [ selectedCard ])

  return (
    <div className={clsx([ 'flex  w-full' ])}>
      <div
        className={clsx([ 'flex flex-col px-md gap-y-30   ', { 'w-[1442px]  mx-0': isSidePanelOpen } ])}>
        <div className={clsx([
          'max-h-[340px] h-full',
          'px-md pt-md pb-20',
          'bg-gradient-darkblue',
          'rounded-18',
          'flex flex-col max-w-[1800px] w-full',
        ])}>
          <div className={clsx([ 'flex justify-between items-center' ])}>
            <h3 className={'text-pink'}>Battle Deck</h3>
            {/*<h3 className={'text-pink'}>Battle Power: 9</h3>*/}
          </div>

          {
            playerEntity && playerEntity !== constants.HashZero &&
            <InventoryDeckCard
              playerEntity={playerEntity as Entity}
              selectedSlot={selectedCard[1]}
              setSelectedCard={(playerCardEntity, index) => {
                setIsSidePanelOpen(true)
                setStorePlayerCardEntity(playerCardEntity)
                setSelectedCard(
                  prevState => ([
                    prevState[0],
                    index,
                  ]),
                )
              }}
            />
          }

        </div>

        <div className={clsx([
          'px-md pt-md mx-auto',
          'bg-gradient-darkblue',
          'rounded-18',
          'flex flex-col max-w-[1800px] w-full',
        ])}>
          <div className={clsx([ 'flex justify-between items-center ' ])}>
            {/*TODO: make inventory count dynamic*/}
            <h3 className={'text-pink'}>Inventory</h3>
          </div>

          <div className={clsx(
            [
              'max-h-[270px] overflow-y-auto',
              'mt-5 mb-xs pb-xs',
              'flex flex-wrap gap-15 justify-center md:justify-start',
            ],
          )}>
            {
              playerEntity !== constants.HashZero &&
              <InventoryCard
                playerEntity={playerEntity as Entity}
                selectedIndex={selectedCard[0]}
                onSelectedCard={(playerCardEntity) => {
                  setIsSidePanelOpen(true)
                  setStorePlayerCardEntity(playerCardEntity)
                  setSelectedCard(
                    prevState => ([
                      playerCardEntity,
                      prevState[1],
                    ]),
                  )
                }}
              />
            }

          </div>
        </div>
      </div>

      {
        storePlayerCardEntity && storePlayerCardEntity !== constants.HashZero as Entity &&
        <SidePanel
          selectedCardIndex={selectedCard[1]}
          playerCardEntity={storePlayerCardEntity}
          isSidePanelOpen={isSidePanelOpen}
          setIsSidePanelOpen={setIsSidePanelOpen}
        />
      }
    </div>
  )
}
