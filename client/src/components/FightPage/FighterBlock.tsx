import React from 'react'
import { Button, Card, CardMedia, LinearProgress, styled, Typography } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'

import { Fighter } from '../../contexts/FighterContext'
import { HIT_OPTIONS } from '../../constants/fightConstants'

type FighterBlockProps = {
    fighter: Fighter
    isEnemy?: boolean | null
    hitTo?: string | null
    block?: string | null
    fighterLife: number
    setHitTo?: (v: typeof HIT_OPTIONS[number]) => any
    setBlock?: (v: typeof HIT_OPTIONS[number]) => any
}

const FighterBlockWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'center',
    alignItems: 'center',
})
const ActionSection = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
})
const BorderLinearProgress = styled(LinearProgress)({
    height: 10,
    borderRadius: 5,
    marginTop: 10,
})

const FighterBlock = ({ fighter, fighterLife, setHitTo, setBlock, hitTo, block, isEnemy }: FighterBlockProps) => {
    const health = fighterLife > 100 ? 100 : fighterLife

    const getIcon = (currentItem: string, selectedValue: string | null | undefined) => {
        if (isEnemy) {
            return null
        }
        return currentItem === selectedValue ? <CheckCircle /> : null
    }
    const generalBlock = (
        <div>
            <Typography variant="h4" align="center">
                {fighter?.type}: {fighter?.name}
            </Typography>
            <BorderLinearProgress value={health} variant="determinate" color="error" />
            <Typography marginBottom={'10px'} textAlign={'center'}>
                Life points: {fighterLife}
            </Typography>
            <Card sx={{ maxWidth: 300 }}>
                <CardMedia component="img" image={fighter?.image} />
            </Card>
        </div>
    )
    const blockSection = (
        <ActionSection>
            <Typography variant="h4" align="center">
                Block
            </Typography>
            {HIT_OPTIONS.map((value) => (
                <Button
                    key={`block-${value}`}
                    color={isEnemy ? 'neutral' : 'info'}
                    variant="contained"
                    onClick={() => {
                        if (setBlock) {
                            setBlock(value)
                        }
                    }}
                    startIcon={getIcon(value, block)}
                >
                    {value}
                </Button>
            ))}
        </ActionSection>
    )
    const attackSection = (
        <ActionSection>
            <Typography variant="h4" align="center">
                Attack
            </Typography>
            {HIT_OPTIONS.map((value) => (
                <Button
                    key={`attack-${value}`}
                    color={isEnemy ? 'neutral' : 'error'}
                    variant="contained"
                    onClick={() => {
                        if (setHitTo) {
                            setHitTo(value)
                        }
                    }}
                    endIcon={getIcon(value, hitTo)}
                >
                    {value}
                </Button>
            ))}
        </ActionSection>
    )

    const blocksByOrder = isEnemy ? [attackSection, blockSection, generalBlock] : [generalBlock, blockSection, attackSection]
    return <FighterBlockWrapper>{blocksByOrder}</FighterBlockWrapper>
}

export default FighterBlock
