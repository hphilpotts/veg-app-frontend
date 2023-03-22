const getFriendlyWeekCommencing = weekCommencing => new Date(weekCommencing).toLocaleDateString()

const todayAsDayNumber = new Date().getDay()

const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

module.exports = {getFriendlyWeekCommencing, todayAsDayNumber, daysOfTheWeek}