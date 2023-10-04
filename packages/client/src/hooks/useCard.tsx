import {useAbstracted} from "./useAbstracted";
import {Entity} from "../generated/graphql";

export default function useCard(cardEntity: Entity) {
    const {
        hooks: {
            useExtendedComponentValue,
        },
        setup: {
            components: {
                Image,
                Name,
                HeroCard,
                ItemCard,
            },
        },
    } = useAbstracted()

    const hero = useExtendedComponentValue(HeroCard, [cardEntity])
    const item = useExtendedComponentValue(ItemCard, [cardEntity])
    const image = useExtendedComponentValue(Image, [cardEntity])
    const name = useExtendedComponentValue(Name, [cardEntity])

    return {
        hero,
        image,
        name,
        item
    }
}
