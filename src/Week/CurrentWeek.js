import React from 'react'

import { v4 as uuidv4} from 'uuid'

import {getFriendlyWeekCommencing, todayAsDayNumber, daysOfTheWeek} from '../utils/daysHelper'

export default function CurrentWeek(props) {

  const currentWeek = props.currentWeek
  
  console.log(currentWeek);

  // if (currentWeek)

  const weekCommencing = getFriendlyWeekCommencing(currentWeek.data.weekCommencing)
  const today = todayAsDayNumber

  const dayDataReversed = []

  daysOfTheWeek.forEach((day, index) => {
    dayDataReversed.unshift(
      {
        day: day,
        data: currentWeek.data[index]
      }
    )
  })

  return (
    <>
      <div>
        <h1>Current Week</h1>
        <h2>w/c {weekCommencing}</h2>

        {dayDataReversed.map((day, index) => (
          (index >= today) ?
              <div key={uuidv4()}>
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
