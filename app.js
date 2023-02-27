import { createServer } from 'http'
import { readLog, writeLog } from './fileOperations.js'
const server = createServer((req, res) => {
    writeLog(req.url + ' ' + req.method)
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ message: 'invalid method' }))
    }

    if (req.url === '/') {
        res.writeHead(200, { 'Content-type': 'text/*' })
        return res.end("HELLO WORLD")
    }


    else if (req.url === '/api/getLogs') {
        res.writeHead(200, { 'Content-Type': 'text/*' })
        return res.end(readLog())
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ message: 'Invalid url' }))
    }
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    writeLog("server started at port " + PORT);
    console.log('server listening to ' + PORT)
})