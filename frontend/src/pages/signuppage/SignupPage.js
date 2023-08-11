import React, { Fragment } from "react";
import { Signupform } from "../../components/Index";
import "./signuppage.css";

function SignupPage() {
  return (
    <Fragment>
      <div className="signup-page-container">
        <Signupform />
        <div className="signup-page-rightside">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
            alt="form"
          />
        </div>
      </div>
    </Fragment>
  );
}

export default SignupPage;
