import {atom} from 'jotai'

export enum CardType{
  Unknown,
  Hero,
  Item
}

export enum ACTIVE_PAGE {
  NETWORK,
  HOME,
  LOBBY,
  PREPARATION,
  BATTLE,
  INVENTORY,
  BOOSTER_PACK,
  LOADING,
  WAITING_ROOM
}

export const activePage_atom = atom<ACTIVE_PAGE | undefined>(undefined)

export const selectedCard_atom = atom<[number | undefined, number | undefined]>([undefined, undefined])
