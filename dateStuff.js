const diffBetweenDatesInDays = (date1, date2) =>
  new Date(date2 - date1).getDate() - 1



/**
 * Get time Ago
 **/
const timeAgo = date => {
  const diffInMs = new Date() - date
  let diff, unit
  if (diffInMs < 60000) { // less than 1 minute
    diff = Math.floor(diffInMs / 1000)
    unit = "second"
  } 
  if (diffInMs < 3600000) { // less than 1 hour
    diff = Math.floor(diffInMs / 60000)
    unit = "minute"
  } 
  if (diffInMs < 86400000) { // more than 1 hour
    diff = Math.floor(diffInMs / 3600000)
    unit = "hour"
  }
  unit += diff === 1 ? ' ago' : 's ago'
  return !diff ? ''+date : `${diff} ${unit}`
}
const d = new Date("2023-04-17T10:00:00Z")
console.log(timeAgo(d))
