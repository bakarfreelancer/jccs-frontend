import React from "react";
import { Link } from "react-router-dom";

// Importing syles
import styled from "styled-components";
import { motion } from "framer-motion";
const Nav = () => {
  return (
    <Header>
      <h1>JCCS-Society</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="register">Register</Link>
        <Link to="login">Login</Link>
        <Link to="posts">Posts</Link>
        <Link to="logout">Logout</Link>
      </div>
    </Header>
  );
};

const Header = styled(motion.div)`
  display: flex;
  align-items: center;

  div {
    a {
      padding: 13px;
    }
  }
`;
export default Nav;
