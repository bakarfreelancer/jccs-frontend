import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

// Importing syles
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const cookies = new Cookies();
const Nav = () => {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <Header>
      <h1>JCCS-Society</h1>
      <div>
        <Link to="/">Home</Link>
        {!currentUser.token && <Link to="register">Register</Link>}
        {!currentUser.token && <Link to="login">Login</Link>}
        <Link to="login">Login</Link>
        <Link to="posts">Posts</Link>
        {currentUser.token && <Link to="logout">Logout</Link>}
        {currentUser.token && <Link to="addpost">Add Post</Link>}
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
