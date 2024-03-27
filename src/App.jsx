import React, {useState, useEffect} from "react";

export const App = () => {

    const [value, setValue] = useState('')
    const [responseData, setResponseData] = useState('')

    useEffect(async () => {
        const response = await fetch('http://localhost:8008/albums')
        const data = await response.json()
        setResponseData(data)
    })

    return (
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)}></input>
            <div>{responseData}</div>
        </div>
    )
}