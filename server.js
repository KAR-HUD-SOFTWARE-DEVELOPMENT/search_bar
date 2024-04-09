const http = require("http") 
const fs = require("fs/promises")

const getFiles = async ()=>{
    const indexHtml = await fs.readFile("./index.html")
    const indexJs = await fs.readFile("./dist/r.bundle.js")
    return [indexHtml,indexJs]
}

http.createServer(async ({ url }, res) => {
    const [indexHtml, indexJs] = await getFiles()
    if (url.includes('albums?title')) {
        const inputValue = url.match(/=(\w+(?:%20\w+)*)/g)
        const response = await fetch("https://jsonplaceholder.typicode.com/albums")
        const json = await response.json()
        const filteredData = json.filter((albums) =>
        inputValue? albums.title.includes(inputValue[0].slice(1).replace(/%20/g, ' ')) : albums.title)
        const data = JSON.stringify(filteredData)
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