import React from "react";

// npm packages
import Cookies from "universal-cookie";

const cookies = new Cookies();
const Home = () => {
  console.log(cookies.getAll());
  return <div>Home</div>;
};
export default Home;
