import React, { Fragment, useContext, useEffect, useState } from "react";
import { BagItem } from "../../components/Index";
import { allData } from "../../context/Context";
import "./cartpage.css";
import { Button } from "../../components/Index";

function CartPage() {
  const { currentUser, totalPrice, setTotalPrice } = useContext(allData);

  const displayCartProducts = currentUser?.currentCart?.map((ele) => {
    return <BagItem product={ele} />;
  });

  useEffect(() => {
    calculatePrice();
  }, [currentUser.currentCart]);

  const calculatePrice = () => {
    if (!currentUser.currentCart || currentUser.currentCart.length === 0) {
      setTotalPrice(0);
      return;
    }

    let totalPrice = 0;
    for (const item of currentUser.currentCart) {
      if (item.price) {
        totalPrice += Number(item.price.slice(1)) * Number(item.quantity);
      } else {
        console.log("Item does not have a valid price:", item);
      }
    }

    setTotalPrice(totalPrice);
  };

  return (
    <Fragment>
      <div className="shoppingbag-container">
        <div className="shoppingbag-leftside">{displayCartProducts}</div>
        <div className="shoppingbag-rightside">
          <div className="shoppingbag-rightside-title">Your Shopping Cart</div>
          <div className="shoppingbag-rightside-price">
            Total Price: {totalPrice.toFixed(2)}$
          </div>
          <Button placeholder="Check Out" />
        </div>
      </div>
    </Fragment>
  );
}

export default CartPage;
