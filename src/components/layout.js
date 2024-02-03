import React from "react"
import "./layout.css"
import Header from "./header"
import Footer from "./footer"

const Layout = ({ children, alternativeLanguages }) => {
  return (
    <div data-theme="halloween">
      <Header alternativeLanguages={alternativeLanguages}></Header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  )
}

export default Layout
