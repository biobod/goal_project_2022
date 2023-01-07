import React, { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { faker } from '@faker-js/faker'

import FighterContext, { Fighter } from '../../contexts/FighterContext'
import { useNavigate } from 'react-router-dom'
import { HOME } from '../../constants/routePaths'
import fightIcon from '../../../public/images/fight-icon.jpeg'
import FighterBlock from './FighterBlock'
import getRandomIndex from '../../utils/getRandomIndex'
import { HIT_OPTIONS } from '../../constants/fightConstants'

import { Button, Box } from '@mui/material'
import CharactersContext from '../../contexts/CharactersContext'
import { characters } from '../../constants/characters'

const Wrapper = styled('div')({
    margin: 20,
    display: 'flex',
    justifyContent: 'space-between',
})

const getRandomAction = () => {
    const index = getRandomIndex(3, 1)
    return HIT_OPTIONS[index]
}
const getEnemyHitData = () => {
    const block = getRandomAction()
    const hit = getRandomAction()
    return { hit, block }
}

const calculateMiss = (accuracy, enemyEvasion) => {
    const chance = accuracy - enemyEvasion
    return Math.random() * 100 > chance
}
const calculateCriticalHit = (criticalChance) => {
    return Math.random() * 100 < criticalChance
}
const missLog = (name: string) => `${name} missed!`
const criticalDamageLog = (name: string) => `${name} made a Critical HIT! `
const blockDamageLog = (name: string, damageBlocked: number) =>
    `${name} blocks ${damageBlocked} hit damage`
const lifePointsLog = (name: string, damage: number, lifePoins: number) =>
    `${name} get ${damage} damage. New life balance is ${lifePoins}`

const FightPage = () => {
    const navigate = useNavigate()
    const [oppositeFighter, setOppositeFighter] = useState<Fighter | null>(null)
    const [logs, setLogs] = useState<string[]>([])
    const [block, setBlock] = useState(null)
    const [hitTo, setHitTo] = useState(null)
    const [enemyHitData, setEnemyHitData] = useState(getEnemyHitData())
    const { fighter, updateFighter } = useContext(FighterContext)
    const { charactersData } = useContext(CharactersContext)

    useEffect(() => {
        const randomFighter = {
            ...charactersData[getRandomIndex()],
        }
        const { name: type } = randomFighter
        randomFighter.type = type
        randomFighter.name = faker.internet.userName()
        randomFighter.image = characters[randomFighter.type].image

        setOppositeFighter(randomFighter)
    }, [])

    useEffect(() => {
        if (!fighter) {
            navigate(HOME)
        }
    }, [fighter])
    if (!fighter) {
        return null
    }
    // calculations

    const getDamage = (fighterA, enemyFighter) => {
        let { hit_power: damage } = fighterA
        let log = ''
        const isMiss = calculateMiss(fighterA.accuracy, enemyFighter.evasion)
        if (isMiss) {
            log = missLog(fighterA.name)
            return { damage: 0, log }
        }
        const isCriticalHit = calculateCriticalHit(fighterA.critical_chance)
        if (isCriticalHit) {
            damage = damage * 2
            log = criticalDamageLog(fighterA.name)
        }
        return { damage, log }
    }

    const getDamageAfterBlock = (fighterA, enemyFighter, damage) => {
        const isMage = fighterA.type === 'Mage'
        const defence = isMage
            ? enemyFighter.magical_defence
            : enemyFighter.physical_defence
        const newDamage = damage - defence
        return {
            resultDamage: newDamage <= 0 ? 0 : newDamage,
            log: blockDamageLog(enemyFighter.name, defence),
        }
    }

    const getNewLifePoints = (fighterA, damage) => {
        const { life_points } = fighterA
        const newLifePoints = life_points - damage
        return {
            newLifePoints: newLifePoints < 0 ? 0 : newLifePoints,
            log: lifePointsLog(fighterA.name, damage, newLifePoints),
        }
    }

    const onHit = () => {
        const logsPool = ['']
        const { damage: fighterDamage, log: fighterDamageLog } = getDamage(
            fighter,
            oppositeFighter
        )
        logsPool.push(fighterDamageLog)
        const { damage: oppositeFighterDamage, log: oppositeFighterDamageLog } =
            getDamage(oppositeFighter, fighter)
        logsPool.push(oppositeFighterDamageLog)

        const {
            resultDamage: fighterResultDamage,
            log: fighterBlockDamageLog,
        } = getDamageAfterBlock(fighter, oppositeFighter, fighterDamage)
        logsPool.push(fighterBlockDamageLog)

        const {
            resultDamage: oppositeFighterResultDamage,
            log: oppositeFighterBlockDamageLog,
        } = getDamageAfterBlock(oppositeFighter, fighter, oppositeFighterDamage)
        logsPool.push(oppositeFighterBlockDamageLog)

        const { newLifePoints: fighterLife, log: fighterLifePointsLog } =
            getNewLifePoints(fighter, oppositeFighterResultDamage)
        logsPool.push(fighterLifePointsLog)

        const {
            newLifePoints: oppositeFighterLife,
            log: oppositeFighterLifePointsLog,
        } = getNewLifePoints(oppositeFighter, fighterResultDamage)
        logsPool.push(oppositeFighterLifePointsLog)

        const validLogsPool = logsPool.filter((v) => v);

        setLogs([...logs, ...validLogsPool, '  ---------------------------------------------'])

        setOppositeFighter({
            ...oppositeFighter,
            life_points: oppositeFighterLife,
        })
        updateFighter({ ...fighter, life_points: fighterLife })
    }

    return (
        <div>
            <Wrapper>
                <FighterBlock
                    fighter={fighter}
                    setBlock={setBlock}
                    setHitTo={setHitTo}
                    hitTo={hitTo}
                    block={block}
                />
                <Box
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                >
                    <img width={100} height={100} src={fightIcon} />
                    <Button
                        color="secondary"
                        variant="contained"
                        disabled={!hitTo || !block}
                        onClick={onHit}
                    >
                        HIT
                    </Button>
                </Box>
                {oppositeFighter && (
                    <FighterBlock fighter={oppositeFighter} isEnemy />
                )}
            </Wrapper>
            <div>
                {logs.map((l) => (
                    <div>{l}</div>
                ))}
            </div>
        </div>
    )
}

export default FightPage
