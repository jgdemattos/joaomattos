import * as React from "react"
import Layout from "../components/layout.js"
import { graphql } from "gatsby"
import ArticleList from "../components/article-list.js"
import { GatsbyImage } from "gatsby-plugin-image"
import { StructuredText } from "react-datocms"

const IndexPage = ({
  data,
  data: {
    allDatoCmsArticle: { nodes },
    datoCmsHomePage,
  },
}) => {
  console.log(data)
  return (
    <Layout>
      {/* hero */}
      <section className=" body-font">
        <div className="container mx-auto flex px-5 pt-24 pb-12 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium text-primary">
              {datoCmsHomePage.title}
            </h1>
            <p className="mb-8 leading-relaxed text-white">
              {datoCmsHomePage.subtitle}
            </p>
            <p className="prose lg:prose-xl max-w-2xl mb-8 leading-relaxed text-white">
              <StructuredText data={datoCmsHomePage.description} />
            </p>
            <div className="flex justify-center">
              <button className="inline-flex   border-0 py-2 px-6 focus:outline-none  rounded text-lg btn-primary">
                Button
              </button>
              <button className="ml-4 inline-flex  bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover: rounded text-lg">
                Button
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <GatsbyImage
              image={datoCmsHomePage.featuredImage.gatsbyImageData}
              loading="lazy"
              alt={datoCmsHomePage.featuredImage.alt}
              title={datoCmsHomePage.featuredImage.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>
      {/* hero end */}
      {/* blog */}
      <section className="body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <ArticleList articles={nodes}></ArticleList>
        </div>
      </section>
      {/* blog end */}
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>

export const pageQuery = graphql`
  query ($language: String!) {
    datoCmsHomePage(locale: $language) {
      title(locale: $language)
      subtitle(locale: $language)
      description(locale: $language) {
        value
      }
      featuredImage(locale: $language) {
        width
        height
        alt
        title
        url
        gatsbyImageData(width: 600, placeholder: BLURRED, forceBlurhash: false)
      }
    }
    allDatoCmsArticle(
      locale: $language
      filter: { slug: { ne: "null" } }
      limit: 3
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
