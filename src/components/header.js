import React from "react"
import { Link, useI18next } from "gatsby-plugin-react-i18next"

const Header = ({ alternativeLanguages }) => {
  const { languages, originalPath, t, i18n } = useI18next()
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-none">
          <div className="dropdown">
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">{t("header-menu-home")}</Link>
              </li>
              <li>
                <Link to="/blog/">{t("header-menu-blog")}</Link>
              </li>
              {/*               <li>
                <Link to="/portfolio/">{t("header-menu-portfolio")}</Link>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <Link to="/">
            <span className="btn btn-ghost normal-case text-xl">
              João Mattos
            </span>
          </Link>
        </div>
        <div className="dropdown dropdown-bottom dropdown-end">
          <button tabIndex={0} className="btn btn-square btn-ghost">
            {i18n.resolvedLanguage}
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu shadow bg-base-100 rounded-box "
          >
            {(alternativeLanguages && alternativeLanguages.length > 0 && (
              <li>
                {alternativeLanguages.map(
                  (language, i) =>
                    language && (
                      <Link
                        key={i}
                        to={"/blog/" + language.value}
                        language={language.locale}
                        style={{
                          textDecoration:
                            i18n.resolvedLanguage === language.locale
                              ? "underline"
                              : "none",
                        }}
                      >
                        <button
                          /* className="btn btn-ghost btn-circle" */ className="uppercase"
                        >
                          {language.locale}
                        </button>
                      </Link>
                    )
                )}
              </li>
            )) || (
              <li>
                {languages.map((lng, i) => (
                  <Link
                    key={i}
                    to={originalPath}
                    language={lng}
                    style={{
                      textDecoration:
                        i18n.resolvedLanguage === lng ? "underline" : "none",
                    }}
                  >
                    <button
                      /* className="btn btn-ghost btn-circle" */ className="uppercase"
                    >
                      {lng}
                    </button>
                  </Link>
                ))}
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Header
