const MAX_COUNT = 5;
const MIN_COUNT = 1
const getRandomIndex = () => Math.floor(Math.random() * (MAX_COUNT - MIN_COUNT + 1) + MIN_COUNT) - 1 // -1 to get 0 index

export default getRandomIndex
