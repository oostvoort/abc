import React from 'react'
import { clsx } from 'clsx'
import RoomButton from './RoomButton'
import { formatWalletAddress } from '../lib/utils'

interface RoomListProps extends React.HTMLAttributes<HTMLDivElement>{
  duelData: DuelDataType
}

interface DuelDataType {
  deadline: number
  ongoing: boolean
  player0: string
  player0Wins: number
  player1: string
  player1Wins: number
}

const RoomList = React.forwardRef<HTMLDivElement, RoomListProps>(
  ({className, duelData, ...props}, ref) => {

    return(
      <div className={clsx(['w-full max-h-[75px] h-full mt-xs', className])} ref={ref} {...props}>
        <RoomButton>
          {
            duelData.ongoing
              ? (
                <RoomButton.Spectate>
                  <RoomButton.Name>Spectate</RoomButton.Name>
                  <RoomButton.Wrapper>
                    <RoomButton.SpectateWrapper>
                      <RoomButton.WalletAddress>{formatWalletAddress(duelData.player0)}</RoomButton.WalletAddress>
                      <RoomButton.Text
                        className={'!text-lg font-bold'}>VS</RoomButton.Text>
                      <RoomButton.WalletAddress>{formatWalletAddress(duelData.player1)}</RoomButton.WalletAddress>
                    </RoomButton.SpectateWrapper>

                    <RoomButton.SpectateWrapper>
                      <RoomButton.BattlePower>BP: 10-15</RoomButton.BattlePower>
                      <RoomButton.BattlePower>BP: 10-15</RoomButton.BattlePower>
                    </RoomButton.SpectateWrapper>
                  </RoomButton.Wrapper>
                </RoomButton.Spectate>
              )
              : (
                <RoomButton.Battle>
                  <RoomButton.Name>Battle</RoomButton.Name>
                  <RoomButton.Wrapper>
                    <RoomButton.WalletAddress>{formatWalletAddress(duelData.player0)}</RoomButton.WalletAddress>
                    <RoomButton.BattlePower>Your Battle Power: 10-15</RoomButton.BattlePower>
                  </RoomButton.Wrapper>
                </RoomButton.Battle>
              )
          }
        </RoomButton>
      </div>
    )
  }

)

RoomList.displayName = 'RoomList'

export default RoomList
