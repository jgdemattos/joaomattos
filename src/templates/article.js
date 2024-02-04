import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { StructuredText } from "react-datocms"
import SocialIcons from "../components/social-icons"
import { GatsbyImage } from "gatsby-plugin-image"
import { DateTime } from "luxon"
import {  useI18next } from "gatsby-plugin-react-i18next"
import Seo from "../components/seo"

const Article = data => {
  const {
    data: {
      datoCmsArticle: {
        title,
        description,
        articleContent,
        author,
        category,
        date,
      },
    },

    pageContext: { alternativeLanguages },
  } = data
  const {  i18n } = useI18next()

  return (
    <Layout alternativeLanguages={alternativeLanguages}>
      <header>
        <section className="text-gray-600 body-font text-white max-w-2xl container mx-auto ">
          <div className="container px-5 py-4 mx-auto">
            <div className="flex flex-wrap">
              <div className=" ">
                <div className="h-full flex items-start">
                  <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                    <span className="text-gray-400 pb-2 mb-2 border-b-2 border-gray-400">
                      {DateTime.fromISO(date)
                        .setLocale(i18n.resolvedLanguage)
                        .toLocaleString({ month: "short" })
                        .toUpperCase()}
                    </span>
                    <span className="font-medium text-lg text-gray-400 title-font leading-none">
                      {DateTime.fromISO(date)
                        .setLocale(i18n.resolvedLanguage)
                        .toLocaleString({ day: "numeric" })}
                    </span>
                  </div>
                  <div className="flex-grow pl-6">
                    <p className="tracking-widest text-xl title-font font-medium text-indigo-500 mb-1">
                      {category.name}
                    </p>
                    <p className="title-font text-xl font-medium text-gray-400 mb-3">
                      {title}
                    </p>
                    <p className="leading-relaxed mb-5 text-gray-300">
                      {description}
                    </p>
                    <span className="inline-flex items-center">
                      {/* <img
                        alt="blog"
                        src="https://dummyimage.com/103x103"
                        className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                      ></img> */}
                      <GatsbyImage
                        image={author.avatar.gatsbyImageData}
                        loading="lazy"
                        alt={author.avatar.alt}
                        title={author.avatar.title}
                        className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <span className="flex-grow flex flex-col pl-3">
                        <span className="title-font font-medium text-gray-300">
                          João Mattos
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>

      {/* {mindmap!= null && (
        <div className=" border-dashed border-x-transparent border-y-neutral-600 border-2">
          <div className="max-w-4xl mx-auto ">
            <Mindamap markdown={mindmap}></Mindamap>
          </div>
        </div>
      )} */}

      <article className="prose lg:prose-lg text-white max-w-2xl container mx-auto px-4 py-8">
        <section itemProp="articleBody">
          <StructuredText
            data={articleContent}
            renderBlock={({ record }) => {
              return (
                <img
                  src={record.image.url}
                  alt={record.image.alt}
                  className="rounded-2xl"
                />
              )
            }}
          />
        </section>
        <hr />
      </article>
      <section className="text-gray-600 body-font text-white max-w-2xl container mx-auto px-4">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="p-4">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                {/* <img
                  alt="team"
                  className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                  src="https://dummyimage.com/200x200"
                /> */}
                <GatsbyImage
                  image={author.photo.gatsbyImageData}
                  loading="lazy"
                  alt={author.avatar.alt}
                  title={author.avatar.title}
                  className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                />
                <div className="flex-grow sm:pl-8">
                  <h2 className="title-font font-medium text-lg text-gray-300">
                    João Mattos
                  </h2>
                  <h3 className="text-gray-500 mb-3">{author.role}</h3>
                  <p className="mb-4">{author.statement}</p>
                  <SocialIcons></SocialIcons>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Article

export const Head = ({ data, location, pageContext }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    image: [data.datoCmsArticle.featuredImage.url],
    author: [
      {
        "@type": "Person",
        name: data.datoCmsArticle.author.name,
        /* 'url': 'https://www.example.com/' */
      },
    ],
    headline: data.datoCmsArticle.title,
    datePublished: data.datoCmsArticle.meta.firstPublishedAt,
    dateModified: data.datoCmsArticle.meta.updatedAt,
  }

  return (
    <Seo
      data={data}
      location={location}
      title={data.datoCmsArticle.title}
      description={data.datoCmsArticle.description}
      generatedPageAltLanguages={pageContext.alternativeLanguages}
      language={pageContext.language}
    >
      <meta
        property="article:published_time"
        content={data.datoCmsArticle.meta.firstPublishedAt}
      />
      <meta
        property="article:modified_time"
        content={data.datoCmsArticle.meta.updatedAt}
      />
      <meta property="article:section" content="Advanced Marketing Analytics" />
      <meta
        property="article:author"
        content={data.datoCmsArticle.author.name}
      />
      {/* implements tags in datocms for this one. */}
      {/* <meta property="article:tag" content="Article Tag" /> */}
      <meta property="fb:admins" content="10227205602236142" />
      {/*1540909959 */}

      <meta property="og:locale" content={pageContext.i18n.language} />

      <meta
        property="og:image"
        content={data.datoCmsArticle.featuredImage.url}
      />
      <meta
        property="og:image:secure_url"
        content={data.datoCmsArticle.featuredImage.url}
      />
      <meta property="og:image:type" content="image/jpeg" />
      <meta
        property="og:image:width"
        content={data.datoCmsArticle.featuredImage.width}
      />
      <meta
        property="og:image:height"
        content={data.datoCmsArticle.featuredImage.height}
      />
      <meta
        property="og:image:alt"
        content={data.datoCmsArticle.featuredImage.alt}
      />
      <script type="application/ld+json">{JSON.stringify({ schema })}</script>
    </Seo>
  )
}

export const pageQuery = graphql`
  query ArticleBySlug(
    $originalId: String!
    $articleLang: String!
    $language: String!
  ) {
    datoCmsArticle(originalId: { eq: $originalId }, locale: $articleLang) {
      category(locale: $language) {
        name(locale: $language)
        slug(locale: $language)
      }
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
      date
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
        photo {
          gatsbyImageData(width: 300, placeholder: BLURRED, forceBlurhash: false)
          alt
          title
        }
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
