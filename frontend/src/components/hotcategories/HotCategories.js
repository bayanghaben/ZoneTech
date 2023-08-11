import React, { Fragment } from "react";
import "./hotcategories.css";
import { BsFire } from "react-icons/bs";
import { Link } from "react-router-dom";
import { OneCategory } from "../Index";
import { FaNetworkWired, FaHeadphones } from "react-icons/fa";
import { HiDesktopComputer } from "react-icons/hi";
import { IoLogoGameControllerB } from "react-icons/io";
import { AiFillCar } from "react-icons/ai";

function HotCategories() {
  const categories = [
    {
      image: <FaNetworkWired />,
      title: "Networking",
    },
    {
      image: <IoLogoGameControllerB />,
      title: "Gaming Accessories",
    },
    {
      image: <HiDesktopComputer />,
      title: "Computer Accessories",
    },
    {
      image: <FaHeadphones />,
      title: "Audio Accessories",
    },
    {
      image: <AiFillCar />,
      title: "Car Accessories",
    },
  ];

  const displayCategories = categories.map((ele) => {
    return <OneCategory title={ele.title} image={ele.image} />;
  });

  return (
    <Fragment>
      <div className="hot-categories-title">
        <div className="hot-categories-title-leftside">
          Hot Categories <BsFire style={{ color: "orange" }} />
        </div>
        <div className="hot-categories-title-rightside">
          <Link to="/products">Show All</Link>
        </div>
      </div>
      <div className="hot-categories-container">{displayCategories}</div>
    </Fragment>
  );
}

export default HotCategories;
