import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState } from 'react'
import axios from 'axios'

function Settings(props) {
    const { user, handleSignOut } = props
    const defaultSettings = {
        user_id: user.user_id,
        display_name: user.display_name,
        email: user.email,
        scale_name: user.scale_name,
        max_points: user.max_points,
        rating_theme: user.rating_theme,
    };
    const [settings, updateSettings] = useState(defaultSettings)
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDisabled(false)
        updateSettings({
            ...settings,
            [name]: value,
        });
    }

    const handleSave = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.post('http://localhost:5000/api/user', settings)
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                setLoading(false)
                setDisabled(true)
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSave}>
                <FormControl required
                    fullWidth 
                    variant="outlined"
                >
                    <h1>User Settings</h1>
                    <h2>Display Name</h2>
                    <TextField  
                        name="display_name"
                        id="outlined-basic" 
                        defaultValue={settings.display_name}
                        onChange={handleChange}
                    />
                    <h2>Email</h2>
                    <TextField 
                        name="email"
                        id="outlined-basic"  
                        defaultValue={settings.email}
                        onChange={handleChange}
                    />
                    <h1>Scale Settings</h1>
                    <h2>Name of Scale</h2>
                    <TextField 
                        name="scale_name"
                        id="outlined-basic" 
                        defaultValue={settings.scale_name}
                        onChange={handleChange}
                    />
                    <h2>Point Count</h2>
                    <TextField  
                        name="max_points"
                        id="outlined-basic" 
                        defaultValue={settings.max_points}
                        onChange={handleChange}
                    />
                    <h2>Rating Theme</h2>
                    <Select 
                        name="rating_theme"
                        id="outlined-basic" 
                        defaultValue={settings.rating_theme}
                        onChange={handleChange}
                    >
                        <MenuItem key="default" value="default">Default</MenuItem>
                        <MenuItem key="theme2" value="theme2">Theme2</MenuItem>
                        <MenuItem key="them3" value="theme3>">Theme3</MenuItem>
                    </Select>
                </FormControl>
                <LoadingButton loading={loading} disabled={disabled} variant="contained" type="submit">
                    Save Settings
                </LoadingButton>
                <Button variant="outlined" type="button" onClick={handleSignOut}>
                    Sign Out
                </Button>
            </form>
        </div>
    )
}

export default Settings