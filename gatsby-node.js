const path = require(`path`)
const { languages, defaultLanguage } = require("./languages")

const getAltLangArticles = (currentOriginalId, allArticlesByLang) => {
  let altLangArticles = {}

  for (const [lang, articles] of Object.entries(allArticlesByLang)) {
    const filteredArticle = articles.reduce(
      (previousValue, currentValue, index) => {
        if (currentValue.node.originalId === currentOriginalId) {
          return currentValue.node.slug
        } else {
          return previousValue
        }
      },
      0
    )
    altLangArticles = { ...altLangArticles, [lang]: filteredArticle }
  }

  return altLangArticles
}

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
  const queryDataEN = await graphql(`
    {
      allDatoCmsArticle(filter: { slug: { ne: null } }, locale: "en") {
        edges {
          previous {
            originalId
          }
          next {
            originalId
          }
          node {
            meta {
              updatedAt
            }
            slug
            originalId
            locales
          }
        }
      }
    }
  `)

  const articlesEN = queryDataEN.data.allDatoCmsArticle.edges

  const queryDataPT = await graphql(`
    {
      allDatoCmsArticle(filter: { slug: { ne: null } }, locale: "pt") {
        edges {
          previous {
            originalId
          }
          next {
            originalId
          }
          node {
            meta {
              updatedAt
            }
            slug
            originalId
            locales
          }
        }
      }
    }
  `)

  const articlesPT = queryDataPT.data.allDatoCmsArticle.edges

  const allArticlesByLang = {
    pt: queryDataPT.data.allDatoCmsArticle.edges,
    en: queryDataEN.data.allDatoCmsArticle.edges,
  }

  articlesEN.forEach(({ node: current, previous, next }, index) => {
    const altLangArticles = getAltLangArticles(
      current.originalId,
      allArticlesByLang
    )
    createPage({
      path: `/blog/${current.slug}`,
      component: path.resolve(__dirname, "src/templates/article.js"),
      context: {
        slug: current.slug,
        previousPostId: previous?.originalId,
        nextPostId: next?.originalId,
        alternativeLanguages: altLangArticles,
        language: "en",
        originalId: current.originalId,
        updatedAt: current.meta.updatedAt,
      },
    })
  })
}
