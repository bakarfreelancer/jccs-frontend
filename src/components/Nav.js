import React from "react";
import { Link } from "react-router-dom";

// Importing syles
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Nav = () => {
  const token = useSelector((state) => state?.currentUser?.currentUser?.token);
  return (
    <Header>
      <h1>JCCS-Society</h1>
      <div>
        <Link to="/">Home</Link>
        {!token && <Link to="register">Register</Link>}
        {!token && <Link to="login">Login</Link>}
        <Link to="posts">Posts</Link>
        {token && <Link to="logout">Logout</Link>}
        {token && <Link to="addpost">Add Post</Link>}
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
