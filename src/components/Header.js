import React from "react";
import { QuestionCircle, Search } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
  return (
    <Head className="bg-white border-bottom border-light py-1">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <h1 className="fs-4 text-primary col-auto">
            <Link to="/" className="text-decoration-none">
              JCCS
            </Link>
          </h1>
          <div className="col-auto">
            <Search className="icon-primary" />
            <QuestionCircle className="ms-3 icon-primary" />
          </div>
        </div>
      </div>
    </Head>
  );
};
const Head = styled.header``;
