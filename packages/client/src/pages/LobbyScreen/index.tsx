import React from 'react'
import { clsx } from 'clsx'
import Leaderboard from '../../components/Leaderboard'
import LobbyCardDeck from '../../components/LobbyCardDeck'
import { Button } from '../../components/ui/button'
import RoomButton from '../../components/RoomButton'
import { useMainLayout } from '../../components/MainLayout'
import { useAbstracted } from '../../hooks/useAbstracted'
import { useEntityQuery } from '@latticexyz/react'
import { getComponentValueStrict, Has } from '@latticexyz/recs'
import RoomList from '../../components/RoomList'
import { ACTIVE_PAGE } from '../../atoms'

export default function LobbyScreen() {
  const {
    setStoredValue,
    setHasNavbar,
    setHasBackground,
    setHasBackgroundNavy,
  } = useMainLayout()

  React.useEffect(() => {
    setHasNavbar(true)
    setHasBackground(false)
    setHasBackgroundNavy(true)
  }, [])

  const {
    setup: {
      components: {
        Duel,
      },
      systemCalls:{
        createDuel,
        joinDuel,
      },
    },

  } = useAbstracted()

  const duelEntities = useEntityQuery([Has(Duel)])
  const duelDatas = duelEntities.map((duelEntity) => {
    return [duelEntity, getComponentValueStrict(Duel, duelEntity)]
  })


  return (
    <div
      className={clsx([ 'grid grid-cols-7 gap-x-60', 'w-full   h-[calc(100vh-var(--header-height))] py-xs px-[100px]'])}>
      <div className={clsx([ 'col-span-2' ])}>

        <LobbyCardDeck/>

        <Button
            size={'outline'}
            className={clsx(['mt-sm', 'w-full', 'bg-brand-red'])}
            onClick={() => setStoredValue(ACTIVE_PAGE.BOOSTER_PACK)}
        >
          Booster Pack Available
        </Button>
      </div>

      <div className={clsx([ 'col-span-3' ])}>
        <RoomButton>
          <RoomButton.Lobby onClick={async () => await createDuel()}>
            <RoomButton.Name>Create Lobby</RoomButton.Name>
            <RoomButton.Wrapper>
              <RoomButton.Text>Your Battle Power: 0</RoomButton.Text>
            </RoomButton.Wrapper>
          </RoomButton.Lobby>
        </RoomButton>

        {
          duelDatas.map((duelData, index) => {
            return(
                //TODO: fix types
              <RoomList key={index} duelData={duelData[1]} onClick={async () => await joinDuel(duelData[0] as any)}/>
            )
          })
        }
      </div>

      <div className={clsx([ 'col-span-2' ])}>
        <Leaderboard/>
      </div>
    </div>
  )
}
