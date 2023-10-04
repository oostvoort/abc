export enum DuelLogOpCode {
  ATTACK = 1,
  DUEL_WINNER = 101,
  ROUND_WINNER = 102,
  ROUND_LOSER = 103,
}

export type AttackLog = {
  opCode: DuelLogOpCode.ATTACK;
  attackerEntity: string;
  targetEntity: string;
  targetNewHealth: number;
}

export type WinnerLog = {
  opCode: DuelLogOpCode.ROUND_WINNER;
  winnerEntity: string;
}

export type LoserLog = {
  opCode: DuelLogOpCode.ROUND_LOSER;
  loserEntity: string;
}

export type DueLog = AttackLog | WinnerLog | LoserLog
