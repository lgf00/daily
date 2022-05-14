import React, { useEffect, useState } from 'react'

function Setup(props) {
    const { display_name } = props
    const [displayName, setdisplayName] = useState(display_name)

    return (
    <div>
        <form>
            <h1>Display Name</h1>
            <input type="text" value={displayName}></input>
        </form>
    </div>
    )
}

export default Setup