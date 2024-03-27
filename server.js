const http = require("http") 
const fs = require("fs/promises")

const getFiles = async ()=>{
    const indexHtml = await fs.readFile("./index.html")
    const indexJs = await fs.readFile("./dist/r.bundle.js")
    return [indexHtml,indexJs]
}


http.createServer(async ({ url }, res) => {
    const [indexHtml, indexJs] = await getFiles()
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
        case '/albums':
            const response = await fetch("https://jsonplaceholder.typicode.com/albums")
            const json = await response.arrayBuffer()
            res.writeHead(200, {"Content-Type": "application/json"})
            res.write(Buffer.from(json));
            res.end();      
            break
        default:
            res.writeHead(404)
            res.write('Page not found');
            res.end();      
    }
}).listen(8008)