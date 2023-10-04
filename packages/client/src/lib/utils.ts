import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

import { Direction } from "../dojo/createSystemCalls";
import {ethers} from "ethers";
import {hexlify, hexStripZeros, hexZeroPad} from "ethers/lib/utils";

export function isValidArray(input: any): input is any[] {
    return Array.isArray(input) && input != null;
}

export function getFirstComponentByType(entities: any[] | null | undefined, typename: string): any | null {
    if (!isValidArray(entities)) return null;

    for (const entity of entities) {
        if (isValidArray(entity?.node?.components)) {
            const foundComponent = entity?.node?.components.find((comp: any) => comp.__typename === typename);
            if (foundComponent) return foundComponent;
        }
    }

    return null;
}

export function extractAndCleanKey(entities?: any[] | null | undefined): string | null {
    if (!isValidArray(entities) || !entities?.[0].node?.keys) return null;

    return entities[0].node.keys.replace(/,/g, '');
}

export function extractComponentWithKey(edges: Array<any>, entityKey: string) {
    return edges.find(edge => edge.keys.replace(/,/g, '').include(entityKey))
}

export function updatePositionWithDirection(direction: Direction, value: { x: number, y: number }) {
    switch (direction) {
        case Direction.Left:
            value.x--;
            break;
        case Direction.Right:
            value.x++;
            break;
        case Direction.Up:
            value.y--;
            break;
        case Direction.Down:
            value.y++;
            break;
        default:
            throw new Error("Invalid direction provided");
    }
    return value;
}

export function randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function indexEntityEncoder(type: (string | ethers.utils.ParamType)[], value: any[]) {
    //
    const output = ethers.utils.defaultAbiCoder.encode(type, value)
    return output.substring(2, output.length)
    // return {
    //     dojo: hexStripZeros(hexlify(value)),
    //     mud: output.substring(2, output.length)
    // }
}

export function multipleItemArrayToString(array: Array<any>) {
    let value = ''

    array.map(item => {
        return value += item + ','
    })

    return value.substring(0, value.length - 1)
}

export function decodeEntityWithIndex(value: string) {
    return [
        value.substring(0, 66),
        `0x${value.substring(66)}`
    ]

}

export function formatWalletAddress(str: string) {
  if (str.length > 30) {
    return str.substr(0, 6) + '...' + str.substr(str.length - 4, str.length)
  }

  return str
}

