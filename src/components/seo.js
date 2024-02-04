/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({
  description,
  title,
  children,
  data,
  location,
  generatedPageAltLanguages,
  fixedPageAltLanguages,
  language
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrlNoSlash
            author {
              name
            }
            description
            social {
              twitter
            }
          }
        }
      }
    `
  )


  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const pageUrl =
    site.siteMetadata.siteUrlNoSlash + ((location && location.pathname) || "/")

    console.log(generatedPageAltLanguages)

    generatedPageAltLanguages && generatedPageAltLanguages.map(lang => {
      console.log(lang)
    })

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      {/* facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      {/* <meta property="og:image" content={title} /> */}
      <meta property="og:description" content={metaDescription} />
      {/* 297 chars */}
      <meta property="og:site_name" content="João Mattos Pro" />

      {/* twitter */}
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.social?.twitter || ``}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {/* {generatedPageAltLanguages.map(lang => {
        <meta property="og:locale:alternate" content={lang.locale} key={lang.locale} />
      })}    */}

      {children}

      <link rel="canonical" href={pageUrl} />

      {/*     <meta property="og:locale" content={pageContext.i18n.language} />
    {pageContext.i18n.languages.map(lang => (
      <meta property="og:locale:alternate" content={lang} key={lang} />
    ))}
    
    <link
        rel="alternate"
        hrefLang="PT"
        href="URL.cp,"
        key="PT"
      />
    */}



      {generatedPageAltLanguages &&
        generatedPageAltLanguages.map(lang => {
          return (language === lang.locale && (
            <>
              <link
                rel="x-default"
                hrefLang={lang.locale}
                href={site.siteMetadata.siteUrlNoSlash + "/" + lang.value}
                key={lang.locale}
              />
              <meta
                property="og:locale"
                content={lang.locale}
                key={lang.locale}
              />
            </>
          )) || (
            <>
              {" "}
              <link
                rel="alternate"
                hrefLang={lang.locale}
                href={site.siteMetadata.siteUrlNoSlash + "/" + lang.value}
                key={lang.locale}
              />
              <meta
                property="og:locale:alternate"
                content={lang.locale}
                key={lang.locale}
              />
            </>
          )
        })}
      {fixedPageAltLanguages &&
        fixedPageAltLanguages.map(locale => {
          return (language === locale && (
            <>
              {" "}
              <link
                rel="x-default"
                hrefLang={locale}
                href={pageUrl}
                key={locale}
              />
              <meta property="og:locale" content={locale} key={locale} />
            </>
          )) || (
            <>
              {" "}
              <link
                rel="alternate"
                hrefLang={locale}
                href={pageUrl + "/" + locale}
                key={locale}
              />
              <meta
                property="og:locale:alternate"
                content={locale}
                key={locale}
              />
            </>
          )
        })}
    </>
  )
}

Seo.defaultProps = {
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default Seo

      {/*       
      <meta property="article:published_time" content="2013-09-17T05:59:00+01:00" />
      <meta property="article:modified_time" content="2013-09-16T19:08:47+01:00" />
      <meta property="article:section" content="Article Section" />
      <meta property="article:tag" content="Article Tag" />
      <meta property="fb:admins" content="Facebook numberic ID" /> 
      <meta property="og:locale" content="en_GB" />
      <meta property="og:locale:alternate" content="fr_FR" />
      <meta property="og:locale:alternate" content="es_ES" />

      <meta property="og:image" content="https://example.com/ogp.jpg" />
      <meta property="og:image:secure_url" content="https://secure.example.com/ogp.jpg" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="300" />
      <meta property="og:image:alt" content="A shiny red apple with a bite taken out" />
      */}