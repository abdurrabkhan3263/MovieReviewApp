import React, { useEffect } from "react";
import TotalCards from "./Cards/TotalCards";
import { useWishCont } from "../context/wishlistContext";
import Select from "./Select";
import { tvSelectData } from "./SelectData";
function Series() {
  const { settingSection, setSelect, setNavSlider } = useWishCont();
  useEffect(() => {
    settingSection("tv");
    setSelect({
      type: "tv",
      sec: "/on_the_air",
      label: "Select Genres",
      optionData: tvSelectData,
    });
    setNavSlider(false);
  }, []);
  return (
    <div className="min-h-full sm:mt-[145px] mt-[114px]">
      <TotalCards
        movieType={{ type: "tv", gen: "/on_the_air" }}
        selectData={tvSelectData}
      />
    </div>
  );
}

export default Series;
