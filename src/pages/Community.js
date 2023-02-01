import React from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { CommunityList } from "../components/CommunityList";

export const Community = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-2">
      <div className="row justify-content-left align-items-center">
        <div className="col-auto" role="button">
          <ArrowLeft
            size={30}
            onClick={() => navigate(-1)}
            className="icon-primary"
          />
        </div>
        <h3 className="col-auto text-primary">Community</h3>
      </div>
      <hr />
      <CommunityList pageType="full" />
    </div>
  );
};
