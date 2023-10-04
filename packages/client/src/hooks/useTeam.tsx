import { useAbstracted } from './useAbstracted'
import { ethers } from 'ethers'
import { getComponentValue } from '@latticexyz/recs'
import useLatestBlockTimestamp from './useLatestBlockTimestamp'
import useDuelInfo from './useDuelInfo'
import { Entity } from '../generated/graphql'

export default function useTeam(playerEntity: Entity) {
  const {
    setup: {
      components: {
        TeamHero,
      },
    },
  } = useAbstracted()

  const teamHeroEntities = Array.from({ length: 4 }, (_, index) => {
    return ethers.utils.defaultAbiCoder.encode([ 'bytes32', 'uint8' ], [ playerEntity, index ])
  })

  const playerCardValues = teamHeroEntities.map((teamHeroEntity) => {
    return getComponentValue(TeamHero, teamHeroEntity.toString() as any)
  })

  const latestBlockTimestamp = useLatestBlockTimestamp()
  const duelInfo = useDuelInfo()
  const timeRemaining: number | undefined = latestBlockTimestamp ? Number(duelInfo?.deadline) - latestBlockTimestamp : undefined
  const isTimeRemainingLessThanZero = Boolean(timeRemaining < 0)

  return {
    playerCardValues,
    isTimeRemainingLessThanZero,
  }
}
