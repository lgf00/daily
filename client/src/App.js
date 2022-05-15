import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Home from './Components/Home'
import LoggedOut from './Components/LoggedOut'
import Setup from './Components/Setup'

function App() {
  const [user, setUser] = useState(
    localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user'))
    : null
  )

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: true,
    });
  }, [])

  useEffect(() => {
    console.log(user)
    if (!user) {
      window.google.accounts.id.prompt();
    }
  }, [user])
  
  const handleSignOut = () => {
    console.log("sign-out")
    setUser(null)
    window.google.accounts.id.disableAutoSelect();
    localStorage.clear();
  }

  const handleCredentialResponse = async(response) => {
    axios.post('http://localhost:5000/api/login', response)
    .then((res) => {
      if (res.status === 201) {
        setUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
      }
    })
    .catch((err) => {
        console.log("ERR", err)
    })
  }

  return (
    <div>
      {user
        ? user.init  
          ? <Setup user={user} handleSignOut={handleSignOut}/>
          : <Home user={user} handleSignOut={handleSignOut}/>
        : <LoggedOut/>
      }
    </div>
  )
}

export default App