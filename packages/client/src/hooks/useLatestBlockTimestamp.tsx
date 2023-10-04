import React from 'react'
import {useAbstracted} from "./useAbstracted";

export default function useLatestBlockTimestamp() {
    const {
        network,
        setup: {
            network: {
                latestBlock$
            }
        }
    } = useAbstracted()

    const [latestBlockTimestamp, setLatestBlockTimestamp] = React.useState<number | undefined>(undefined)

    React.useEffect(() => {
        latestBlock$.subscribe((update) => {
            if (update) {
                setLatestBlockTimestamp(Number(update.timestamp))
            }
        })
    }, [latestBlock$])



    return latestBlockTimestamp
}
