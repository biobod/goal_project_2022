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
import { getNewLifePoints, protectLog, getDamageAfterBlock, getDamage, getEnemyHitData } from './utils'
import { Button, Box } from '@mui/material'
import CharactersContext from '../../contexts/CharactersContext'
import { characters } from '../../constants/characters'
import CustomizedSnackbar from '../CustomizedSnackbar'

const Wrapper = styled('div')({
    margin: 20,
    display: 'flex',
    justifyContent: 'space-between',
})

const FightPage = () => {
    const navigate = useNavigate()
    const [oppositeFighter, setOppositeFighter] = useState<Fighter | null>(null)
    const [logs, setLogs] = useState<string[]>([])
    const [showWinner, setShowWinner] = useState<string>('')
    const [block, setBlock] = useState<typeof HIT_OPTIONS[number] | null>(null)
    const [hitTo, setHitTo] = useState<typeof HIT_OPTIONS[number] | null>(null)
    const { fighter } = useContext(FighterContext)
    const { charactersData } = useContext(CharactersContext)
    const [fighterLife, setFighterLife] = useState<number>(fighter?.life_points || 0)

    useEffect(() => {
        if (charactersData) {
            const randomCharacter = charactersData[getRandomIndex()]
            const randomFighter: Fighter = {
                ...randomCharacter,
                type: randomCharacter.name,
                name: faker.internet.userName(),
                image: characters[randomCharacter.name].image,
            }

            setOppositeFighter(randomFighter)
        }
    }, [])

    useEffect(() => {
        if (!fighter) {
            navigate(HOME)
        }
    }, [fighter])

    useEffect(() => {
        if (oppositeFighter && fighter) {
            if (fighterLife <= 0) {
                setShowWinner(oppositeFighter?.name)
            } else if (oppositeFighter?.life_points <= 0) {
                setShowWinner(fighter.name)
            }
        }
    }, [oppositeFighter, fighterLife])

    useEffect(() => {
        if (showWinner) {
            setTimeout(() => navigate(HOME), 3000)
        }
    }, [showWinner])

    if (!fighter) {
        return null
    }

    const onHit = () => {
        if (!oppositeFighter) {
            return
        }
        const { hit: enemyHit, block: enemyBlock } = getEnemyHitData()

        const logsPool = ['---------------------------------------------------']
        const isFighterBlockedDamage = block === enemyHit
        const isEnemyBlockedDamage = enemyBlock === hitTo

        if (isFighterBlockedDamage) {
            logsPool.push(protectLog(fighter.name, block))
        }
        if (isEnemyBlockedDamage) {
            logsPool.push(protectLog(oppositeFighter.name, enemyBlock))
        }

        const { damage: fighterDamage, log: fighterDamageLog } = getDamage(fighter, oppositeFighter, isEnemyBlockedDamage)
        logsPool.push(fighterDamageLog)
        const { damage: oppositeFighterDamage, log: oppositeFighterDamageLog } = getDamage(oppositeFighter, fighter, isFighterBlockedDamage)
        logsPool.push(oppositeFighterDamageLog)

        // means no MIS. Calculate enemy result life
        if (fighterDamage) {
            const { resultDamage: fighterResultDamage, log: fighterBlockDamageLog } = getDamageAfterBlock(
                fighter,
                oppositeFighter,
                fighterDamage
            )
            logsPool.push(fighterBlockDamageLog)
            const { newLifePoints: oppositeFighterLife, log: oppositeFighterLifePointsLog } = getNewLifePoints(
                oppositeFighter.name,
                oppositeFighter.life_points,
                fighterResultDamage
            )
            logsPool.push(oppositeFighterLifePointsLog)
            setOppositeFighter({
                ...oppositeFighter,
                life_points: oppositeFighterLife,
            })
        }
        // means no MIS. Calculate the fighter result life
        if (oppositeFighterDamage) {
            const { resultDamage: oppositeFighterResultDamage, log: oppositeFighterBlockDamageLog } = getDamageAfterBlock(
                oppositeFighter,
                fighter,
                oppositeFighterDamage
            )
            logsPool.push(oppositeFighterBlockDamageLog)

            const { newLifePoints: fighterLifePoints, log: fighterLifePointsLog } = getNewLifePoints(
                fighter.name,
                fighterLife,
                oppositeFighterResultDamage
            )
            logsPool.push(fighterLifePointsLog)
            console.log({ fighterLifePoints })
            setFighterLife(fighterLifePoints)
        }

        const validLogsPool = logsPool.filter((v) => v)
        setLogs([...logs, ...validLogsPool])
    }

    return (
        <div>
            <CustomizedSnackbar message={`${showWinner} is WON!`} type="success" isOpen={!!showWinner} />
            <Wrapper>
                <FighterBlock
                    fighter={fighter}
                    fighterLife={fighterLife}
                    setBlock={setBlock}
                    setHitTo={setHitTo}
                    hitTo={hitTo}
                    block={block}
                />
                <Box alignItems="center" justifyContent="center" display="flex" flexDirection="column">
                    <img width={100} height={100} src={fightIcon} />
                    <Button color="secondary" variant="contained" disabled={!hitTo || !block} onClick={onHit}>
                        HIT
                    </Button>
                </Box>
                {oppositeFighter && <FighterBlock fighter={oppositeFighter} fighterLife={oppositeFighter.life_points} isEnemy />}
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
