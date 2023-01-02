import Nav from "./components/Nav";
import Home from "./pages/Home";
import { Register } from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { AddPost } from "./pages/AddPost";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/addpost" element={<AddPost />} />
      </Routes>
    </>
  );
}

export default App;
