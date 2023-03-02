import { createServer } from 'http'
import { readLog, writeLog, exists, getVideo } from './fileOperations.js'
import os from 'os'
import fs from 'fs'
let root = os.homedir();

const server = createServer((req, res) => {
    if (req.method !== 'GET') {
        writeLog(req.url + ' ' + req.method)
        res.writeHead(405, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ message: 'invalid method' }))
    }

    if (req.url === '/') {
        writeLog(req.url + ' ' + req.method)

        res.writeHead(200, { 'Content-type': 'text/html' })
        fs.readFile('index.html', (err, data) => {
            res.write(data)
            return res.end()
        })
        // return res.end("index.html")
    }


    else if (req.url === '/api/getLogs') {
        res.writeHead(200, { 'Content-Type': 'text/*' })
        writeLog(req.url + ' ' + req.method)


        return res.end(readLog())
    }
    else if (req.url == '/api/video') {


        const range = req.headers.range;
        if (!range) {
            res.status(400).send("Requires Range header");
        }
        writeLog(req.url + ' ' + req.method + range)

        const videoPath = "bigbuck.mp4";
        const videoSize = fs.statSync("bigbuck.mp4").size;
        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        res.writeHead(206, headers);

        return getVideo(videoPath, start, end).pipe(res);



    }
    else if (exists(root + req.url)) {
        let filePath = root + req.url;
        let stats = fs.statSync(filePath)
        res.writeHead(200, {
            'Content-Type': 'text/*',
            'Content-Length': stats.size
        })

        let readStream = fs.createReadStream(root + req.url)
        // readStream.pipe(res)
        // let writeStream = fs.createWriteStream('./text2.txt', {})
        // readStream.pipe(writeStream)
        var completed = 0



        readStream.on('data', (chunk) => {
            // console.log(chunk);
            // console.log(chunk.length)
            console.log(`${completed} / ${stats.size}`)
            completed += chunk.length
            res.write(`<br/> <b>${completed} / ${stats.size}</b><br/> `)

            res.write(chunk.toString())
            readStream.pause()

            setTimeout(() => { readStream.resume(); }, 1000)
            // res.write(chunk.length.toString())
        }).on('end', () => readStream.close())

    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ message: 'Invalid url' }))
    }
})


const PORT = 3000

server.listen(PORT, () => {
    writeLog(`server started at ${PORT}`)
})


// const root = os.homedir()

// app.get('/', (req, res) => {
//     res.send('hello')
// })
// app.get('*', (req, res) => {
//     let stats = fs.statSync(root + req.originalUrl)
//     console.log(stats.size);
//     res.writeHead(200, {
//         'Content-Type': 'text/*',
//         'Content-Length': stats.size
//     })

//     let readStream = fs.createReadStream(root + req.originalUrl)
//     // readStream.pipe(res)
//     // // let writeStream = fs.createWriteStream('./text2.txt', {})
//     // // readStream.pipe(writeStream)
//     readStream.on('data', (chunk) => {
//         console.log(chunk);
//         console.log(chunk.length)
//         res.write(chunk.toString())
//         res.write(chunk.length.toString())
//     })


//     // console.log(data)
//     return res.status(200)
// })
// app.listen(3000, () => {
//     console.log("listening to 3000");
// })


// const PORT = process.env.PORT || 5000
// server.listen(PORT, () => {
//     writeLog("server started at port " + PORT);
//     console.log('server listening to ' + PORT)
// })