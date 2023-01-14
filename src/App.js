import Nav from "./components/Nav";
import Home from "./pages/Home";
import { Register } from "./components/Register";
import { Routes, Route } from "react-router-dom";
import { Logout } from "./components/Logout";
import { AddPost } from "./pages/AddPost";
// Styles
import GlobalStyles from "./components/GlobalStyles";
import { Account } from "./pages/Account";
import styled from "styled-components";
import { SinglePost } from "./pages/SinglePost";
import { UpdateProfile } from "./components/UpdateProfile";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/post/:id" element={<SinglePost />} />
      </Routes>
      <NavSpace />
      <Nav />
    </>
  );
}

export default App;

const NavSpace = styled.div`
  height: 57px;
`;
