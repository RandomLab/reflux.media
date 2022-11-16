const https = require('https')

const express = require('express')
const cors = require('cors')
const mustache = require('mustache-express')

require('dotenv').config()

const app = express()

app.use(express.static('public'))

app.engine('html', mustache())
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

const data = { pages: {} }

const retourneLeContenu = (id) => {

    const page_content = JSON.stringify({
        query: `{
            pages {
                single(id:${id}) {
                    content
                }
            }
        }`
    })

    const options = {
        hostname: 'wiki.reflux.media',
        path: '/graphql',
        port: 443,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': page_content.length,
            'Authorization':process.env.API_KEY,
            'User-Agent': 'Node',
        },
    }

    const req = https.request(options, (res) => {

        let raw_data = ''

        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', (data) => {
            raw_data = data
        })

        res.on('end', () => {
            const renderData = JSON.parse(raw_data)
            data.pages = renderData.data.pages
            console.log(data.pages.single.content)
            
        })

    })

    req.on('error', (error) => {
        console.error(error)
    })

    req.write(page_content)
    req.end()

}

const retourneToutesLesPages = () => {

    const data_list = JSON.stringify({
        query: `{
            pages {
                list(orderBy:ID) {
                    id
                    title
                    createdAt
                    updatedAt
                    path
                    
                }
            }
        }`
    })

    const options = {
        hostname: 'wiki.reflux.media',
        path: '/graphql',
        port: 443,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data_list.length,
            'Authorization':process.env.API_KEY,
            'User-Agent': 'Node',
        },
    }

    const req = https.request(options, (res) => {

        let raw_data = ''

        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', (data) => {
            raw_data = data
        })

        res.on('end', () => {
            const renderData = JSON.parse(raw_data)
            data.pages = renderData.data.pages
            data.pages.list.forEach(element => {
                retourneLeContenu(element.id)
            });
        })

    })

    req.on('error', (error) => {
        console.error(error)
    })

    req.write(data_list)
    req.end()
}

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

app.get('/', cors(corsOptions), (req, res, next) => {
    // console.log(data.pages.list)
    // console.log(data)
    res.render('index.html', data)
})


app.listen(process.env.PORT || 9000, () => {
   console.log('le serveur écoute sur le port 9000')
   retourneToutesLesPages()
})
