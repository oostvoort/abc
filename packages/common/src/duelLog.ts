import { ethers } from 'ethers'
import { DuelLogOpCode, DueLog } from './types'

export function decodeLog(log: string): DueLog {
  return resolveLog(
    resolveOpCode(log),
    log
  )
}

export function resolveOpCode(log: string): DuelLogOpCode {
  return Number.parseInt(log.slice(0, 66));
}

export function resolveLog(opCode: DuelLogOpCode, log: string): DueLog {
  let decodeResult;
  switch (opCode) {
    case DuelLogOpCode.ATTACK:
      decodeResult = ethers.utils.defaultAbiCoder.decode(["uint256", "bytes32", "bytes32", "uint8"], log)

      return {
        opCode: DuelLogOpCode.ATTACK,
        attackerEntity: decodeResult[1],
        targetEntity: decodeResult[2],
        targetNewHealth: decodeResult[3],
      }
    case DuelLogOpCode.ROUND_WINNER:
      decodeResult = ethers.utils.defaultAbiCoder.decode(["uint256", "bytes32"], log)

      return {
        opCode: DuelLogOpCode.ROUND_WINNER,
        winnerEntity: decodeResult[1],
      }
    case DuelLogOpCode.ROUND_LOSER:
      decodeResult = ethers.utils.defaultAbiCoder.decode(["uint256", "bytes32"], log)

      return {
        opCode: DuelLogOpCode.ROUND_LOSER,
        loserEntity: decodeResult[1],
      }
    default:
      throw new Error(`Unknown log OpCode: ${opCode}`)
  }
}
