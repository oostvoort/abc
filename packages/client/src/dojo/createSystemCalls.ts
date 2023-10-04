import { SetupNetworkResult } from './setupNetwork'
import {
  Account,
  InvokeTransactionReceiptResponse,
  shortString,
} from 'starknet'
import {  } from '@dojoengine/react/'
import { EntityIndex, getComponentValue, setComponent } from '@latticexyz/recs'
import { uuid } from '@latticexyz/utils'
import { ClientComponents } from './createClientComponents'
import { updatePositionWithDirection } from '../lib/utils'
import { defaultAbiCoder } from 'ethers/lib/utils'
import { Counter as CounterQL } from '../generated/graphql'

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { execute, contractComponents, provider }: SetupNetworkResult,
  { Counter }: ClientComponents,
) {
  // dojo signer
  const entityId = parseInt('0x3ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0') as EntityIndex

  const increment = async (signer: Account, index?: number, entityId?: any) => {

    const tx = await execute(signer, 'increment', [ defaultAbiCoder.encode([ 'uint8' ], [ index ]) ])

    const receipt = await signer.waitForTransaction(tx.transaction_hash)

    const events = parseEvent(receipt)

    const counterEvent = events[0] as CounterQL
    const entity = parseInt(events[0].entity.toString())

    setComponent(contractComponents.Counter, parseInt(entity.toString()) as EntityIndex, { value: counterEvent.value })
    console.log({ receipt })
  }

  // const spawn = async (signer: Account) => {
  //
  //     const positionId = uuid();
  //     Position.addOverride(positionId, {
  //         entity: entityId,
  //         value: { x: 0, y: 0 },
  //     });
  //
  //     const movesId = uuid();
  //     Moves.addOverride(movesId, {
  //         entity: entityId,
  //         value: { remaining: 10 },
  //     });
  //
  //     try {
  //         const tx = await execute(signer, "spawn", []);
  //         const receipt = await signer.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
  //
  //         const events = parseEvent(receipt)
  //         const entity = parseInt(events[0].entity.toString()) as EntityIndex
  //
  //         const movesEvent = events[0] as Moves;
  //         setComponent(contractComponents.Moves, entity, { remaining: movesEvent.remaining })
  //
  //         const positionEvent = events[1] as Position;
  //         setComponent(contractComponents.Position, entity, { x: positionEvent.x, y: positionEvent.y })
  //     } catch (e) {
  //
  //         Position.removeOverride(positionId);
  //         Moves.removeOverride(movesId);
  //     } finally {
  //         Position.removeOverride(positionId);
  //         Moves.removeOverride(movesId);
  //     }
  // };
  //
  // const move = async (signer: Account, direction: Direction) => {
  //
  //     const positionId = uuid();
  //     Position.addOverride(positionId, {
  //         entity: entityId,
  //         value: updatePositionWithDirection(direction, getComponentValue(Position, entityId) as Position),
  //     });
  //
  //     const movesId = uuid();
  //     Moves.addOverride(movesId, {
  //         entity: entityId,
  //         value: { remaining: (getComponentValue(Moves, entityId)?.remaining || 0) - 1 },
  //     });
  //
  //     try {
  //         const tx = await execute(signer, "move", [direction]);
  //         const receipt = await signer.waitForTransaction(tx.transaction_hash, { retryInterval: 100 })
  //
  //         const events = parseEvent(receipt)
  //         const entity = parseInt(events[0].entity.toString()) as EntityIndex
  //
  //         const movesEvent = events[0] as Moves;
  //         setComponent(contractComponents.Moves, entity, { remaining: movesEvent.remaining })
  //
  //         const positionEvent = events[1] as Position;
  //         setComponent(contractComponents.Position, entity, { x: positionEvent.x, y: positionEvent.y })
  //     } catch (e) {
  //
  //         Position.removeOverride(positionId);
  //         Moves.removeOverride(movesId);
  //     } finally {
  //         Position.removeOverride(positionId);
  //         Moves.removeOverride(movesId);
  //     }
  //
  // };

  return {
    increment,
    // spawn,
    // move
  }
}


// TODO: Move types and generalise this

export enum Direction {
  Left = 0,
  Right = 1,
  Up = 2,
  Down = 3,
}

export enum ComponentEvents {
  Counter = 'Counter',
}

export interface BaseEvent {
  type: ComponentEvents;
  entity: string;
}

export interface Counter extends BaseEvent {
  value: number;
}

export const parseEvent = (
  receipt: InvokeTransactionReceiptResponse,
): Array<Counter> => {
  if (!receipt.events) {
    throw new Error(`No events found`)
  }

  const events: Array<Counter> = []

  for (const raw of receipt.events) {
    const decodedEventType = shortString.decodeShortString(raw.data[0])

    switch (decodedEventType) {
      case ComponentEvents.Counter:
        if (raw.data.length < 6) {
          throw new Error('Insufficient data for Counter event.')
        }



        events.push({
            type: ComponentEvents.Counter,
            entity: raw.data[2],
            value: Number(raw.data[5]),
          }
        )
        break
      default:
        throw new Error('Unsupported event type.')
    }
  }

  return events
}
