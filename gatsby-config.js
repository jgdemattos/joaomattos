/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config()
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.joaomattos.com",
  },
  plugins: [
    {
      resolve: "gatsby-source-datocms",
      options: {
        apiToken: process.env.DATOCMS_API_TOKEN,
        environment: process.env.DATOCMS_ENVIRONMENT,
        environment: "main",
        previewMode: false,
        disableLiveReload: false,
        localeFallbacks: {
          pt: ["en"],
        },
        pageSize: 10,
      },
    },
    {
      resolve: "gatsby-plugin-react-i18next",
      options: {
        localeJsonSourceName: "locale",
        languages: ["en", "pt"],
        defaultLanguage: "en",
        siteUrl: "https://www.joaomattos.com/",
        trailingSlash: "always",
        redirect: false,
        i18nextOptions: {
          interpolation: {
            escapeValue: false,
          },
          keySeparator: false,
          nsSeparator: false,
        },
        pages: [
          {
            //prevents the creation of localized pages for /en/blog/post-name and /fr/blog/post-name...
            matchPath: `/:lang?/blog/:uid`,
            getLanguageFromPath: true,
            excludeLanguages: ["pt", "en"],
          },
          {
            //prevents the creation of localized pages for /en/blog/ and /fr/blog/...
            matchPath: `/:lang?/blog/`,
            getLanguageFromPath: true,
            excludeLanguages: ["pt", "en"],
          },
          {
            //prevents the creation of localized pages for /en/blog-1/ and -2 and -3...
            matchPath: `/:lang?/blog-:foo(\\d+)/`,
            getLanguageFromPath: true,
            excludeLanguages: ["pt", "en"],
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "João Mattos's Blog",
        short_name: "joaomattos",
        start_url: "/",
        background_color: "#ffffff",
        display: "minimal-ui",
        icon: "src/images/icon.png", // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.joaomattos.com",
        sitemap: "https://www.joaomattos.com/sitemap-index.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
}
