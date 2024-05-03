import React, { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useWishCont } from "../context/wishlistContext";
import useGetYear from "../Hooks/useGetYear";

function Wishlist() {
  const { wishListData, deleteWishList, setisSearch, isWatch, setNavSlider } =
    useWishCont();
  const [locData, setLocData] = useState([]);
  useEffect(() => {
    setLocData(wishListData);
  }, [wishListData, locData]);

  function clickHandler(id) {
    deleteWishList(id);
  }

  useEffect(() => {
    setisSearch(false);
    setNavSlider(false);
  }, []);

  function isWatchHandler(id, isWatched) {
    isWatch(id, !isWatched);
  }

  return (
    <div className="px-2 mt-[135px]">
      <div className="text-white text-3xl font-bold bg-red-500 text-center py-3 rounded-t-md">
        Wishlist
      </div>
      <div className="bg-white flex flex-col gap-4 sm:px-4 sm:py-4 px-2 py-2">
        <div
          className={`w-full text-center font-bold text-xl ${
            locData.length !== 0 ? "hidden" : "block"
          }`}
        >
          No WishList Available
        </div>
        {locData &&
          locData.map((value) => {
            return (
              <div
                className="w-full flex items-center justify-between sm:px-4 sm:py-4 pt-2 bg-slate-400 rounded-lg relative flex-col sm:flex-row"
                key={value.id}
              >
                <div className="sm:w-[8%] w-[50%] relative overflow-hidden rounded-md">
                  <div
                    className={`bg-red-600 ${
                      !value.isWatched ? "bg-opacity-0" : "bg-opacity-60"
                    } absolute w-full h-full flex items-center justify-center font-semibold text-xl select-none duration-100`}
                    onClick={() => isWatchHandler(value.id, value.isWatched)}
                  >
                    <p
                      className={`text-white duration-100 ${
                        !value.isWatched ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      Watched
                    </p>
                  </div>
                  <img src={value.movPoster} alt="poster" />
                </div>
                <div className="sm:w-[85%] w-full sm:px-0 px-2">
                  <h1
                    className={`font-bold sm:text-2xl text-xl text-left ${
                      !value.isWatched ? "no-underline" : "line-through"
                    }`}
                  >
                    {`${value.movName} ( ${useGetYear(value.year)} )`}
                  </h1>
                  <p className="sm:text-xl font-normal">{value.overview}</p>
                </div>
                <div
                  className="text-2xl cursor-pointer w-fit sm:pb-0 py-2 "
                  onClick={() => clickHandler(value.id)}
                >
                  <RxCrossCircled />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Wishlist;
