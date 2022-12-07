import React from "react"
import "./layout.css"
import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }) => {
  return (
    <div data-theme="night">
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  )
}

export default Layout
