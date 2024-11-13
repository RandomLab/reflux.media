module.exports = (config) => {

    // on copie les fichiers de style css
    config.addPassthroughCopy("./src/assets/css/");

    // on ajoute la template index à l'objet global config
    config.addLayoutAlias('index', 'layouts/index.html');

    // configuration moteur de template / input-output
    return {
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