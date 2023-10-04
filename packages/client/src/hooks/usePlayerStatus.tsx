import { useAbstracted } from './useAbstracted'

export default function usePlayerStatus() {
  const {
   setup: {
     components: {
       Player
     },
     network: {
       playerEntity
     }
   },
    hooks: {
     useExtendedComponentValue
    }
  } = useAbstracted()

  const player = useExtendedComponentValue(Player, [ playerEntity ])

  return player as { isPlayer?: boolean }
}
