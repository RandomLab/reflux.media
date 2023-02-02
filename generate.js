import fs from 'fs'

import axios from 'axios'

import { marked } from 'marked'
import fm from 'front-matter'
// import { format } from 'date-fns'

import { config } from './config.js'

import dotenv from 'dotenv'

import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'


const __dirname = dirname(fileURLToPath(import.meta.url))

dotenv.config()

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

  return (`<div class="articles ${ data.attributes.tags }">
  <div class="barre_fenetre">
  <div class="titres ${ data.attributes.tags }" id="Titre${ data.attributes.id }">${ data.attributes.title }</div>
  <div class="dates">${ format(data.attributes.date, 'dd/MM/yyyy')} <div class="titre_article">${ data.attributes.title }</div></div>
  <div class ="croix">x</div>
  <div class ="agrandir">⧉</div>
  </div>
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
  <script src="https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js"></script>
  <script src="assets/main.js"></script>
  </head>
  <body>
  <img src="" id="title_gifs">
  <div id="menu">
  <div id="rubriques">rubriques</div>
  <div class="dossier" id="politique">
  <div class="titres_rubriques">politique</div>
  </div>
  <div class="dossier" id="culture">
  <div class="titres_rubriques">culture</div>
  </div>
  <div class="dossier" id="ressources">
  <div class="titres_rubriques">ressources</div>
  </div>
  <div class="dossier" id="exebition">
  <div class="titres_rubriques">exposition</div>
  </div>
  <div class="dossier" id="varia">
  <div class="titres_rubriques">varia</div>
  </div>
  <div class="dossier" id="tools">
  <div class="titres_rubriques">tools</div>
  </div>
  </div>
  ${articles.join('')}
  </body>
  </html>
  `
}

/* on télécharge toutes les images */

async function downloadImage(url, name)  {

  const filepath = resolve(__dirname, 'dist/assets/images', name)

  axios.defaults.headers.common['Authorization'] = `${process.env.API_KEY}`;

  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })

    const w = response.data.pipe(fs.createWriteStream(filepath))
    w.on('finish', () => {
      console.log('Successfully downloaded file!')
    })
  } catch (err) {
    console.log(err)
  }

}


async function parseURL (link) {
  const re = /\(([^)]+)\)/
  const result = re.exec(link)
  const url = result[1]
  const name = url.split('/').pop(-1)

  if (url.charAt(0) === '/') {
    const finalUrl = 'https://wiki.reflux.media' + url
    console.log(name)
  }

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
