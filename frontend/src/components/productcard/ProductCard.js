import React, { Fragment, useContext, useEffect, useState } from "react";
import "./productcard.css";
import { Button } from "../Index";
import axios from "axios";
import { allData } from "../../context/Context";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { signedInUser, currentUser, setRefresh, refresh } =
    useContext(allData);

  const [vendorName, setVendorName] = useState();

  const handelAddToCart = async () => {
    await axios.post(
      `http://localhost:3001/api/v1/users/additem?id=${currentUser._id}`,
      {
        product: product._id,
        quantity: 1,
      }
    );
    setRefresh(!refresh);
  };

  const fetchVendorName = async () => {
    const vendor = await axios.get(
      `http://localhost:3001/api/v1/users?id=${product.vendor}`
    );
    console.log(vendor);
    setVendorName(vendor.data.data.user.username);
  };

  useEffect(() => {
    fetchVendorName();
  }, []);

  return (
    <Fragment>
      <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
        <Link to={`/products/details/${product._id}`}>
          <img class="p-8 rounded-t-lg" src={product.image} alt="product" />
        </Link>
        <div class="px-5 pb-5">
          <Link to={`/products/details/${product._id}`}>
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {product.productname}
            </h5>
          </Link>
          <div class="flex items-center mt-2.5 mb-5 text-lg">
            Vendor: {vendorName}
          </div>
          <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">
              {product.price}
            </span>
            {signedInUser ? (
              <Button
                placeholder="Add to cart"
                clickFunction={handelAddToCart}
              />
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductCard;
