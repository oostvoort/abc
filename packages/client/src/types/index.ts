import React from 'react'
import {Entity} from "../generated/graphql";
import {ComponentValue} from "@latticexyz/recs";

export type IconProps = Omit<React.DetailedHTMLProps<React.SVGAttributes<SVGElement>, SVGElement>, 'ref'>

export interface NavMenuProps extends React.HTMLAttributes<HTMLDivElement>{
  src: string
  alt: string
  name: string
}

export type CardInterface = {
  cardEntity: Entity
  cardValue?: ComponentValue<{cardType: number}>
  isSelected?: boolean
}

export interface PlayerCardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  playerCardEntity:  Entity
  index?: number
}

export interface ButtonEmptySlotContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedSlot:  number | undefined
  index: number
}

export interface DeckCardLobbyProps extends React.ImgHTMLAttributes<HTMLImageElement>{
  cardEntity: Entity
}

export type CardSlotType = {
  name: string,
  attributes: {
    attack: number,
    health: number,
  },
  image: string,
  level: number,
  isOpponent?: boolean
} | null
export type CardSlotsType = Array<CardSlotType>
