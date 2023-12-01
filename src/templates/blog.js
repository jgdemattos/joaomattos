import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout.js"
import { Link, useI18next } from "gatsby-plugin-react-i18next"
import ArticleList from "../components/article-list.js"

const Blog = ({
  data: {
    allDatoCmsArticle: {
      nodes,
      pageInfo: { pageCount, currentPage },
    },
  },
  location,
}) => {
  const { t, i18n } = useI18next()
  return (
    <Layout>
      <section className="text-gray-400 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <ArticleList articles={nodes}></ArticleList>

          <div className="btn-group">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                className={
                  "btn " + ((currentPage === i + 1 && "btn-active") || "")
                }
              >
                {" "}
                <Link
                  key={`pagination-number${i + 1}`}
                  to={`/${i === 0 ? "blog/" : i + 1}`}
                >
                  {i + 1}
                </Link>
              </button>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Blog

export const query = graphql`
  query articleByLanguage($language: String!, $limit: Int!, $skip: Int!) {
    allDatoCmsArticle(
      locale: $language
      filter: { slug: { ne: "null" } }
      limit: $limit
      skip: $skip
    ) {
      pageInfo {
        currentPage
        pageCount
      }
      nodes {
        category(locale: $language) {
          name(locale: $language)
          slug(locale: $language)
        }
        meta {
          publishedAt
        }
        slug(locale: $language)
        description(locale: $language)
        title(locale: $language)
        author {
          name
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
