import React from 'react'

function Weeks(props) {
    const { curWeekIndex, weekIndex, week, firstLoad } = props;
    return (
        <div className={
            firstLoad ?
                "week weekanimate" :
                "week"
        } 
        style={
            {
                opacity: `${100 - (weekIndex-curWeekIndex)*12.5}%`,
                "--order": weekIndex-curWeekIndex
            }
        }>
            {week}
        </div>
    )
}

export default Weeks