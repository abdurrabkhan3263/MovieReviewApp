import React, { useState, useEffect } from "react";
import { useWishCont } from "../context/wishlistContext";

function useCastDetails(sec, id) {
  const [data, setData] = useState();
  useEffect(() => {}, []);
  useEffect(() => {
    const apiCall = async () => {
      let response = fetch(
        `https://api.themoviedb.org/3/${sec}/${id}/credits?api_key=d200b667c03f27a9799e244340744b29&language=en-US`
      );
      setData((await response).json());
    };
    apiCall();
  }, [id]);
  return data && data;
}

export default useCastDetails;
