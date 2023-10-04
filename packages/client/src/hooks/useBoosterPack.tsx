import { useAbstracted } from './useAbstracted'
import { useMutation } from '@tanstack/react-query'

export default function useBoosterPack() {
  const {
    setup: {
      systemCalls: {
        openPack,
      },
    },
  } = useAbstracted()

  return useMutation({
    mutationFn: async (pack: `0x${string}`) => {
      return await openPack(pack)
    },
  })
}
