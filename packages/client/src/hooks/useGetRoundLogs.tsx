import { useQuery } from '@tanstack/react-query'
import { useAbstracted } from './useAbstracted'

export default function useGetRoundLogsQuery(duelEntity: `0x${string}`) {
  const {
    setup: {
      systemCalls: {
        getRoundLogs,
      },
    },
  } = useAbstracted()

  return useQuery({
    queryKey: [ `getRoundLogs-${duelEntity}` ],
    queryFn: async () => {
      return  await getRoundLogs(duelEntity)
    },
    onError: (err) => {
      console.error(`Get Round Logs Error: ${err}`)
    }
  })
}
