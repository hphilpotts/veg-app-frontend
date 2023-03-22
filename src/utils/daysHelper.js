const currentWeekCommencing = new Date().toLocaleDateString()

const todayAsDayNumber = new Date().getDay()

const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

module.exports = {currentWeekCommencing, todayAsDayNumber, daysOfTheWeek}