/* eslint-disable no-console */
export const profilerOnRenderCallback = (
  id,
  phase,
  actualTime,
  baseTime,
  startTime,
  commitTime
) => {
  console.group(`${id}: ${phase}`)
  console.table({
    actualTime,
    baseTime,
    startTime,
    commitTime,
  })
  console.groupEnd()
}
