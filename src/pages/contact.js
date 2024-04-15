import * as React from "react"
import { Link, navigate } from "gatsby"
import Layout from "../components/layout.js"


const submit=(e)=>{
  e.preventDefault()
  navigate('/thankyou');
}

const ContactPage = () => {
  return (
    <Layout>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          {/* <div className="text-center lg:text-left text-white">
            <h1 className="text-5xl font-bold">Entre em contato!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
      </div>*/}
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <h1 className="text-5xl font-bold">Entre em contato!</h1>
              <form onSubmit={(e)=>submit(e)} >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Telefone</span>
                  </label>
                  <input
                    type="text"
                    placeholder="telefone"
                    name="telefone"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Enviar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContactPage

export const Head = () => <title>Contato</title>
