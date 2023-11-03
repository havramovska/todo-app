export function genUniqueId(): number {
  const dateNum = Date.now()

  const randomNum = Math.floor(Math.random() * 100)

  return dateNum + randomNum;
}