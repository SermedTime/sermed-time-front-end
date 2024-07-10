export function isEmailValid(value: string): boolean {
  const pattern = /^\w+([.-]\w+)*@\w+([.-]\w+)*\.\w{2,3}$/

  return pattern.test(value)
}

export function isMissed(firstEntry: string, overtime: string) {
  return !firstEntry && overtime && overtime.includes('-')
}
