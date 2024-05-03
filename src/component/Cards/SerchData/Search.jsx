import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSerApiCall from "../../../Hooks/useSerApiCall";
import Card from "../Card";
import { useWishCont } from "../../../context/wishlistContext";
import { Spinner } from "../../Assets/index";
import Select from "../../Select";

function Search() {
  const { value, genres } = useParams();
  const data = useSerApiCall(value, genres);
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState({ message: "", occurred: false });
  const { setisSearch, setSelect } = useWishCont();
  const [select, setSelectForSorting] = useState(true);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setSelect({
      type: null,
      sec: null,
      label: "Select Genres",
      optionData: [
        { selectValue: "Select Rating" },
        { selectValue: "Top Rated" },
        { selectValue: "Low Rated" },
      ],
    });
  }, []);

  useEffect(() => {
    if (select) {
      setLoader(true);
      try {
        setApiData(data && data);
      } catch (errors) {
        setError({ message: errors.message, occurred: true });
      }
      setLoader(false);
    }
  }, [data, genres, select]);

  useEffect(() => {
    setisSearch(false);
  }, [value, genres]);

  const callingSelect = async (value) => {
    if (value === "Select Rating") {
      setSelectForSorting(true);
    } else {
      setSelectForSorting(false);
      let newData = [...apiData];
      if (value === "Top Rated") {
        newData.sort((a, b) => b.vote_average - a.vote_average);
      } else if (value === "Low Rated") {
        newData.sort((a, b) => a.vote_average - b.vote_average);
      }
      setApiData(newData);
    }
  };

  return (
    <div className="sm:mt-[140px] mt-[114px]">
      <div className="w-full flex justify-end pb-5 text-white sm:mt-[90px] mt-5">
        <Select onChange={(e) => callingSelect(e.target.value)} />
      </div>
      {error.occurred ? (
        <div className="w-full text-center text-red-500 text-bold text-2xl">
          {error.message}
        </div>
      ) : loader ? (
        <div className="flex justify-center w-full items-center flex-wrap h-44 text-white">
          <img src={Spinner} alt="spinner" className="w-[18%] sm:w-[5%]" />
        </div>
      ) : (
        <div className="flex flex-wrap justify-evenly gap-y-6 pb-4">
          {apiData && apiData.length <= 0 ? (
            <div className="text-red-600 text-4xl">
              <h1 className="font-extrabold">{value}:- is Not Found</h1>
            </div>
          ) : (
            apiData &&
            apiData.map((value) => (
              <div
                className="sm:w-[13%] w-[45%] bg-green-600 rounded-md overflow-hidden relative"
                key={value.id}
              >
                <Card data={value} isLink={true} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
