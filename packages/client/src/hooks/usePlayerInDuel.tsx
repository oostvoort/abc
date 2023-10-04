import {useAbstracted} from "./useAbstracted";
import {useEntityQuery} from "@latticexyz/react";
import {Has} from "@latticexyz/recs";

export default function usePlayerInDuel() {
    const {
        setup: {
            components: {
                PlayerInDuel
            },
            network: {
                playerEntity
            }
        },
        hooks: {
            useExtendedComponentValue
        }
    } = useAbstracted()


    const playerInDuelInfoEntity = useEntityQuery([Has(PlayerInDuel)]).find(entity => {
        return entity == playerEntity
    })

    const playerInDuel = useExtendedComponentValue(PlayerInDuel, [ playerInDuelInfoEntity ])

    return playerInDuel as Partial<{ duelEntity: string, ready: boolean }>
}
