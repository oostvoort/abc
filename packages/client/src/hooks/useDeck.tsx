import { Entity } from '../generated/graphql'
import { useAbstracted } from './useAbstracted'
import { ethers } from 'ethers'
import { getComponentValue } from '@latticexyz/recs'

export default function useDeck(playerEntity : Entity){
  const {
    setup: {
      components: {
        DeckCard,
      },
    },
  } = useAbstracted()

  const deckCardEntities = Array.from({ length: 12 }, (_, index) => {
    return ethers.utils.defaultAbiCoder.encode([ 'bytes32', 'uint256' ], [ playerEntity, index ])
  })

  const playerCardValues = deckCardEntities.map((deckCardEntity) => {
    return getComponentValue(DeckCard, deckCardEntity.toString() as any)
  })

  return {
    deckCardEntities,
    playerCardValues
  }
}
