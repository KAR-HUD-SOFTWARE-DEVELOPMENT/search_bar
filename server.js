const http = require("http") 
const fs = require("fs/promises")

const getFiles = async ()=>{
    const indexHtml = await fs.readFile("./index.html")
    const indexJs = await fs.readFile("./dist/r.bundle.js")
    return [indexHtml,indexJs]
}

http.createServer(async ({ url }, res) => {
    const [indexHtml, indexJs] = await getFiles()

    if (url.includes('value')) {
        const inputValue = url.match(/=(\w+(?:%20\w+)*)/g)
        if (inputValue === null) {
            return 
        }
        const value = inputValue[0].slice(1).replace(/%20/g, ' ')
        const response = await fetch("https://jsonplaceholder.typicode.com/albums")
        const json = await response.json()
        const filteredData = json.filter((album) => album.title.includes(value))
            return (
                inputValue && x.title.includes(value)
            )   
        })
        const data = JSON.stringify(datafilter)
        const buffer = Buffer.from(data)
        res.writeHead(200, {"Content-Type": "application/json"})
        res.write(buffer);
        res.end()
        return
    }

    switch(url) {
        case '/':
            res.writeHead(200, {"Content-Type": "text/html"})
            res.write(indexHtml)
            res.end()
            break
        case '/js':
            res.writeHead(200, {"Content-Type": "text/javascript"})
            res.write(indexJs);
            res.end();      
            break
        default:
            res.writeHead(404)
            res.write('Page not found');
            res.end();      
    }
}).listen(8008)