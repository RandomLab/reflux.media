const markdownIt = require('markdown-it');
const markdownItEleventyImg = require("markdown-it-eleventy-img");
const eleventyImagePlugin =  require("@11ty/eleventy-img");


module.exports = (config) => {

    config.setLibrary('md', markdownIt ({
        html: true,
        breaks: true,
        linkify: true
      })
      .use(markdownItEleventyImg));

    // on copie les fichiers de style css
    config.addPassthroughCopy("./src/assets/css/");

    // on ajoute la template index à l'objet global config
    config.addLayoutAlias('index', 'layouts/index.html');
    config.addLayoutAlias('card', 'layouts/card.html');

    config.addCollection("type", function(collectionApi) {
        return collectionApi.getAll().filter(function(item) {
            return "type" in item.data
        })
    })

    config.addPlugin(eleventyImagePlugin, {
		// Set global default options
		formats: ["webp", "jpeg", "png"],
		urlPath: "/image/",

		// Notably `outputDir` is resolved automatically
		// to the project output directory

		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});

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