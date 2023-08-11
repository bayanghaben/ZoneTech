import React, { Fragment } from "react";
import "./onecategory.css";
import { Link } from "react-router-dom";

function OneCategory({ image, title }) {
  return (
    <Fragment>
      <Link to="/products">
        <div className="one-category-container">
          <div className="one-category-image">{image}</div>
          <div className="one-category-title">{title}</div>
        </div>
      </Link>
    </Fragment>
  );
}

export default OneCategory;
