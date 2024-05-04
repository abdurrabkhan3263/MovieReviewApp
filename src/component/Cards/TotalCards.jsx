import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "./Card";
import { Spinner } from "../Assets";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "../Select";
import { useWishCont } from "../../context/wishlistContext";
import "./style.css";

function TotalCards({ movieType, selectData }) {
  const [movieData, setMovieData] = useState([]);
  const [error, setError] = useState({ message: "", occurred: false });
  const [delay, setDelay] = useState(0);
  const [loadMore, setLoadMore] = useState(true);
  const [userSelectData, setUserSelectData] = useState("");
  const [toSelect, setToSelect] = useState(false);
  const [page, setPage] = useState(1);
  let baseUrl = "https://api.themoviedb.org/3/";
  let apiKey = "?api_key=d200b667c03f27a9799e244340744b29";

  useEffect(() => {
    if (toSelect) {
      setMovieData([]);
      fetchMoreData();
    }
  }, [userSelectData, toSelect]);

  const urls = useMemo(() => {
    console.log("Select:- ", toSelect);
    return `${baseUrl}${toSelect ? "discover/" : ""}${movieType.type}${
      toSelect ? "" : movieType.gen
    }${apiKey}${toSelect ? `&with_genres=${userSelectData}` : ""}&page=`;
  }, [toSelect, movieType, userSelectData]);

  const fetchMoreData = useCallback(async () => {
    try {
      let response = await fetch(`${urls}${page}`);
      let responseData = await response.json();
      console.log(urls);
      setTimeout(() => {
        if (responseData.results <= 0) {
          return setLoadMore(false);
        }
        setMovieData((prev) => [...prev, ...responseData.results]);
        setPage(page + 1);
      }, delay);
    } catch (error) {
      setError({ message: error.message, occurred: true });
    }
  }, [userSelectData, page, toSelect]);

  useEffect(() => {
    fetchMoreData();
    setDelay(1000);
  }, []);

  if (error.occurred) {
    return (
      <div className="text-2xl font-bold text-red-500 text-center">
        {error.message}
      </div>
    );
  }

  return (
    <div className="w-full">
      {movieType.gen !== "/top_rated" && (
        <Select
          data={selectData}
          className={"pb-4 pr-[3px] sm:pr-5"}
          onChange={(e) => {
            setPage(1);
            setUserSelectData(e.target.value);
            setToSelect(true);
            if (e.target.value === "Select") {
              setToSelect(false);
              setMovieData([]);
              fetchMoreData();
            }
          }}
        />
      )}

      <InfiniteScroll
        dataLength={movieData.length}
        next={fetchMoreData}
        hasMore={loadMore}
        scrollThreshold={"200px"}
        loader={
          <img
            src={Spinner}
            alt="loading......"
            className="w-[15%] sm:w-[4%]"
          />
        }
        className="flex flex-col items-center"
        endMessage={<h1 className="text-red-500 text-3xl font-bold">End</h1>}
      >
        <div className="flex flex-wrap justify-evenly sm:gap-y-6 gap-y-3 w-full overflow-y-hidden">
          {movieData &&
            movieData.map((data, index) => {
              return (
                <div
                  className={`sm:w-[13%] w-[45%] bg-green-600 rounded-md overflow-hidden relative card`}
                  key={index}
                >
                  <Card data={data} isLink={true} />
                </div>
              );
            })}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default TotalCards;
