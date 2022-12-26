import defender from '../../public/images/characters/defender.png'
import archer from '../../public/images/characters/archer.png'
import warrior from '../../public/images/characters/warrior.png'
import mage from '../../public/images/characters/mage.png'
import assasin from '../../public/images/characters/assasin.png'

export const characters = [
    {
        type: 'Defender',
        image: defender,
        description:
            'Defender has a good armor and health. Can stay alive in hard battles',
    },
    {
        type: 'Archer',
        image: archer,
        description:
            'An archer is a person who practices archery, using a bow to shoot arrows.',
    },
    {
        type: 'Warrior',
        image: warrior,
        description:
            'A warrior is a person specializing in combat or warfare, especially within the context ' +
            'of a tribal or clan-based warrior culture society that recognizes a separate warrior ' +
            'aristocracy, class, or caste.',
    },
    {
        type: 'Mage',
        image: mage,
        description:
            'Mage uses and practices magic derived from supernatural sources to defeat enemies',
    },
    {
        type: 'Assassin',
        image: assasin,
        description: 'Exclusive murder. Has a deadly hits',
    },
]
