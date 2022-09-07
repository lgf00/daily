import React from 'react'
import { Grid } from '@mui/material'

function Day(props) {
    const { date, rating, theme } = props
    const def = ["#ffffff", "#FF0000", "#FF3300", "#ff6600", "#ff9900", "#FFCC00", "#FFFF00", "#ccff00", "#99ff00", "#66ff00", "#33ff00", "#00FF00"]

    return (
        <Grid item 
         className="day"
         style={{backgroundColor: def[rating]}}
         title={date + ", " + rating}
        >
        </Grid>
    )
}

export default Day