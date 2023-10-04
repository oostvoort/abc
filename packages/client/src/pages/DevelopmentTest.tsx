import MainLayout from "../components/MainLayout";
import {clsx} from "clsx";
import ChooseNetwork from "../components/ChooseNetwork";
import Authentication from "../components/Authentication";
import BoosterPack from "../components/BoosterPack";
import Lobby from "../components/Lobby";
import { useAbstracted } from "../hooks/useAbstracted";
import {useEntityQuery} from '@latticexyz/react'
import {getComponentValue, Has} from '@latticexyz/recs'
import {useMUD} from "../MUDContext";

export default function DevelopmentTest() {
    const {
        components: {
            HeroCard,
            Name
        }
    } = useMUD()

    const heroCards = useEntityQuery([Has(HeroCard)]).map(entity => {
        return [getComponentValue(Name, entity)?.value, getComponentValue(HeroCard, entity)]
    })


    return (
        <MainLayout.WideSubWrapper className={clsx([
            'flex-1',
            'my-5',
            'grid grid-cols-3 grid-rows-3 gap-5',
            '[&>section]:border [&>section]:p-3 [&>section]:rounded-xl [&>section]:shadow-md',
            '[&>section]:flex [&>section]:flex-col [&>section]:gap-2 [&>section>p]:underline [&>section]:underline-offset-4'
        ])}>
            <section>
                <p>1.) Network Selection Component</p>
                <ChooseNetwork/>
            </section>
            <section>
                <p>2.) Log in / Sign in Component</p>
                <Authentication/>
            </section>
            <section>
                <p>3.) Lobby Component</p>
                <Lobby/>
            </section>
            <section>
                <p>4.) Booster Pack</p>
                <BoosterPack/>
            </section>
            <section>
                <p>5.) Inventory Component</p>
            </section>
            <section>
                <p>6.) Booster Pack Component</p>
            </section>
            <section>
                <p>7.) Setup Phase Component</p>
            </section>
            <section>
                <p>8.) Result Component</p>
            </section>
            <section className='bg-primary text-primary-foreground'>
                <p>DEBUG WINDOW</p>
                <div>
                    <p className='font-bold text-sm'>Hero Cards: </p>
                    {
                        heroCards.map(card => (
                            <p key={JSON.stringify(card)}>{String(card[0])}: {JSON.stringify(card[1])}</p>
                        ))
                    }
                </div>
            </section>
        </MainLayout.WideSubWrapper>
    )
}
