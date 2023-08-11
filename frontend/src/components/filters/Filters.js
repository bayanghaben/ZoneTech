import React, { Fragment, useEffect, useState } from "react";
import "./filters.css";
import axios from "axios";

function Filters({ setCategory, setProductsNumber, setCurrentPage }) {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const allCategories = await axios.get(
      "http://localhost:3001/api/v1/products/allCategories"
    );
    setCategories(allCategories.data.data.allCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const displayOptions = categories.map((ele) => {
    return <option value={ele}>{ele}</option>;
  });

  return (
    <Fragment>
      <div className="filters-container">
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option selected value="">
            Select a category
          </option>
          {displayOptions}
        </select>
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => {
            setCurrentPage(1);
            setProductsNumber(e.target.value);
          }}
        >
          <option value="6">6</option>
          <option value="8">8</option>
          <option value="10">10</option>
        </select>
      </div>
    </Fragment>
  );
}

export default Filters;
