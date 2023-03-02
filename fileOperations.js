import fs from 'fs'

export const writeLog = (data) => {
    fs.appendFile('./log.txt', '\n' + data, (err) => {
        return err
    })
    return;
}

export const readLog = () => {
    return fs.readFileSync('./log.txt', 'utf8')

}

export const exists = (path) => {
    console.log(path);
    return fs.existsSync(path)

}

export const fileType = (path) => {
    return path.split('.').pop();

}

export const getVideo = (videoPath, start, end) => {



    const videoStream = fs.createReadStream(videoPath, { start, end });

    return videoStream;
}