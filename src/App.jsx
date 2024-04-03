import React, {useState, useEffect} from "react";

export const App = () => {

    const [value, setValue] = useState('')
    const [responseData, setResponseData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8008/value=${value}`)
        .then(response => response.json())
        .then(data => setResponseData(data))
    }, [value])

    return (
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)}></input>
            <div>{responseData.map((result) => {
                return <div>{result.title}</div>
            })}</div>
        </div>
    )
}