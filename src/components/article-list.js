import React from "react"
import { DateTime } from "luxon"
import { Link, useI18next } from "gatsby-plugin-react-i18next"
const ArticleList = ({ articles }) => {
  const { t, i18n } = useI18next()
  return (
    <div className="-my-8 divide-y-2 divide-gray-800">
      {articles.map(
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
                  {DateTime.fromISO(article.date)
                    .setLocale(i18n.resolvedLanguage)
                    .toLocaleString(DateTime.DATE_FULL)}{console.log(article)}
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
  )
}

export default ArticleList
