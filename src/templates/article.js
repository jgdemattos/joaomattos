import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { StructuredText } from "react-datocms"
import Mindamap from "../components/mindmap"
import SocialIcons from "../components/social-icons"
import { GatsbyImage } from "gatsby-plugin-image"
import { DateTime } from "luxon"
import { Link, useI18next } from "gatsby-plugin-react-i18next"
import Seo from "../components/seo"

const Article = data => {
  const {
    data: {datoCmsArticle,
      datoCmsArticle: { title, featuredImage, description, articleContent, author, category, date },
      locales,
    },
    pageContext: { alternativeLanguages },
  } = data
  const { t, i18n } = useI18next()
  console.log(datoCmsArticle)
  return (
    <Layout alternativeLanguages={alternativeLanguages}>
      <header>
        <section class="text-gray-600 body-font text-white max-w-2xl container mx-auto ">
          <div class="container px-5 py-4 mx-auto">
            <div class="flex flex-wrap">
              <div class=" ">
                <div class="h-full flex items-start">
                  <div class="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                    <span class="text-gray-400 pb-2 mb-2 border-b-2 border-gray-400">
                      {DateTime.fromISO(date)
                        .setLocale(i18n.resolvedLanguage)
                        .toLocaleString({ month: "short" })
                        .toUpperCase()}
                    </span>
                    <span class="font-medium text-lg text-gray-400 title-font leading-none">
                      {DateTime.fromISO(date)
                        .setLocale(i18n.resolvedLanguage)
                        .toLocaleString({ day: "numeric" })}
                    </span>
                  </div>
                  <div class="flex-grow pl-6">
                    <p class="tracking-widest text-xl title-font font-medium text-indigo-500 mb-1">
                      {category.name}
                    </p>
                    <p class="title-font text-xl font-medium text-gray-400 mb-3">
                      {title}
                    </p>
                    <p class="leading-relaxed mb-5 text-gray-300">
                      {description}
                    </p>
                    <a class="inline-flex items-center">
                      {/* <img
                        alt="blog"
                        src="https://dummyimage.com/103x103"
                        class="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                      ></img> */}
                      <GatsbyImage
                        image={author.avatar.gatsbyImageData}
                        loading="lazy"
                        alt={author.avatar.alt}
                        title={author.avatar.title}
                        className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <span class="flex-grow flex flex-col pl-3">
                        <span class="title-font font-medium text-gray-300">
                          João Mattos
                        </span>
                      </span>
                    </a>
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
      <section class="text-gray-600 body-font text-white max-w-2xl container mx-auto px-4">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            <div class="p-4">
              <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                {/* <img
                  alt="team"
                  class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                  src="https://dummyimage.com/200x200"
                /> */}
                <GatsbyImage
                  image={author.photo.gatsbyImageData}
                  loading="lazy"
                  alt={author.avatar.alt}
                  title={author.avatar.title}
                  className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                />
                <div class="flex-grow sm:pl-8">
                  <h2 class="title-font font-medium text-lg text-gray-300">
                    João Mattos
                  </h2>
                  <h3 class="text-gray-500 mb-3">UI Developer</h3>
                  <p class="mb-4">{author.statement}</p>
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
      title={data.datoCmsArticle.title}
      description={data.datoCmsArticle.description}
      location={location}
      data={data}
      pageContext={pageContext}
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

      {/*{pageContext.i18n.languages.map(lang => (
        <meta property="og:locale:alternate" content={lang} key={lang} />
      ))} */}
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
