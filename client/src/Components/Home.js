import React from 'react'

function Home(props) {
    const { user, handleSignOut } = props

    return (
        <div>
            {user.id}
            {user.display_name}
            {user.email}
            <div  
            onClick={() => handleSignOut()}
            >
                Sign Out
            </div>
        </div>
    )
}

export default Home