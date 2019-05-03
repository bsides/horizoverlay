function getRandom(min, max) {
  const first = Math.ceil(min)
  const last = Math.floor(max)
  return Math.floor(Math.random() * (last - first + 1)) + first
}

function replaceWithRandom(someData) {
  let newData = {}
  for (let d in someData) {
    newData[d] = getRandom(someData[d], someData[d] + 500)
  }
  return newData
}

export { getRandom, replaceWithRandom }
