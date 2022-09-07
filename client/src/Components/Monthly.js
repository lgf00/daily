import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react'
import Day from './Day'
import '../App.css'

function Monthly(props) {
  const { offset, theme } = props
  const curMonth = new Date().getMonth()
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const [ days, setDays ] = useState([])

  const getMonth = () => {
    let mi = curMonth - offset
    if (mi < 0) {
      mi = [11, 10, 9, 8][Math.abs(mi) - 1]
    }
    return mi
  }

  const daysInMonth = [...Array(new Date(new Date().getFullYear(), getMonth(), 0).getDate() + 1).keys()].slice(1)
  console.log(daysInMonth)

  const testGetMonthsDays = () => {
    // do api call
    return [
      {date: "9/17/22", rating: 1},
      {date: "9/16/22", rating: 2},
      {date: "9/15/22", rating: 3},
      {date: "9/14/22", rating: 5},
      {date: "9/13/22", rating: 7},
      {date: "9/12/22", rating: 10},
      {date: "9/11/22", rating: 10},
      {date: "9/10/22", rating: 8},
      {date: "9/9/22", rating: 4},
      {date: "9/8/22", rating: 1},
      {date: "9/7/22", rating: 1},
      {date: "9/6/22", rating: 2},
      {date: "9/5/22", rating: 1},
      {date: "9/4/22", rating: 4},
      {date: "9/3/22", rating: 5},
      {date: "9/2/22", rating: 8},
      {date: "9/1/22", rating: 9},
    ]
  }

  useEffect(() => {
    setDays(testGetMonthsDays())
  }, [])

  const createDays = () => {
    return(daysInMonth.map((index) => {
      if (days.length > 0) {
        if (index <= days.length) {
          const d = days[index-1]
          return (
            <Day date={d.date} rating={d.rating} theme={theme} key={index - 1}/>
          )
        }
        return (
          <Day rating={0} theme={theme} key={index - 1}/>
        ) 
      }
      return (
        <Day rating={0} theme={theme} key={index - 1}/>
      )
    }))
  }

  return (
    <Grid item container 
      direction="column" 
      justifyContent="flex-start" 
      alignItems="center"
      xs={12}
      className="monthly"
    >
      <Grid item>
        <h2>{month[getMonth()]}</h2>
      </Grid>
      <Grid item container
       className="days"

      >
        {createDays()}
      </Grid>
    </Grid>
  )
}

export default Monthly