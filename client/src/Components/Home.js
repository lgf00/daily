import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Daily from './Daily'
import Monthly from './Monthly'

function Home(props) {
    const { user } = props
    const[ dt, setDt ] = useState(new Date().toLocaleString())
    
    useEffect(() => {
        console.log(dt)
        let dateInterval = setInterval(() => {
            setDt(new Date().toLocaleString())
        }, 1000)
        
        return () => clearInterval(dateInterval)
    }, []);

    return (
        <div classNmae="content">
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item>
                    <h1>Good Evening, {user.display_name}</h1>
                </Grid>
                <Grid item container justifyContent="center" alignItems="center" spacing={3}>
                    <Grid item>
                        <h1>{dt.split(",")[0]}</h1>
                    </Grid>
                    <Grid item>
                        <Daily/>
                    </Grid>
                    <Grid item>
                        <h1>{dt.split(",")[1]}</h1>
                    </Grid>
                </Grid>
                <Grid item container justifyContent="center" alignItems="center" spacing={3}>
                    <Grid item>
                        <Monthly/>
                    </Grid>
                    <Grid item>
                        <Monthly/>
                    </Grid>
                    <Grid item>
                        <Monthly/>
                    </Grid>
                    <Grid item>
                        <Monthly/>
                    </Grid>
                    <Grid item>
                        <Monthly/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home