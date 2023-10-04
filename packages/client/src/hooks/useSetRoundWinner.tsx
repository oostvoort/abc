import { useMutation } from '@tanstack/react-query'
import {useAbstracted} from "./useAbstracted";
import {WINNER} from "../mud/createSystemCalls";

export default function useSetRoundWinner() {
    const {
        setup: {
            systemCalls: {
                setRoundWinner
            }
        }
    } = useAbstracted()

    return useMutation({
        mutationFn: async (winner: WINNER) => {
            return setRoundWinner(winner)
        }
    })
}
