import React, { Fragment } from "react";
import "./button.css";

function Button({ clickFunction, placeholder, color }) {
  return (
    <Fragment>
      <button
        type="button"
        className="btn-1"
        onClick={clickFunction}
      >
        {placeholder}
      </button>
    </Fragment>
  );
}

export default Button;
