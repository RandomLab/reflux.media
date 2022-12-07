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

const data = {
    list_pages: []
}

const page = {
    content: ''
}

const retourneUnArticle = (id) => {
    const obj = data.list_pages.find((article) => {
        console.log(id, article)
        return article.id === id
    })

    console.log(id, obj)
    // const page_content = JSON.stringify({
    //     query: `{
    //         pages {
    //             single(id:${id}) {
    //                 content
    //             }
    //         }
    //     }`
    // })

    // const options = {
    //     hostname: 'wiki.reflux.media',
    //     path: '/graphql',
    //     port: 443,
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Content-Length': page_content.length,
    //         'Authorization':process.env.API_KEY,
    //         'User-Agent': 'Node',
    //     },
    // }

    // const req = https.request(options, (res) => {

    //     let raw_data = ''

    //     console.log(`statusCode: ${res.statusCode}`)

    //     res.on('data', (data) => {
    //         raw_data = data
    //     })

    //     res.on('end', () => {
    //         const renderData = JSON.parse(raw_data)
    //             page["content"] = renderData.data.pages.single.content
            
    //     })

    // })

    // req.on('error', (error) => {
    //     console.error(error)
    // })

    // req.write(page_content)
    // req.end()
}


const retourneLeContenu = (page) => {

    const page_content = JSON.stringify({
        query: `{
            pages {
                single(id:${page.id}) {
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
            const pages = renderData.data.pages
            data.pages = pages
            page['content'] = pages.single.content
            data.list_pages.push(page)
        })

    })

    req.on('error', (error) => {
        console.error(error)
    })

    req.write(page_content)
    req.end()

}

const retourneToutesLesPages = () => {
    return new Promise((resolve, reject) => {
        const data_list = JSON.stringify({
            query: `{
                pages {
                    list(orderBy:UPDATED) {
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
                    retourneLeContenu(element)
                });
            })
    
        })
    
        req.on('error', (error) => {
            console.error(error)
        })
    
        req.write(data_list)
        req.end()
    })
   
}

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

app.get('/', cors(corsOptions), async (req, res, next) => {
    try {
        const result = await retourneToutesLesPages()
        return res.render('index.html', result)
    } catch(err) {
        next(err)
    }
})

app.get('/article/:article_id', cors(corsOptions), (req, res, next) => {
    // console.log(data.pages.list)
    retourneUnArticle(req.params.article_id)
    next()
}, (req, res, next) => {
    res.render('article.html', page)
})


app.listen(process.env.PORT || 9000, () => {
   console.log('le serveur écoute sur le port 9000')
})
