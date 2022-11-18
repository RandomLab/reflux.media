import path from 'path'
import { fileURLToPath } from 'url'

import dotenv from 'dotenv'
import { GraphQLClient, gql } from 'graphql-request'
import express from 'express'
import mustache from 'mustache-express'

/* ------------------- 
configuration générale 

----------------------*/ 
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* ------------------- 
configuration express + mustache

----------------------*/ 
const app = express()
app.use(express.static('public'))
app.engine('html', mustache())
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

/* ------------------- 
configuration graphql

----------------------*/ 
const endpoint = 'https://wiki.reflux.media/graphql'
  
const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
        authorization: process.env.API_KEY,
    },
    method: 'GET',
    jsonSerializer: {
      parse: JSON.parse,
      stringify: JSON.stringify,
    },
})

/* ------------------- 
routes et requêtes
----------------------*/

/* home */

app.get('/', async (req, res) => {

    const query = gql`
      {
        pages {
                list(orderBy:UPDATED) {
                    id
                    title
                    createdAt
                    updatedAt
                    path
                }
            }
      }
    `

    const data = await graphQLClient.request(query) 
    console.log(JSON.stringify(data.pages, undefined, 2))
    res.render('index.html', data.pages)
})


/* article */

app.get('/article/:article_id', async (req, res, next) => {

    const query = gql`
        query getArticle($id: Int!){
        pages {
            single(id: $id) {
                content
            }
        }
        }
    `
    const variables = {
        id: parseInt(req.params.article_id)
    }

  const data = await graphQLClient.request(query, variables)
  console.log(JSON.stringify(data, undefined, 2))
  res.render('article.html', data.pages.single)
})

/* ------------------- 
serveur
----------------------*/
app.listen(process.env.PORT || 9000, () => {
    console.log('le serveur écoute sur le port 9000')
 })
 