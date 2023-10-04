import {useAbstracted} from "./useAbstracted";
import {indexEntityEncoder} from "../lib/utils";

export default function usePlayerTeamDeck() {
    const {
        setup: {
            components: {
                TeamHero
            },
            network: {
                playerEntity
            },
            account: { account }
        },
        hooks: {
            useExtendedComponentValue
        }
    } = useAbstracted()

    const playerId = account ? account.address : playerEntity

    const teamHeroOne = useExtendedComponentValue(TeamHero, [ playerId, 0 ])
    const teamHeroTwo = useExtendedComponentValue(TeamHero, [ playerId, 1 ])
    const teamHeroThree = useExtendedComponentValue(TeamHero, [ playerId, 2 ])
    const teamHeroFour = useExtendedComponentValue(TeamHero, [ playerId, 3 ])

    return [
        teamHeroOne,
        teamHeroTwo,
        teamHeroThree,
        teamHeroFour
    ]
}
