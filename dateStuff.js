const diffBetweenDatesInDays = (date1, date2) =>
  new Date(date2 - date1).getDate() - 1



/**
 * Get time Ago
 **/
// Get the current date and time
const now = new Date()
// Set the date to compare against
const dateToCompare = new Date("2022-03-01T10:00:00Z")
// Get the difference in milliseconds between the two dates
const diffInMs = now - dateToCompare;
// Convert the difference to seconds, minutes, or hours
let diff, unit;
if (diffInMs < 60000) { // less than 1 minute
  diff = Math.floor(diffInMs / 1000)
  unit = "second"
} else if (diffInMs < 3600000) { // less than 1 hour
  diff = Math.floor(diffInMs / 60000)
  unit = "minute"
} else { // more than 1 hour
  diff = Math.floor(diffInMs / 3600000)
  unit = "hour"
}
// Add the "ago" suffix if necessary
if (diff === 1) {
  unit += " ago"
} else {
  unit += "s ago"
}
// Display the result
console.log(diff + " " + unit)
