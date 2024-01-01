/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config()
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const { languages, defaultLanguage } = require("./languages")
const siteUrl = process.env.URL || `https://mattos.pro`

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.mattos.pro/",
  },
  plugins: [
    {
      resolve: "gatsby-remark-markmap",
    },
    {
      resolve: "gatsby-source-datocms",
      options: {
        apiToken: process.env.DATOCMS_API_TOKEN,
        environment: process.env.DATOCMS_ENVIRONMENT,
        environment: "main",
        previewMode: false,
        disableLiveReload: false,
        localeFallbacks: {
          pt: ["pt"],
        },
        pageSize: 10,
      },
    },
    {
      resolve: "gatsby-plugin-react-i18next",
      options: {
        localeJsonSourceName: "locale",
        languages: languages,
        defaultLanguage: "pt",
        siteUrl: "https://www.mattos.pro/",
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
        host: "https://www.mattos.pro",
        sitemap: "https://www.mattos.pro/sitemap-index.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: "/",
        createLinkInHead: true,

        excludes: [
          "/404",
          "/404/",
          "/*/404",
          "404.html",
          "/*/404.html",
          "/*/blog-*/",
          "/blog-*/",
          "/dev-404-page/",
          "/*/dev-404-page/",
          "/confirmation/",
        ],
        resolveSiteUrl: () => siteUrl,
        //(filter: {context: {i18n: {routed: {eq: false}}}})
        query: `
            {
              site {
                siteMetadata {
                  siteUrl
                }
              }
              allSitePage {
                nodes {
                  pageContext
                  context {
                    i18n {
                      language
                      languages
                      defaultLanguage
                      originalPath
                    }
                  }
                  path
                }
              }
            }
          `,
        serialize: node => {
          const { language, languages, originalPath, defaultLanguage } =
            node.context.i18n
          const { updatedAt } = node.pageContext
          const path = node.path
          let url = siteUrl + path
          //if page created by createpages, dosent have trailing slash, so we add at the end
          // if ("alternativeLanguages" in node.pageContext) {
          //   url = url + "/"
          // }
          const links = []

          if (!("alternativeLanguages" in node.pageContext)) {
            links.push({ lang: language, url })
            let newURL = siteUrl + originalPath
            links.push({ lang: "x-default", url:newURL })
          }else{
            if(language==="pt"){
              links.push({ lang: "x-default", url })
              links.push({ lang: language, url })
            }else{
              links.push({ lang: language, url })
            }
          }

          //if alternativeLanguages is provided, page was created by createPages with datoCMS, and a unique slug is provided for each language
          if ("alternativeLanguages" in node.pageContext) {
            node.pageContext.alternativeLanguages.forEach(post => {
              if(language===post.locale) return null
              return links.push({
                lang: post.locale,
                url:
                  siteUrl +
                  ((post.locale !== defaultLanguage && "/" + post.locale) ||
                    "") +
                  "/blog/" +
                  post.value +
                  "/",
              })
            })
          } else {
            //if no alternativeLanguages is provided, page is obtained from pages folder and url is not translated, only localized
            languages.forEach(lang => {
              if (lang === language) return
              links.push({
                lang,
                url:
                  siteUrl +
                  ((lang !== defaultLanguage && "/" + lang) || "") +
                  originalPath,
              })
            })
          }
          return {
            url,
            /* changefreq: "daily",
            priority: originalPath === "/" ? 1.0 : 0.7, */
            lastmod: updatedAt,
            links,
          }
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-KR8QFC2Z",
        defaultDataLayer: { platform: "gatsby" },
        enableWebVitalsTracking: false,
      },
    },
  ],
}
