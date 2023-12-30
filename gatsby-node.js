const path = require(`path`)
const { languages, defaultLanguage } = require("./languages")

/**
 * Workaround for missing sitePage.context(used for quering pages on sitemap plugin):
 * Used for generating sitemap with `gatsby-plugin-react-i18next` and `gatsby-plugin-sitemap` plugins
 * https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v3-to-v4/#field-sitepagecontext-is-no-longer-available-in-graphql-queries
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
  type SitePage implements Node {
    context: SitePageContext
  }
  type SitePageContext {
    i18n: i18nContext
  }
  type i18nContext {
      language: String,
      languages: [String],
      defaultLanguage: String,
      originalPath: String
      routed: Boolean
  }
`)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  //gets all posts that are not null(language variations that were not published yet) by language(as of source plugin lastest update)
  const queryData = await graphql(`
    {
      allDatoCmsArticle(locale: "pt", filter: { slug: { ne: "null" } }) {
        edges {
          previous {
            originalId
          }
          next {
            originalId
          }
          node {
            _allSlugLocales {
              value
              locale
            }
            meta {
              updatedAt
            }
            slugPT: slug(locale: "pt")
            slugEN: slug(locale: "en")
            originalId
            locales
          }
        }
      }
    }
  `)

  const articles = queryData.data.allDatoCmsArticle.edges

  articles.forEach(({ node: current, previous, next }, index) => {
    current.slugPT && console.log(current.slugPT)
    current.slugEN && console.log(current.slugEN)
      
    current.slugPT && createPage({
      path: `/blog/${current.slugPT}`,
      component: path.resolve(__dirname, "src/templates/article.js"),
      context: {
        slug: current.slugPT,
        previousPostId: previous?.originalId,
        nextPostId: next?.originalId,
        alternativeLanguages: current._allSlugLocales,
        articleLang: "pt",
        originalId: current.originalId,
        updatedAt: current.meta.updatedAt,
      },
    })
    
    current.slugEN && current.slugEN &&
      createPage({
        path: `/en/blog/${current.slugEN}`,
        component: path.resolve(__dirname, "src/templates/article.js"),
        context: {
          slug: current.slugEN,
          previousPostId: previous?.originalId,
          nextPostId: next?.originalId,
          alternativeLanguages: current._allSlugLocales,
          articleLang: "en",
          originalId: current.originalId,
          updatedAt: current.meta.updatedAt,
        },
      })
  })

  const numPages = Math.ceil(Math.ceil(articles.length / 3) / languages.length)

  languages.forEach(lng => {
    // Create the homepage
    createPage({
      path: (lng === "pt" && `/blog/`) || `/${lng}/blog/`,
      component: path.resolve(__dirname, "src/templates/blog.js"),
      context: {
        limit: 3,
        skip: 0,
        type: "blog",
        language: lng,
      },
    })

    // Create listing pages
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: (lng === "pt" && `/blog-${i + 1}/`) || `/${lng}/blog-${i + 1}/`,
        component: path.resolve(__dirname, "src/templates/blog.js"),
        context: {
          limit: 3,
          skip: i * 3,
          type: "blog",
          language: lng,
        },
      })
    })
  })
}
