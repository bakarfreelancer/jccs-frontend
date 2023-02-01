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
import { SingleUser } from "./pages/SingleUser";
import { UserPosts } from "./pages/UserPosts";
import { UserDrafts } from "./pages/UserDrafts";
import { Community } from "./pages/Community";
import { Feedback } from "./pages/Feedback";

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
        <Route path="/edit/:id" element={<AddPost />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/my-posts" element={<UserPosts />} />
        <Route path="/my-drafts" element={<UserDrafts />} />
        <Route path="/user/:id" element={<SingleUser />} />
        <Route path="/community" element={<Community />} />
        <Route path="/feedback" element={<Feedback />} />
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
