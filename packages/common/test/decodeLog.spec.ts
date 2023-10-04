import { expect } from "chai"
import { decodeLog } from "../src/duelLog"
import { AttackLog, DuelLogOpCode, LoserLog, WinnerLog } from "../src/types"

describe("test decode log", () => {
  it("should decode attack log", () => {
    const attackLog = "0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000900000000000000000000000000000000000000000000000000000000000000110000000000000000000000000000000000000000000000000000000000000000"

    const decodedLog = <AttackLog>decodeLog(attackLog)

    expect(decodedLog.opCode).eq(DuelLogOpCode.ATTACK, "incorrect opcode")
    expect(decodedLog.attackerEntity).eq("0x0000000000000000000000000000000000000000000000000000000000000009", "incorrect attacker")
    expect(decodedLog.targetEntity).eq("0x0000000000000000000000000000000000000000000000000000000000000011", "incorrect target")
    expect(decodedLog.targetNewHealth).eq(0, "incorrect target new health")
  })

  it("should decode round winner", () => {
    const attackLog = "0x00000000000000000000000000000000000000000000000000000000000000660000000000000000000000000000000000000000000000000000000000000002"

    const decodedLog = <WinnerLog>decodeLog(attackLog)

    expect(decodedLog.opCode).eq(DuelLogOpCode.ROUND_WINNER, "incorrect opcode")
    expect(decodedLog.winnerEntity).eq("0x0000000000000000000000000000000000000000000000000000000000000002", "incorrect winner")
  })

  it("should decode round loser", () => {
    const attackLog = "0x00000000000000000000000000000000000000000000000000000000000000670000000000000000000000000000000000000000000000000000000000000001"

    const decodedLog = <LoserLog>decodeLog(attackLog)

    expect(decodedLog.opCode).eq(DuelLogOpCode.ROUND_LOSER, "incorrect opcode")
    expect(decodedLog.loserEntity).eq("0x0000000000000000000000000000000000000000000000000000000000000001", "incorrect loser")
  })
})