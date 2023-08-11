import React, { Fragment, useContext, useEffect, useState } from "react";
import "./detailspage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/Index";
import { allData } from "../../context/Context";

function DetailsPage() {
  const { productId } = useParams();
  const { currentUser, refresh, setRefresh, signedInUser } = useContext(allData);

  const [product, setProduct] = useState({});

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

  const fetchOneProduct = async () => {
    const oneProduct = await axios.get(
      `http://localhost:3001/api/v1/products/oneproduct?id=${productId}`
    );
    setProduct(oneProduct.data.data.product);
  };

  useEffect(() => {
    fetchOneProduct();
  }, []);

  return (
    <Fragment>
      <div className="productdetail-container">
        <div className="productdetail-leftside">
          <div className="productdetail-img-container">
            <img src={product.image} alt="product" />
          </div>
        </div>
        <div className="productdetail-rightside">
          <div className="prodcut-category-container">
            {product.category} {">"}
          </div>
          <div className="prodcut-name-container">{product.productname}</div>
          <div className="prodcut-description-container">
            {product.description}
          </div>
          <div className="prodcut-price-container">
            <div className="prodcut-price">{product.price}</div>
            {signedInUser ? (
              <Button
                placeholder="Add to card"
                clickFunction={handelAddToCart}
              />
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DetailsPage;
