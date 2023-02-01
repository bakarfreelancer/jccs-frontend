import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PullToRefresh from "react-simple-pull-to-refresh";
import styled from "styled-components";
import { communityUrl, rootUrl } from "../api";
import { Loading } from "../components/Loading";
import {
  setCommunity,
  updatePage,
  setLastPage,
  resetCommunityState,
} from "../features/community/communitySlice";
import userAvatar from "../images/user.png";

export const CommunityList = ({ pageType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state?.currentUser);
  const token = currentUser?.token;
  const { community, page, lastPage } = useSelector(
    (state) => state?.community
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const [community, setCommunity] = useState([]);
  // const [page, setPage] = useState(0);
  // const [lastPage, setLastPage] = useState(false);

  const grid = {
    side: {
      avatar: "col-6 col-lg-4 avatar",
      name: "col-6 col-lg-8",
    },
    full: {
      avatar: "col-2 col-lg-1 avatar",
      name: "col-10 col-lg-11",
    },
  };

  const fetchCommunity = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.get(`${communityUrl()}/${page + 1}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setCommunity(response.data));
      if (!response.data.length) dispatch(setLastPage(true));
    } catch (e) {
      setError("Unable to get community members, Try again!");
    }
    setLoading(false);
  };

  // * Handle pull to refresh function

  const handleRefresh = async () => {
    // setPage(0);
    // setCommunity([]);
    dispatch(resetCommunityState());
    // fetchCommunity();
  };

  useEffect(() => {
    if (page === -1) {
      fetchCommunity();
      dispatch(updatePage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadMore = () => {
    fetchCommunity();
    dispatch(updatePage());
  };

  if (!token) return <div>Please login.</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (loading && !page) return <Loading size={5} />;
  return (
    <CommunityListWraper>
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="py-2">
          {community.map((member, i) => {
            return (
              <div
                key={i}
                className="row align-items-center border-bottom"
                role="button"
                onClick={() => navigate(`/user/${member._id}`)}>
                <div className={grid[pageType].avatar + " text-center"}>
                  <img
                    className="rounded-circle p-2"
                    src={member.image ? rootUrl() + member.image : userAvatar}
                    alt={member.firstName}
                  />
                </div>
                <div className={grid[pageType].name}>
                  {member.firstName} {member.lastName}
                </div>
              </div>
            );
          })}
        </div>
        {loading && page && <Loading size={3} />}
        <div className="text-center p-2">
          {lastPage ? (
            <div className="fs-4">That's it, no more community members.</div>
          ) : (
            <button
              onClick={() => loadMore()}
              className="btn btn-primary btn-accent">
              Load more...
            </button>
          )}
        </div>
      </PullToRefresh>
    </CommunityListWraper>
  );
};
const CommunityListWraper = styled.div`
  /* 
  *Sidebar Community
    */
  .col-6.col-lg-4.avatar {
    img {
      width: 65px;
      height: 65px;
      object-fit: cover;
    }
  }

  /* 
  *Full page communtiy
   */
  .col-2.col-lg-1.avatar {
    img {
      width: 85px;
      height: 85px;
      object-fit: cover;
    }
  }
`;
