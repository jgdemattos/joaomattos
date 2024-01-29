/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, title, children, data, location }) => {
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
      {/*       <meta property="article:published_time" content="2013-09-17T05:59:00+01:00" />
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
      {/* twitter */}
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.social?.twitter || ``}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
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
