import './App.css';
import React, { useState, useEffect } from 'react';
import Time from './components/Time';
import Daily from './components/Daily';
import Weeks from './components/Weeks';

const testWeeks = new Map([
  ["9/10/2022", {rating: 0, weekIndex: 2}],
  ["9/9/2022", {rating: 0, weekIndex: 2}],
  ["9/8/2022", {rating: 10, weekIndex: 2}],
  ["9/7/2022", {rating: 1, weekIndex: 2}],
  ["9/6/2022", {rating: 6, weekIndex: 2}],
  ["9/5/2022", {rating: 4, weekIndex: 2}],
  ["9/4/2022", {rating: 8, weekIndex: 2}],
  ["9/3/2022", {rating: 6, weekIndex: 1}],
  ["9/2/2022", {rating: 2, weekIndex: 1}],
  ["9/1/2022", {rating: 4, weekIndex: 1}],
  ["8/31/2022", {rating: 1, weekIndex: 1}],
  ["8/30/2022", {rating: 9, weekIndex: 1}],
  ["8/29/2022", {rating: 10, weekIndex: 1}],
  ["8/28/2022", {rating: 8, weekIndex: 1}],
  ["8/27/2022", {rating: 6, weekIndex: 0}],
  ["8/26/2022", {rating: 7, weekIndex: 0}],
  ["8/25/2022", {rating: 4, weekIndex: 0}],
  ["8/24/2022", {rating: 3, weekIndex: 0}],
  ["8/23/2022", {rating: 2, weekIndex: 0}],
  ["8/22/2022", {rating: 4, weekIndex: 0}],
  ["8/21/2022", {rating: 1, weekIndex: 0}],  
])

function App() {
  const [curDate, updateCurDate] = useState(new Date());
  const [firstLoad, setFirstLoad] = useState(true);
  const [anim, setAnim] = useState(false);

  function adjDay(days) {
    let result = new Date(curDate);
    result.setDate(result.getDate() + days);
    let key = result.toLocaleString().split(",")[0]
    if (testWeeks.has(key) && testWeeks.get(key)["rating"] !== 0) {
      if (curDate.getDay() === 6 && days > 0) {
        setAnim(true);
      } else {
        setAnim(false);
      }
      updateCurDate(result);
    }
  }

  function adjMonth(months) {
    let result = null;
    if (months > 0) {
      result = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 1)
    } else {
      result = new Date(curDate.getFullYear(), curDate.getMonth(), 0)
    }
    if (testWeeks.has(result.toLocaleString().split(",")[0])) {
      setFirstLoad(true);
      updateCurDate(result);
    }
  }

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setFirstLoad(false);
      }, 5000);
    }
  }, [])
  

  useEffect(() => {
    console.log(curDate);
  }, [curDate])
  

  function TEST_loop(date) {
    let dt = new Date(date)
    let adjustBy = 6 - dt.getDay()
    dt.setDate(dt.getDate() + adjustBy) // gets Saturday, the end of the week
    let itr = 0
    let weeks = [];
    let week = [];
    let weekIndex = testWeeks.get(dt.toLocaleString().split(",")[0])["weekIndex"]
    let curWeekIndex = weekIndex
    while (itr < 56 && testWeeks.has(dt.toLocaleString().split(",")[0])) {
      if (itr !== 0 && itr % 7 === 0) {
        weeks.unshift(<Weeks curWeekIndex={curWeekIndex} weekIndex={weekIndex} week={week} firstLoad={firstLoad}/>)
        curWeekIndex = testWeeks.get(dt.toLocaleString().split(",")[0])["weekIndex"]
        week = []
      }
      let key = dt.toLocaleString().split(",")[0]
      let selected = false
      if (key === date.toLocaleString().split(",")[0]) {
        selected = true
      }
      let zeroth = false
      if (weekIndex-curWeekIndex === 0) {
        zeroth = true
      }
      week.unshift(<Daily date={key} rating={testWeeks.get(key)["rating"]} selected={selected} slorder={itr} scorder={dt.getDay()} firstLoad={firstLoad} zeroth={zeroth} anim={anim}/>)    
      dt.setDate(dt.getDate() - 1)
      itr++;
    }
    weeks.unshift(<Weeks curWeekIndex={curWeekIndex} weekIndex={weekIndex} week={week} firstLoad={firstLoad}/>)
    return weeks;
  }

  return (
    <>
      <div className="container">
        <div className="text-left">
          <div className="increment" onClick={() => {adjMonth(1)}}>
            <span>+</span>
          </div>
          <p>Good Evening</p>
          <h1>{curDate.toLocaleString('default', { month: 'long'})}</h1>
          <p>{curDate.getFullYear()}</p>
          <div className="increment" onClick={() => {adjMonth(-1)}}>
            <span>-</span>
          </div>
        </div>
        <div className="main">
          <div className="grid">
            {TEST_loop(curDate)}
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
          <div className="increment" onClick={() => {adjDay(1)}}>
            <span>+</span>
          </div>
          <p>Lucas</p>
          <h1>{curDate.toLocaleString('default', { weekday: 'long'})} {curDate.getDate()}</h1>
          <Time curDate={curDate}/>
          <div className="increment" onClick={() => {adjDay(-1)}}>
            <span>-</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
