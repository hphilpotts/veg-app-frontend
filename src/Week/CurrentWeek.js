import React from 'react'

import {currentWeekCommencing, todayAsDayNumber, daysOfTheWeek} from '../utils/daysHelper'

export default function CurrentWeek(props) {

  const today = todayAsDayNumber

  const currentWeek = props.currentWeek
  
  const dayDataReversed = []
  daysOfTheWeek.forEach((day, index) => {
    dayDataReversed.unshift(
      {
        day: day,
        data: currentWeek.data[index]
      }
    )
  })

  // TODO - implement uuid keys for mapped dayDataReversed components instead of current ...getTime() method

  return (
    <>
      <div>
        <h1>Current Week</h1>
        <h2>w/c {currentWeekCommencing}</h2>

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
