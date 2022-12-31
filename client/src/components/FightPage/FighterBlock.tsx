import React from 'react'
import {
    Button,
    Card,
    CardMedia,
    LinearProgress,
    styled,
    Typography,
} from '@mui/material'
import { Fighter } from '../../contexts/FighterContext'

type FighterBlockProps = {
    fighter: Fighter
    isEnemy?: boolean
    setHit?: (v: string) => void
    setBlock?: (v: string) => void
}

const HIT_OPTIONS = ['head', 'body', 'legs']

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

const FighterBlock = ({
    fighter,
    setHit,
    setBlock,
    isEnemy,
}: FighterBlockProps) => {
    const health = fighter?.life_points > 100 ? 100 : fighter?.life_points

    const generalBlock = (
        <div>
            <Typography variant="h4" align="center">
                {fighter?.type}: {fighter?.name}
            </Typography>
            <BorderLinearProgress
                value={health}
                variant="determinate"
                color="error"
            />
            <Typography marginBottom={'10px'} textAlign={'center'}>
                Life points: {fighter.life_points}
            </Typography>
            <Card sx={{ maxWidth: 300 }}>
                <CardMedia component="img" image={fighter?.image} />
            </Card>
            {/*{isEnemy ? null : (*/}
            {/*    <>*/}
            {/*        <Typography variant="h6">*/}
            {/*            Battles: {fighter.battles}*/}
            {/*        </Typography>*/}
            {/*        <Typography variant="h6">Wins: {fighter.wins}</Typography>*/}
            {/*        <Typography variant="h6">*/}
            {/*            Defeats: {fighter.defeats}*/}
            {/*        </Typography>*/}
            {/*    </>*/}
            {/*)}*/}
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
                    color={isEnemy ? "neutral" : "info"}
                    variant="contained"
                    onClick={() => setBlock(value)}
                    // disabled={isEnemy}
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
                    color={isEnemy ? "neutral" : "error"}
                    variant="contained"
                    onClick={() => setHit(value)}
                    // disabled={isEnemy}
                >
                    {value}
                </Button>
            ))}
        </ActionSection>
    )

    const blocksByOrder = isEnemy
        ? [attackSection, blockSection, generalBlock]
        : [generalBlock, blockSection, attackSection]
    return <FighterBlockWrapper>{blocksByOrder}</FighterBlockWrapper>
}

export default FighterBlock
