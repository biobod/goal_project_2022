import { HIT_OPTIONS } from '../../constants/fightConstants'
import getRandomIndex from '../../utils/getRandomIndex'
import { Fighter } from '../../contexts/FighterContext'

// logs
export const protectLog = (name: string, bodyPart: typeof HIT_OPTIONS[number]) => `${name} protect his ${bodyPart}!`
export const missLog = (name: string) => `${name} missed!`
export const criticalDamageLog = (name: string) => `${name} made a Critical HIT! `
export const blockDamageLog = (name: string, damageBlocked: number) => `${name} blocks ${damageBlocked} hit damage`
export const lifePointsLog = (name: string, damage: number, lifePoints: number) => {
    return `${name} get ${damage} damage. New life balance is ${lifePoints}`
}
// calculations
const getRandomAction = () => {
    const index = getRandomIndex(3, 1)
    return HIT_OPTIONS[index]
}
export const getEnemyHitData = () => {
    const block = getRandomAction()
    const hit = getRandomAction()
    return { hit, block }
}

export const calculateMiss = (accuracy: number, enemyEvasion: number) => {
    const chance = accuracy - enemyEvasion
    return Math.random() * 100 > chance
}
export const calculateCriticalHit = (criticalChance: number) => {
    return Math.random() * 100 < criticalChance
}

export const getDamage = (fighterA: Fighter, enemyFighter: Fighter, blockDamage: boolean) => {
    let { hit_power: damage } = fighterA
    let log = ''
    const isMiss = calculateMiss(fighterA.accuracy, enemyFighter.evasion)
    if (isMiss) {
        log = missLog(fighterA.name)
        return { damage: 0, log }
    }
    if (blockDamage) {
        damage = damage / 2
    }
    const isCriticalHit = calculateCriticalHit(fighterA.critical_chance)
    if (isCriticalHit) {
        damage = damage * 2
        log = criticalDamageLog(fighterA.name)
    }
    return { damage, log }
}

export const getDamageAfterBlock = (fighterA: Fighter, enemyFighter: Fighter, damage: number) => {
    const isMage = fighterA.type === 'Mage'
    const defence = isMage ? enemyFighter.magical_defence : enemyFighter.physical_defence
    const newDamage = damage - defence
    return {
        resultDamage: newDamage <= 0 ? 0 : newDamage,
        log: blockDamageLog(enemyFighter.name, defence),
    }
}
export const getNewLifePoints = (name: string, life: number, damage: number) => {
    const newLifePoints = life - damage
    return {
        newLifePoints: newLifePoints < 0 ? 0 : newLifePoints,
        log: lifePointsLog(name, damage, newLifePoints),
    }
}
