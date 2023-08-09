import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout.js"

const ThankYouPage = () => {
  return (
    <Layout>
      <div
        class="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div class="hero-content flex-col lg:flex-row-reverse">
          {/* <div class="text-center lg:text-left text-white">
            <h1 class="text-5xl font-bold">Entre em contato!</h1>
            <p class="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
      </div>*/}
          <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
              <h1 class="text-5xl font-bold">Entrarei em contato breve!</h1>
              <Link to="/">
                <span>
                  <button class="btn btn-primary">Página inicial</button>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ThankYouPage

export const Head = () => <title>Obrigado</title>
