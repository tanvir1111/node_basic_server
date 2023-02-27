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
