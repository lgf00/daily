import React, { useEffect, useState } from 'react'

function Time(props) {
    const { curDate } = props
    
    const [ dt, setDt ] = useState(new Date().toLocaleString())
    const [ same, setSame ] = useState(
        new Date().toLocaleString().split(',')[0] === curDate.toLocaleString().split(',')[0]
    );

    useEffect(() => {
        setSame(new Date().toLocaleString().split(',')[0] === curDate.toLocaleString().split(',')[0])
        let dateInterval = setInterval(() => {
            setDt(new Date().toLocaleString())
        }, 1000)
        return () => clearInterval(dateInterval)
    }, [curDate, same]);
    
    return (
        <p className={same ? 'time' : 'time pause'}>{dt.split(",")[1]}</p>
    )
}

export default Time