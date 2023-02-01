import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const directoryPath = path.join(__dirname, 'src/articles')

  
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.error(err)
    }

    files.forEach((file) => {
        try {
            fs.unlinkSync(__dirname + '/src/articles/' + file)
        } catch (error) {
            console.log(error)
        }
    })
})

try {
    fs.unlinkSync('dist/index.html')
    console.log("Delete File successfully.")
} catch (error) {
    console.log(error)
}