import React, { Fragment, useEffect, useState } from "react";
import "./productspage.css";
import { Filters } from "../../components/Index";
import axios from "axios";
import { ProductCard } from "../../components/Index";

function ProductsPage() {
  const [productsNumber, setProductsNumber] = useState(6);
  const [category, setCategory] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsLength, setProductsLength] = useState(1);

  const nPage = Math.ceil(productsLength / productsNumber);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  function nextPage() {
    if (currentPage !== nPage) setCurrentPage(currentPage + 1);
  }

  function prePage() {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  }

  function changPage(id) {
    setCurrentPage(id);
  }

  const displayPages = numbers.map((n, i) => {
    return (
      <li>
        <div
          key={i}
          href="/"
          onClick={() => changPage(n)}
          class={
            currentPage === n
              ? "z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white cursor-pointer"
              : "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
          }
        >
          {n}
        </div>
      </li>
    );
  });

  const fetchAllProducts = async () => {
    if (category !== "") {
      const allProduct = await axios.get(
        `http://localhost:3001/api/v1/products/allproducts?limit=${productsNumber}&&category=${category}&&page=${currentPage}&&sort=productname`
      );
      setAllProducts(allProduct.data.data.products);
      setProductsLength(allProduct.data.data.productsNumber);
    } else {
      const allProduct = await axios.get(
        `http://localhost:3001/api/v1/products/allproducts?limit=${productsNumber}&&page=${currentPage}&&sort=productname`
      );
      setAllProducts(allProduct.data.data.products);
      setProductsLength(allProduct.data.data.productsNumber);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [productsNumber, category, currentPage]);

  const displayProducts = allProducts.map((ele) => {
    return <ProductCard product={ele} />;
  });

  return (
    <Fragment>
      <Filters
        setProductsNumber={setProductsNumber}
        setCategory={setCategory}
        setCurrentPage={setCurrentPage}
      />
      <div className="allproducts-container">{displayProducts}</div>
      <nav
        aria-label="Page navigation example"
        className="pagination-container"
      >
        <ul class="flex items-center -space-x-px h-10 text-base">
          <li>
            <div
              onClick={prePage}
              href="/"
              class="cursor-pointer flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span class="sr-only">Previous</span>
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </div>
          </li>
          {displayPages}
          <li>
            <div
              onClick={nextPage}
              href="/"
              class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span class="sr-only">Next</span>
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </div>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
}

export default ProductsPage;
