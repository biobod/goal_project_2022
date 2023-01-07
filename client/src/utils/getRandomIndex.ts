const MAX_COUNT = 5;
const MIN_COUNT = 1
const getRandomIndex = (max = MAX_COUNT, min = MIN_COUNT) => Math.floor(Math.random() * (max - min + 1) + min) - 1 // -1 to get 0 index

export default getRandomIndex
