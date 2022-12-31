import {createContext} from "react";

export type Fighter = {
    id?: string,
    name?: string,
    wins?: number|string
    defeats?: number|string
    battles?: number|string
    characterId?: string
    type: string
    physical_defence: number
    magical_defence: number
    life_points: number
    accuracy: number
    evasion: number
    critical_chance: number
    hit_power: number
    image: string
}

export type FighterContextType = {
    fighter: Fighter|null
    updateFighter:(u: any) => void
}

export const defaultFighterState = {
    fighter: null,
    updateFighter: (u: object | null) => u,
}
const FighterContext = createContext<FighterContextType>(defaultFighterState);

export default FighterContext
