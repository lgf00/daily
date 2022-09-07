import React, { useEffect, useState } from 'react'

function Time() {
    const [ dt, setDt ] = useState(new Date().toLocaleString())

    useEffect(() => {
        let dateInterval = setInterval(() => {
            setDt(new Date().toLocaleString())
        }, 1000)
        
        return () => clearInterval(dateInterval)
    }, []);
    
    return (
        <h1>{dt.split(",")[1]}</h1>
    )
}

export default Time