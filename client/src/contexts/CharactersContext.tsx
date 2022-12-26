import { createContext } from 'react'

export type Character = {
    id: string
    name: string
    physical_defence: number
    magical_defence: number
    life_points: number
    accuracy: number
    evasion: number
    critical_chance: number
    hit_power: number
}

export type CharactersContextType = {
    charactersData: [Character] | null
    updateCharactersData: (u: any) => void
}

export const defaultCharactersState = {
    charactersData: null,
    updateCharactersData: (u: any) => u,
}
const CharactersContext = createContext<CharactersContextType>(
    defaultCharactersState
)

export default CharactersContext
