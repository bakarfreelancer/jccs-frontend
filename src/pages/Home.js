import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CommunityList } from "../components/CommunityList";
import { Posts } from "../components/Posts";

const Home = () => {
  const token = useSelector((state) => state?.currentUser?.token);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  window.addEventListener("resize", () => setScreenSize(window.innerWidth));

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <Posts />
        </div>
        {screenSize >= 768 && (
          <Aside className="col-md-3">
            {token && <CommunityList pageType="side" />}
          </Aside>
        )}
      </div>
    </div>
  );
};
export default Home;
const Aside = styled.aside`
  overflow-y: scroll;
  height: calc(100vh - 103px);
`;
