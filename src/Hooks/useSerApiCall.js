import React, { useEffect } from "react";
import { useWishCont } from "../context/wishlistContext";

function useSerApiCall(val, sec) {
  const { section } = useWishCont();
  const [data, setData] = React.useState([]);

  useEffect(() => {
    if (val === "") return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/${
            section || sec || "movie"
          }?api_key=d200b667c03f27a9799e244340744b29&language=en-US&page=1&query=${
            val && val
          }`
        );
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [val, sec, section]);

  return data.results;
}

export default useSerApiCall;
