import React, { Fragment, useEffect, useState } from "react";
import "./populargoods.css";
import axios from "axios";
import { ProductCard } from "../Index";

function PopularGoods() {
  const [popularGoods, setPopularGoods] = useState([]);

  const fetchPopularGoods = async () => {
    const products = await axios.get(
      "http://localhost:3001/api/v1/products/random-four-products"
    );
    console.log(products)
    setPopularGoods(products.data.data.products);
  };

  useEffect(() => {
    fetchPopularGoods();
  }, []);

  const displayPopularGoods = popularGoods.map((ele) => {
    return <ProductCard product={ele}/>;
  });

  return (
    <Fragment>
      <div className="populargoods-title">Popular Goods</div>
      <div className="populargoods-container">{displayPopularGoods}</div>
    </Fragment>
  );
}

export default PopularGoods;
