
const markdownIt = require("markdown-it");
const markdownItAttrs = require('markdown-it-attrs');

module.exports = (config) => {

    let options = {
        html: true,
        breaks: true,
        linkify: true
    };

    let markdownLib = markdownIt(options).use(markdownItAttrs);
    config.setLibrary("md", markdownLib);

    // on copie les fichiers de style css
    config.addPassthroughCopy("./src/assets/css/");
    config.addPassthroughCopy("./src/assets/image");

    // on ajoute la template index à l'objet global config
    config.addLayoutAlias('index', 'layouts/index.html');
    config.addLayoutAlias('card', 'layouts/card.html');

    config.addCollection("type", function(collectionApi) {
        return collectionApi.getAll().filter(function(item) {
            return "type" in item.data
        })
    })


    // configuration moteur de template / input-output
    return {
        passthroughFileCopy: true,
        markdownTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes"
        }
    }

}