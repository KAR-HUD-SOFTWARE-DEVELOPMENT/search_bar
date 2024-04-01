import React, {useState, useEffect} from "react";

export const App = () => {

    const [value, setValue] = useState('')
    const [responseData, setResponseData] = useState([])

    useEffect( () => {
        const getData = async () => {
            const response = await fetch('http://localhost:8008/albums')
            const data = await response.json()
            const datafilter = data.filter((x) => {
                return (
                    value && x.title.includes(value)
                )   
            })
            setResponseData(datafilter)
        }
        getData()
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