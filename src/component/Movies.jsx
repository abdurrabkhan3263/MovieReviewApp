import React, { useEffect } from "react";
import TotalCards from "./Cards/TotalCards";
import { useWishCont } from "../context/wishlistContext";
import { movSelectData } from "./SelectData";

function Movies() {
  const { settingSection, setNavSlider } = useWishCont();
  useEffect(() => {
    settingSection("movie");
    setNavSlider(false);
  }, []);
  return (
    <div className="min-h-full sm:mt-[145px]">
      <p
        className={
          "text-red-600 sm:text-2xl text-xl font-bold mb-4 ml-4 px-4 py-1 rounded-md select-none bg-white w-fit"
        }
      >
        Top Rated Movie
      </p>
      <TotalCards
        movieType={{ type: "movie", gen: "/top_rated" }}
        selectData={movSelectData}
      />
    </div>
  );
}

export default Movies;
