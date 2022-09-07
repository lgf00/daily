import { Grid } from '@mui/material'
import Daily from './Daily'
import Monthly from './Monthly'
import Time from './Time'

function Home(props) {
    const { user } = props
    const dt = new Date().toLocaleString()

    return (
        <div className="content">
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
                        <Time/>
                    </Grid>
                </Grid>
                <Grid item container 
                 direction="row-reverse" 
                 justifyContent="center" 
                >
                    <Monthly offset={0} theme={user.rating_theme}/>
                    <Monthly offset={1} theme={user.rating_theme}/>
                    <Monthly offset={2} theme={user.rating_theme}/>
                    <Monthly offset={3} theme={user.rating_theme}/>
                    <Monthly offset={4} theme={user.rating_theme}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home