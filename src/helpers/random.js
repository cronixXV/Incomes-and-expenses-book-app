export function getRandomInt(min, max) {
  if (min < 0) {
    throw new Error(
      'Передано значение параметра min меньше 0 в функцию getRandomInt(min, max)'
    )
  }
  min = Math.ceil(min)
  max = Math.floor(max)

  // debugger
  return Math.floor(Math.random() * (max - min + 1)) + min
}
