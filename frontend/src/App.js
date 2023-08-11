import { Fragment } from "react";
import "./App.css";
import {
  Navbar,
  LandingPage,
  SignupPage,
  SigninPage,
  Footer,
  ProductsPage,
  DetailsPage,
  CartPage,
} from "./components/Index";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/signin" element={<SigninPage />}></Route>
        <Route path="/products" element={<ProductsPage />}></Route>
        <Route
          path="/products/details/:productId"
          element={<DetailsPage />}
        ></Route>
        <Route path="/usercart" element={<CartPage />}></Route>
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
