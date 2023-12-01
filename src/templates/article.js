import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { StructuredText } from "react-datocms"
import Mindamap from "../components/mindmap"

const Article = data => {
  const {
    data: {
      datoCmsArticle: { title, featuredImage, description, articleContent,mindmap },
      locales,
    },
    pageContext: { alternativeLanguages },
  } = data
  console.log(mindmap)
  return (
    <Layout alternativeLanguages={alternativeLanguages}>
      <header>
        <div
          className="hero"
          style={{
            backgroundImage: `url("${featuredImage.url}")`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">{title}</h1>
              <p className="mb-5">{description}</p>
            </div>
          </div>
        </div>
      </header>
      {mindmap!= null && (
        <div className=" border-dashed border-x-transparent border-y-neutral-600 border-2">
          <div className="max-w-4xl mx-auto ">
            <Mindamap markdown={mindmap}></Mindamap>
          </div>
        </div>
      )}

      <article className="prose lg:prose-lg text-white max-w-2xl container mx-auto py-8 px-4">
        <section itemProp="articleBody">
          <StructuredText
            data={articleContent}
            renderBlock={({ record }) => {
              return <img src={record.image.url} alt={record.image.alt} />
            }}
          />
        </section>
        <hr />
      </article>
    </Layout>
  )
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
      mindmap
      title(locale: $articleLang)
      description(locale: $articleLang)
      articleContent(locale: $articleLang) {
        value
        blocks {
          ... on DatoCmsArticleImage {
            id: originalId
            image {
              url
              alt
            }
          }
        }
      }
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
