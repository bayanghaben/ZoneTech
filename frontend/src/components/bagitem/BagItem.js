import React, { Fragment, useContext, useEffect, useState } from "react";
import "./bagitem.css";
import axios from "axios";
import { Button } from "../Index";
import { allData } from "../../context/Context";

function BagItem({ product }) {
  const { currentUser, refresh, setRefresh } = useContext(allData);
  const [theProduct, setTheProduct] = useState(null);
  const [quantity, setQuantity] = useState(product.quantity);

  const editQuantity = async () => {
    await axios.post(
      `http://localhost:3001/api/v1/users/editquantity?id=${currentUser._id}`,
      {
        product: product.product,
        quantity: quantity,
      }
    );
  };

  const fetchOneProduct = async () => {
    const currentProduct = await axios.get(
      `http://localhost:3001/api/v1/products/oneproduct?id=${product.product}`
    );
    setTheProduct(currentProduct.data.data.product);
  };

  const deleteItemFromCart = async () => {
    await axios.post(
      `http://localhost:3001/api/v1/users/deletefromcard?id=${currentUser._id}`,
      {
        product: product.product,
      }
    );
    setRefresh(!refresh);
  };

  useEffect(() => {
    fetchOneProduct();
  }, []);

  useEffect(() => {
    editQuantity();
    setRefresh(!refresh);
  }, [quantity]);

  return (
    <Fragment>
      <div className="bagitem-container">
        <div className="bagitem-image">
          <img src={theProduct?.image} alt="product" />
        </div>
        <div className="bagitem-information">
          <div className="bagitem-title">{theProduct?.productname}</div>
          <div className="bagitem-description">{theProduct?.description}</div>
          <div className="bagitem-delete">
            <Button placeholder="Delete" clickFunction={deleteItemFromCart} />
          </div>
        </div>
        <div className="quantity-counter">
          <div class="flex items-center space-x-3">
            <button
              class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => {
                if (quantity !== 1) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <span class="sr-only">Quantity button</span>
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <div>
              <input
                type="number"
                id="first_product"
                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                readOnly
              />
            </div>
            <button
              class="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => setQuantity(quantity + 1)}
            >
              <span class="sr-only">Quantity button</span>
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <div className="price-container">
            {(Number(theProduct?.price?.slice(1)) * Number(quantity)).toFixed(
              1
            )}
            $
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default BagItem;
