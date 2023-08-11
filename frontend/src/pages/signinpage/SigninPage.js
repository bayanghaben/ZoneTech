import React, { Fragment } from 'react'
import { Signinform } from '../../components/Index'

function SigninPage() {
  return (
    <Fragment>
        <div className="signup-page-container">
        <Signinform />
        <div className="signup-page-rightside">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
            alt="form"
          />
        </div>
      </div>
    </Fragment>
  )
}

export default SigninPage
