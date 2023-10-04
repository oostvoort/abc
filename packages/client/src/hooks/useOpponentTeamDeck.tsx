import {useAbstracted} from "./useAbstracted";
import {indexEntityEncoder} from "../lib/utils";
import useDuelInfo from "./useDuelInfo";

export default function useOpponentTeamDeck() {
    const {
        setup: {
            components: {
                TeamHero
            },
        },
        hooks: {
            useExtendedComponentValue
        }
    } = useAbstracted()

    const { opponentId } = useDuelInfo()

    const teamHeroOne = useExtendedComponentValue(TeamHero, [ opponentId, 0 ])
    const teamHeroTwo = useExtendedComponentValue(TeamHero, [ opponentId, 1 ])
    const teamHeroThree = useExtendedComponentValue(TeamHero, [ opponentId, 2 ])
    const teamHeroFour = useExtendedComponentValue(TeamHero, [ opponentId, 3 ])

    return [
        teamHeroOne,
        teamHeroTwo,
        teamHeroThree,
        teamHeroFour
    ]
}
