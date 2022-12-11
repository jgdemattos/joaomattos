import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { StructuredText } from "react-datocms"

const Article = data => {
  const {
    data: {
      datoCmsArticle: { title },
      locales,
    },
    pageContext: { alternativeLanguages },
  } = data
  return <Layout alternativeLanguages={alternativeLanguages}>{title}</Layout>
}

export default Article

export const pageQuery = graphql`
  query ArticleBySlug(
    $originalId: String!
    $articleLang: String!
    $language: String!
  ) {
    datoCmsArticle(originalId: { eq: $originalId }, locale: $articleLang) {
      meta {
        firstPublishedAt
        updatedAt
      }
      featuredImage {
        width
        height
        alt
        title
        url
        gatsbyImageData(width: 600, placeholder: BLURRED, forceBlurhash: false)
      }
      slug
      title
      author {
        name
        role
        statement
        avatar {
          gatsbyImageData(width: 64, placeholder: BLURRED, forceBlurhash: false)
          alt
          title
        }
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
