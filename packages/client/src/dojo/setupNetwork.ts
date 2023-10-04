import { defineContractComponents } from './contractComponents'
import { world } from './world'
import { Query, RPCProvider } from '@dojoengine/core'
import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../generated/graphql'
import { Account, num, ec} from 'starknet'

// const test = new URLSearchParams(document.location.search).get("network")
export const KATANA_ACCOUNT_ADDRESS = import.meta.env.VITE_KATANA_ACCOUNT_ADDRESS
export const KATANA_ACCOUNT_PRIVATEKEY = import.meta.env.VITE_KATANA_ACCOUNT_PRIVATEKEY
export const WORLD_ADDRESS = import.meta.env.VITE_WORLD_ADDRESS
export const EVENT_KEY = import.meta.env.VITE_EVENT_KEY
export const KATANA_URL = import.meta.env.VITE_KATANA_URL ?? 'http://localhost:5050'

export type SetupNetworkResult = Awaited<ReturnType<typeof setupNetwork>>;

export async function setupNetwork() {
  const client = new GraphQLClient('http://localhost:8080')
  const graphSdk = getSdk(client)

  const contractComponents = defineContractComponents(world)

  const provider = new RPCProvider(WORLD_ADDRESS)

  return {
    contractComponents,
    provider,
    execute: async (signer: Account, system: string, call_data: num.BigNumberish[]) => provider.execute(signer, system, call_data),
    entity: async (component: string, query: Query) => provider.entity(component, query),
    entities: async (component: string, partition: number) => provider.entities(component, partition),
    world,
    graphSdk,
  }
}
