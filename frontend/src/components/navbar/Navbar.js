import React, { Fragment, useContext } from "react";
import logo from "./z-tech.png";
import "./navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { allData } from "../../context/Context";
import { Button } from "../Index";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { signedInUser, currentUser, refresh, setRefresh } =
    useContext(allData);
  const navigate = useNavigate();

  const signOutHandler = () => {
    localStorage.removeItem("token");
    setRefresh(!refresh);
    navigate("/");
  };

  return (
    <Fragment>
      <header>
        <div className="header-leftside">
          <div className="logo-container">
            <img src={logo} alt="logo"></img>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
          </div>
        </div>
        <div className="header-rightside">
          <div className="shopping-cart">
            {signedInUser ? (
              <Fragment>
                <Link to="/usercart">
                  <FaShoppingCart />
                </Link>
              </Fragment>
            ) : null}
          </div>
          <div className="login-register-container">
            {signedInUser ? (
              <Fragment>
                <div className="user-image-container">
                  <img src={currentUser?.image} alt="profile" />
                </div>
                <div className="user-name-container">
                  {currentUser?.username}
                </div>
                <Button
                  color="gray"
                  placeholder="Sign Out"
                  clickFunction={signOutHandler}
                />
              </Fragment>
            ) : (
              <Fragment>
                <Link to="/signin">
                  <Button color="gray" placeholder="Sign In" />
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </header>
    </Fragment>
  );
}

export default Navbar;
