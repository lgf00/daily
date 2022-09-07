import './App.css';
import React, { useState, useEffect } from 'react';

const testGetWeekDays = () => {
  // do api call
  return [
    {date: "08/21/22", rating: 1, weekIndex: 0},
    {date: "08/22/22", rating: 1, weekIndex: 0},
    {date: "08/23/22", rating: 1, weekIndex: 0},
    {date: "08/24/22", rating: 1, weekIndex: 0},
    {date: "08/25/22", rating: 1, weekIndex: 0},
    {date: "08/26/22", rating: 1, weekIndex: 0},
    {date: "08/27/22", rating: 1, weekIndex: 0},
    {date: "08/28/22", rating: 1, weekIndex: 1},
    {date: "08/29/22", rating: 1, weekIndex: 1},
    {date: "08/30/22", rating: 1, weekIndex: 1},
    {date: "08/31/22", rating: 1, weekIndex: 1},
    {date: "09/01/22", rating: 1, weekIndex: 1},
    {date: "09/02/22", rating: 1, weekIndex: 1},
    {date: "09/03/22", rating: 1, weekIndex: 1},
    {date: "09/04/22", rating: 1, weekIndex: 2},
    {date: "09/05/22", rating: 1, weekIndex: 2},
    {date: "09/06/22", rating: 1, weekIndex: 2},
    {date: "09/07/22", rating: 1, weekIndex: 2},
    {date: "09/08/22", rating: 1, weekIndex: 2},
    {date: "09/09/22", rating: 1, weekIndex: 2},
    {date: "09/10/22", rating: 1, weekIndex: 2},
    // {date: "09/04/22", rating: 1, weekIndex: 3},
    // {date: "09/05/22", rating: 1, weekIndex: 3},
    // {date: "09/06/22", rating: 1, weekIndex: 3},
    // {date: "09/07/22", rating: 1, weekIndex: 3},
    // {date: "09/08/22", rating: 1, weekIndex: 3},
    // {date: "09/09/22", rating: 1, weekIndex: 3},
    // {date: "09/10/22", rating: 1, weekIndex: 3},
  ]
}

function App() {
  const [curWeek, updateCurWeek] = useState(testGetWeekDays().length / 7 - 1)

  function TEST_loop() {
    let ls = testGetWeekDays();
    const weeks = [];
    let week = [];
    let curWeekIndex = 2;
    ls.slice().reverse().forEach((day, index) => {
      if (curWeekIndex !== day.weekIndex) {
        weeks.unshift(<div className="week" style={{opacity: `${100 - (curWeek-curWeekIndex)*12.5}%`}} key={curWeekIndex}>{week}</div>)
        week = [];
        curWeekIndex = day.weekIndex;
      }
      week.unshift(<div className="day" title={day.date + " " + day.weekIndex}></div>)
    })
    weeks.unshift(<div className="week" style={{opacity: `${100 - (curWeek-curWeekIndex)*12.5}%`}} key={curWeekIndex}>{week}</div>)
    return weeks;
  }

  return (
    <>
      <div className="container">
        <div className="text-left">
          <p>Good Evening</p>
          <h1>September</h1>
          <p>2022</p>
        </div>
        <div className="main">
          <div className="grid">
            {TEST_loop()}
          </div>
          <div className="weekdays">
            <p>S</p>
            <p>M</p>
            <p>T</p>
            <p>W</p>
            <p>T</p>
            <p>F</p>
            <p>S</p>
          </div>
        </div>       
        <div className="text-right">
          <p>Lucas</p>
          <h1>Tuesday 06</h1>
          <p>6:34:20 PM</p>
        </div>
      </div>
    </>
  );
}

export default App;
