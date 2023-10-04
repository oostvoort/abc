import React from 'react'
import {setup as mudSetup} from '../mud/setup'
import {setup as dojoSetup} from '../dojo/setup'
import {Account, RpcProvider} from "starknet";
import {useBurner} from "@dojoengine/create-burner";
import {PUBLIC_ACCOUNT_CLASS_HASH, PUBLIC_MASTER_ADDRESS, PUBLIC_MASTER_PRIVATE_KEY} from "../DojoContext";
import {useQuery} from '@tanstack/react-query'
import {gql, request} from "graphql-request";
import {Component} from "@latticexyz/recs";
import {Entity} from "../generated/graphql";
import {useComponentValue} from "@latticexyz/react";
import {getFirstComponentByType, indexEntityEncoder, multipleItemArrayToString} from "../lib/utils";
import _ from 'lodash'
import {hexlify, hexStripZeros} from "ethers/lib/utils";
import { useAtom } from 'jotai'
import { activePage_atom } from '../atoms'
import useLocalStorage from '../hooks/useLocalStorage'

// TODO: add real list of networks based on dojo and mud

const URL = import.meta.env.VITE_TORII_ENDPOINT ?? 'http://localhost:8080'

const query = gql`
    query Entities($account: String!, $id: String!) {
        entities(keys:[$account, $id]) {
            totalCount
            edges {
                node {
                    id
                    keys
                    components {
                        ... on Counter {
                            __typename
                            value
                        }
                    }
                }
            }
        }
    }
`

export type MudReturnSetup = Awaited<ReturnType<typeof mudSetup>> & {
    account: Partial<any>,
}
export type DojoReturnSetup = Awaited<ReturnType<typeof dojoSetup>> & {
    account: ReturnType<typeof useBurner>
}
export type DojoOrMudSetup<T> = T extends MudReturnSetup ? MudReturnSetup : DojoReturnSetup
export type Networks = 'mud' | 'dojo' | undefined
export type AbstractGameEngine = {
    network: Networks,
    setNetwork: React.Dispatch<React.SetStateAction<Networks>>,
    setup: MudReturnSetup & DojoReturnSetup,
    hooks: {
        useExtendedComponentValue: (component: Component, entityKeys: Array<any>, initialValue?: any) => any
    }
}
export const AbstractedGameEngineContext = React.createContext<AbstractGameEngine>({} as AbstractGameEngine)

export default function AbstractedGameProvider({_mudSetup, children}: {
    _mudSetup: MudReturnSetup,
    // _dojoSetup?: DojoReturnSetup,
    children: React.ReactNode,
}) {
    // const [currentPage, setCurrentPage] = useAtom(activePage_atom)

    const [network, setNetwork] = useLocalStorage('network-setup', undefined)

    // const provider = new RpcProvider({
    //     nodeUrl: "http://localhost:5050",
    // });

    // const masterAccount = new Account(provider, PUBLIC_MASTER_ADDRESS!, PUBLIC_MASTER_PRIVATE_KEY!)
    // const {create, list, get, account, select, isDeploying} = useBurner(
    //     {
    //         masterAccount: masterAccount,
    //         accountClassHash: PUBLIC_ACCOUNT_CLASS_HASH!,
    //         provider: provider
    //     }
    // );

    const extendedMudSetup = {
        ..._mudSetup,
        network: {
          ..._mudSetup.network,
        },
        account: {
            create: undefined,
            list: undefined,
            get: undefined,
            account: undefined,
            select: undefined,
        },
    }

    // const extendedDojoSetup = {
    //     ..._dojoSetup,
    //     network: {
    //         ..._dojoSetup.network,
    //         playerEntity: (account ? account.address.toString() : masterAccount.address.toString())
    //     },
    //     account: {create, list, get, account, select, isDeploying},
    // }

    // TODO: convert this interval fetch into graphql subscribe
    // const useDojoComponentValue = (component: Component, entityId: Entity) => {
    //     const componentKey = component.metadata.componentName ?? component.metadata.name
    //
    //     return useQuery({
    //         enabled: !!URL && network == 'dojo',
    //         queryKey: ['torii', componentKey, entityId],
    //         queryFn: async () => {
    //             if (!account && !masterAccount) throw new Error('no accounts')
    //             if (!URL) throw new Error('Torii endpoint not yet set to env')
    //
    //
    //
    //             const results = await request({
    //                 url: URL,
    //                 document: query,
    //                 variables: {
    //                     account: account.address ??  masterAccount.address,
    //                     id: multipleItemArrayToString(entityId)
    //                 }
    //             })
    //
    //
    //             return getFirstComponentByType(results?.entities?.edges, component.metadata.componentName ?? component.metadata.name) as any
    //         },
    //         refetchInterval: 1000,
    //     })
    // }

    // Extended variant of Lattice's useComponentValue that merges both dojo and mud calls
    const useExtendedComponentValue = (component: Component, entityKeys: Array<any>, initialValue?: any) => {
        let encodedEntityId = {
            mud: entityKeys[0],
            // dojo: []
        }

        entityKeys.map((entityKey, index) => {
            //
            if (index == 0) {
                encodedEntityId = {
                    ...encodedEntityId
                }
            }
            else {
                encodedEntityId = {
                    mud: encodedEntityId.mud + indexEntityEncoder(['uint8'], [entityKey]),
                    // dojo: _.concat(encodedEntityId.dojo, hexStripZeros(hexlify(entityKey)))
                }
            }
        })

        const mudReturn = useComponentValue(component, encodedEntityId.mud);
        // TODO: filter using entityId
        // const { data: dojoReturn } = useDojoComponentValue(component, encodedEntityId.dojo)
        switch (network) {
            // case 'dojo': {
            //     return dojoReturn ?? initialValue ?? undefined
            // }
            default:
            case 'mud': {
                return mudReturn ?? initialValue ?? undefined
            }
        }
    }

  // controller for screens



    return (
        <AbstractedGameEngineContext.Provider value={{
            network,
            setNetwork,
            // setup: !network || network == 'mud' ? extendedMudSetup : extendedDojoSetup,
            setup: extendedMudSetup,
            hooks: {
                useExtendedComponentValue,
            }
        }}>
            {children}
        </AbstractedGameEngineContext.Provider>
    )
}

export function useAbstracted() {
    return React.useContext(AbstractedGameEngineContext)
}
