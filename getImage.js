import fs from 'fs'
// import path from 'path'
import axios from 'axios'

import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

//https://wiki.reflux.media/ressources/capture_d'écran_deepin_zone_de_sélection__20221206104727.png

async function downloadImage(url) {
    // const url = "https://wiki.reflux.media/ressources/capture_d'écran_deepin_zone_de_sélection__20221206104727.png"
    const filepath = resolve(__dirname, 'dist/assets/images', 'code.jpg')
    const writer = fs.createWriteStream(filepath)

    axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGkiOjQsImdycCI6MSwiaWF0IjoxNjY4NTk0NDE1LCJleHAiOjE3MDAxNTIwMTUsImF1ZCI6InVybjp3aWtpLmpzIiwiaXNzIjoidXJuOndpa2kuanMifQ.p2rL60pOqY823fv4FnD1AMVQ8Hg8rkAQ8GryTPY1P5dZY0hej49xbqXFYjTdXiZf9AezyKT2c1lFl05WBf74ZrBiL7LTKOZUXKoCQVZWv1mFUa2YJKLVgCj0u1fqCCw6fPZEo2Bz80yazKqqvR0Z3wxK8Rxfg18vm4QOzjhxaQchc6plzk-7CIAdjLOx8tp95BG9AelNhuQbjV2GUkvRIrSWRLnn4UyKjUq7vLzUGKdExbWEMcoe-e8XZ4Pk2cQ-ymWduTnuQAcJzPGJT0WZASlJVdY4nAuuW77caU04IRUG-gUxb4jY7PdgHrhKv646VqR0Mi2ruhLjOwltu44njw`;
    
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}

downloadImage("https://wiki.reflux.media/ressources/capture_d'écran_deepin_zone_de_sélection__20221206104727.png", "./dist/assets/images/capture_d'écran_deepin_zone_de_sélection__20221206104727.png")

