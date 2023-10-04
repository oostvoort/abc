import {useAbstracted} from "./useAbstracted";

export default function useDuelInfo() {

    const {
        setup: {
            components: {
                Duel,
                PlayerInDuel
            },
            network: {
                playerEntity,
            },
        },
        hooks: {
            useExtendedComponentValue
        }
    } = useAbstracted()

    const playerInDuel = useExtendedComponentValue(PlayerInDuel, [ playerEntity ])


    const duelInfo = useExtendedComponentValue(Duel, [ playerInDuel?.duelEntity ])

    const opponentId = duelInfo?.player0 == playerEntity ? duelInfo?.player1 : duelInfo?.player0

    return {
        ...duelInfo,
        opponentId
    }
}
