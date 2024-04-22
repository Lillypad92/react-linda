import React from 'react'
import '../style/styles.css'

export function Home() {
  return (
    <>
    <div className="container px-4 py-4" id="home-text-area" bg="dark" data-bs-theme="dark">
          <div className="bg-body-tertiary p-5 rounded">
            <div className="col-sm-8 py-5 mx-auto">
              <h1 className="display-5 fw-normal">Welcome to React Appmusic</h1>
                <p className="fs-5">This React application was made by developer Linda Forslund</p>
            </div>
          </div>
        </div>
    </>
  )
}