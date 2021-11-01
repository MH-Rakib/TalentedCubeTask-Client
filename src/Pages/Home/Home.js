import React from "react";
import Header from "./../../Components/Header/Header";
import Footer from "./../../Components/Footer/Footer";
import AllProducts from "./../../Components/AllProducts/AllProducts";

const Home = () => {
  return (
    <div>
      <Header></Header>
      <AllProducts />
      <Footer></Footer>
    </div>
  );
};

export default Home;
