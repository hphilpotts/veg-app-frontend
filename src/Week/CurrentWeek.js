import React from 'react'

export default function CurrentWeek(props) {

  const currentWeek = props.currentWeek

  const weekCommencing = new Date(currentWeek.data.weekCommencing).toLocaleDateString()
  const today = new Date().getDay()
  const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const dayDataReversed = []
  daysOfTheWeek.forEach((day, index) => {
    dayDataReversed.unshift(
      {
        day: day,
        data: currentWeek.data[index]
      }
    )
  })

  // TODO - abstract out weekCommencing, today, daysOfTheWeek to a helper function

  // TODO - implement uuid keys for mapped dayDataReversed components instead of current ...getTime() method

  return (
    <>
      <div>
        <h1>Current Week</h1>
        <h2>w/c {weekCommencing}</h2>

        {dayDataReversed.map((day, index) => (
          (index >= today) ?
              <div key={index + new Date().getTime()}>
                {(index === today) ?
                  <h4>Today</h4>
                  :
                  <h4>{day.day}</h4>
                }
                <p>{day.data}</p>
              </div>
            :
            null
        ))}
      </div>
    </>
  )
}
