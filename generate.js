import fs from 'fs'

import { marked } from 'marked'
import fm from 'front-matter'
import { format, compareAsc } from 'date-fns'

import { config } from './config.js'



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
                <div class="titres" id="Titre${ data.attributes.id }">${ data.attributes.title }</div>
                <div class="dates">${ format(data.attributes.date, 'MM/dd/yyyy')  }</div>
                <div class="textes" id="Texte${ data.id }">${ marked(data.body) }</div>
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
            <script src="assets/main.js"></script>s
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

/* -------------------
on lit les .md et on fait l'html
----------------------*/

const createPost = postPath => {
    const data = fs.readFileSync(`${config.dev.articlesdir}/${postPath}`, "utf8")
    const content = fm(data)
    const article = articlesHtml(content)

    /* -------------------
    on enregistre les articles
    ----------------------*/

    if (!fs.existsSync(config.dev.pagesdir)) fs.mkdirSync(config.dev.pagesdir)
    fs.writeFile(
        `${config.dev.pagesdir}/${content.attributes.id}.html`,
        article,
        (error) => {
          if (error) throw error;
          console.log(`index was created successfully`);
        }
    )

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
