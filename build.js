import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

import dotenv from 'dotenv'
import { GraphQLClient, gql } from 'graphql-request'

import { config } from './config.js'



/* ------------------- 
configuration générale 
----------------------*/ 
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
    on recupère le contenu des articles 
    et on l'ajoute à un objet 
----------------------*/ 

const getSinglePageContent = async (obj, tags) => {
    const query = gql`
            query getArticle($id: Int!){
            pages {
                single(id: $id) {
                    content
                }
            }
        }`

    const variables = {
        id: parseInt(obj.id)
    }
    const data = await graphQLClient.request(query, variables)
    const { pages } = data
    const { single } = pages

    const md = 
`---
id: ${obj.id}
title: ${obj.title.trim()}
date: ${obj.updatedAt}
tags: ${tags.join('')}
---

${single.content}

`

    if (!fs.existsSync(config.dev.articlesdir)) fs.mkdirSync(config.dev.articlesdir)
    fs.writeFile(
        `${config.dev.articlesdir}/${obj.id}.md`,
        md,
        (error) => {
          if (error) throw error;
          console.log(`article ${obj.id} was created successfully`);
        }
    )
}

/* ------------------- 
    on recupère toutes les pages du wiki
----------------------*/ 

const getListPages = async () => {
    const query = gql`
      {
        pages {
                list(orderBy:UPDATED) {
                    id
                    title
                    createdAt
                    updatedAt
                    path
                    tags
                }
            }
      }
    `
    const data = await graphQLClient.request(query) 

    const { pages } = data
    const { list } = pages
          
    list.forEach(element => {
        const { tags } = element
        if (Array.isArray(tags) && tags.length) {
            const data = getSinglePageContent(element, tags)
        } else {
            console.log('pas de tag')
        }
    })
}

const articles = getListPages()
