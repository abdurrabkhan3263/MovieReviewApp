import React, { useState, useEffect } from "react";
import { TotalCards } from "./index";
import { useWishCont } from "../context/wishlistContext";
import { movSelectData } from "./SelectData";

function Home() {
  const { settingSection, setSelect, setNavSlider } = useWishCont();
  const [movie, setMovie] = useState("movie");
  const [sec, setSec] = useState("/now_playing");

  React.useEffect(() => {
    settingSection("movie");
    setSelect({
      type: "movie",
      sec: "/now_playing",
      label: "Select Genres",
      optionData: movSelectData,
    });
    setNavSlider(false);
  }, []);

  return (
    <div className="min-h-full sm:mt-[145px]">
      <TotalCards
        movieType={{ type: movie, gen: sec }}
        selectData={movSelectData}
      />
    </div>
  );
}

export default Home;
