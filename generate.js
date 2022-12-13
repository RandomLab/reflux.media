import fs from 'fs'

import axios from 'axios'

import { marked } from 'marked'
import fm from 'front-matter'
import { format } from 'date-fns'

import { config } from './config.js'

import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))


/* -------------------
configuration markdown
----------------------*/

marked.setOptions({
    renderer: new marked.Renderer(),
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
})

/* -------------------
articles vers html
----------------------*/

let articles = []

const articlesHtml = (data) => {
    
    return (`<div class="articles">
                <div class ="croix">x</div>
                <div class="titres-${ data.attributes.tags }" id="Titre-${ data.attributes.id }">${ data.attributes.title }</div>
                <div class="dates">${ format(data.attributes.date, 'MM/dd/yyyy')  }</div>
                <div class="textes" id="Texte-${ data.attributes.id }">${ marked(data.body) }</div>
            </div>`)
}

/* -------------------
index
----------------------*/

const indexHtml = (articles) => {
    return `<!DOCTYPE html>
    <html lang="fr">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="" />
            <title>Reflux.media</title>
            <link rel="stylesheet" href="assets/style.css">
            <script src="assets/main.js"></script>
        </head>
        <body>
        <div id="menu">
            <div id="sommaire">Sommaire</div>
            <div class="dossier" id="politique">
                <div class="titreRubrique">politique</div>
            </div>
            <div class="dossier" id="culture">
                <div class="titreRubrique">culture</div>
            </div>
            <div class="dossier" id="ressources">
                <div class="titreRubrique">ressources</div>
            </div>
            <div class="dossier" id="exebition">
                <div class="titreRubrique">exebition</div>
            </div>
            <div class="dossier" id="varia">
                <div class="titreRubrique">varia</div>
            </div>
            <div class="dossier" id="tools">
                <div class="titreRubrique">tools</div>
            </div>
        </div>
         ${articles.join('')}
        </body>
    </html>
    `
}

/* on télécharge toutes les images */

async function downloadImage(url, name) {
    const filepath = resolve(__dirname, 'dist/assets/images', name)
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

const parseURL = (link) => {
    const re = /\(([^)]+)\)/
    const result = re.exec(link)
    const url = result[1]
    const name = url.split('/').pop(-1)
    
    console.log(url)

    // downloadImage(url, name)
}

const getImages = (content) => {
    const re = /!\[[^\]]*\]\((.*?)\s*()?\s*\)/g
    const result = content.match(re)
    return result
}

/* -------------------
on lit les .md et on fait l'html
----------------------*/

const createPost = postPath => {
    const data = fs.readFileSync(`${config.dev.articlesdir}/${postPath}`, "utf8")
    const content = fm(data)
    const images = getImages(content.body)
    const article = articlesHtml(content)
    
    if (images !== null) {
        images.forEach(element => {
            parseURL(element) 
        })
    }

    /* -------------------
    on enregistre les articles
    ----------------------*/

    // if (!fs.existsSync(config.dev.pagesdir)) fs.mkdirSync(config.dev.pagesdir)
    // fs.writeFile(
    //     `${config.dev.pagesdir}/${content.attributes.id}.html`,
    //     article,
    //     (error) => {
    //       if (error) throw error;
    //       console.log(`index was created successfully`);
    //     }
    // )

    return article
}

const posts = fs
  .readdirSync(config.dev.articlesdir)
  .map((post) => {
    const article = createPost(post)
    articles.push(article)
})

/* -------------------
on enregistre le fichier index
----------------------*/

const index = indexHtml(articles)

if (!fs.existsSync(config.dev.distdir)) fs.mkdirSync(config.dev.distdir)
fs.writeFile(
    `${config.dev.distdir}/index.html`,
    index,
    (error) => {
      if (error) throw error;
      console.log(`index was created successfully`);
    }
)
