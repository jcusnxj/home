import 'dotenv/config'
import { DateTime } from "luxon";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { EleventyI18nPlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {

    // method creates a file/folder copy in the output directory
    eleventyConfig.addPassthroughCopy("views/assets/css");
    eleventyConfig.addPassthroughCopy("views/assets/img");
    eleventyConfig.addPassthroughCopy("views/assets/js");

    // PLUGINS
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(EleventyI18nPlugin, {
        // any valid BCP 47-compatible language tag is supported
        defaultLanguage: "cs",
      });
    
    // FILTERS
    // Luxon date filter (for JavaScript Date object)
    eleventyConfig.addFilter("dateObject", (dateObj, format = "LLL d") => {
        return DateTime.fromJSDate(dateObj).toFormat(format);
    });

    //luxon date filter (for ISO 8601 date strings)
    eleventyConfig.addFilter("dateString", (dateObj, format = "LLL d") => {
        return DateTime.fromISO(dateObj).toFormat(format);
    });

    // EXCERPTS
    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        // Optional, default is "---"
        excerpt_separator: "<!-- excerpt -->",
    });

};

export const config = {

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",

    dir: {
        input: "views",
        layouts: "_layouts",
        output: "dist"
    }
};