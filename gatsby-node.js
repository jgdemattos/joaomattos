const path = require(`path`)
const { languages, defaultLanguage } = require("./languages")

const getAllSlugLangNames = languages =>
  languages.map(lang => ({ name: "slug" + lang.toUpperCase(), lang: lang }))

const getAvailableAltLangSlugs = (currentArticle, allSlugLangNames) =>
  allSlugLangNames.map(
    ({ name, lang }) =>
      currentArticle[name] && { lang: lang, slug: currentArticle[name] }
  )

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
    createPage({
      path: `/blog/${current.slugEN}`,
      component: path.resolve(__dirname, "src/templates/article.js"),
      context: {
        slug: current.slugEN,
        previousPostId: previous?.originalId,
        nextPostId: next?.originalId,
        alternativeLanguages: getAvailableAltLangSlugs(
          current,
          getAllSlugLangNames(languages)
        ),
        articleLang: "en",
        originalId: current.originalId,
        updatedAt: current.meta.updatedAt,
      },
    })
    current.slugPT &&
      createPage({
        path: `/pt/blog/${current.slugPT}`,
        component: path.resolve(__dirname, "src/templates/article.js"),
        context: {
          slug: current.slugEN,
          previousPostId: previous?.originalId,
          nextPostId: next?.originalId,
          alternativeLanguages: getAvailableAltLangSlugs(
            current,
            getAllSlugLangNames(languages)
          ),
          articleLang: "pt",
          originalId: current.originalId,
          updatedAt: current.meta.updatedAt,
        },
      })
  })
}
