import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout.js"
import { Link, useI18next } from "gatsby-plugin-react-i18next"
import { DateTime } from "luxon"

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
      <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-800">
            {nodes.map(
              article =>
                article.slug && (
                  <div
                    className="py-8 flex flex-wrap md:flex-nowrap"
                    key={article.slug}
                  >
                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                      <span className="font-semibold title-font text-white">
                        {article.category.name}
                      </span>
                      <span className="mt-1 text-gray-500 text-sm">
                        {DateTime.fromISO(article.meta.publishedAt)
                          .setLocale(i18n.resolvedLanguage)
                          .toLocaleString(DateTime.DATE_FULL)}
                      </span>
                    </div>
                    <Link to={"/blog/" + article.slug} key={article.slug}>
                      <div className="md:flex-grow">
                        <h2 className="text-2xl font-medium text-white title-font mb-2">
                          {article.title}
                        </h2>
                        <p className="leading-relaxed">{article.description}</p>
                        <span className="text-indigo-400 inline-flex items-center mt-4">
                          {t("blog-readmore")}
                          <svg
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </div>
                )
            )}
          </div>

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
