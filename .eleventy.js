
module.exports = (config) => {


    // on copie les fichiers de style css
    config.addPassthroughCopy("./src/assets/css/");
    config.addPassthroughCopy("./src/assets/image");

    // on ajoute la template index à l'objet global config
    config.addLayoutAlias('enter', 'layouts/enter.html');
    config.addLayoutAlias('index', 'layouts/index.html');
    config.addLayoutAlias('card', 'layouts/card.html');

    config.addCollection("type", function(collectionApi) {
        return collectionApi.getAll().filter(function(item) {
            return "type" in item.data
        })
    })


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