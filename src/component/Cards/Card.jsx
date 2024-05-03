import React, { useEffect, useState } from "react";
import { heart } from "../Assets/index.js";
import { useWishCont } from "../../context/wishlistContext.js";
import { NavLink } from "react-router-dom";
import useStar from "../../Hooks/useStar.js";

function Card({ data, isLink }) {
  const { addWishList, section } = useWishCont();
  const [value, setValue] = useState();
  const addWish = () => {
    addWishList({
      id: value.id,
      movPoster: `https://media.themoviedb.org/t/p/w220_and_h330_face${value.poster_path}`,
      movName: value.original_name || value.title,
      isWatched: false,
      overview: value.overview,
      year: value.release_date || value.first_air_date,
    });
  };

  useEffect(() => {
    setValue(data);
  }, [data]);

  let review = Math.round(value && value.vote_average);
  let stars = useStar({ review });
  return (
    <div>
      <div className="overflow-hidden">
        <NavLink
          to={`${isLink ? `/movDetails/${section}/${value && value.id}` : ""}`}
        >
          <img
            src={`${
              value && value.poster_path === null
                ? "https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg"
                : `https://media.themoviedb.org/t/p/w220_and_h330_face${
                    value && value.poster_path
                  }`
            }`}
            alt="moviePoster"
            className="h-full w-full object-cover cursor-pointer"
          />
        </NavLink>
      </div>
      <div
        className="absolute top-0 h-[35px] sm:h-[48px] overflow-hidden flex justify-between pl-[12px] sm:pt-2 items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      >
        <div className="h-full w-[60%] sm:w-[50%] flex items-center">
          <img src={stars} alt="stars" />
        </div>
        <div className="h-full w-[20%] flex items-center justify-end">
          <button className="h-full w-full" onClick={addWish}>
            <img
              src={heart}
              alt="wishlist"
              className="object-contain h-full w-full"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
