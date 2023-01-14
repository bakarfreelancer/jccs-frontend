import React from "react";
import styled from "styled-components";

export const Loading = ({ size }) => {
  return (
    <Loader className="d-flex justify-content-center p-5">
      <div
        className="spinner-grow text-primary"
        style={{ width: size + "rem", height: size + "rem" }}
        role="status"></div>
    </Loader>
  );
};
const Loader = styled.div``;
