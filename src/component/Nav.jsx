import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HiMiniBars3CenterLeft,
  HiOutlineBars3BottomRight,
} from "react-icons/hi2";
import { heart, logo } from "./Assets/index.js";
import { useWishCont } from "../context/wishlistContext.js";
import useSerApiCall from "../Hooks/useSerApiCall.js";
import { useNavigate } from "react-router-dom";

function Nav() {
  let [searchVal, setSearchVal] = useState("");
  let [data, setData] = useState([]);
  const location = useLocation();
  const apiData = useSerApiCall(searchVal, location.pathname.split("/")[2]);
  const {
    wishListData,
    isSearch,
    setisSearch,
    settingSection,
    section,
    navSlider,
    setNavSlider,
  } = useWishCont();
  const navigate = useNavigate();

  function gettingSear() {
    setisSearch(isSearch);
  }

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        settingSection("movie");
        break;
      case "/movie":
        settingSection("movie");
        break;
      case "/series":
        settingSection("tv");
        break;
      default:
        settingSection(location.pathname.split("/")[2] || "movie");
    }
  }, [location]);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiData;
        searchVal === "" ? setData([]) : setData(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [searchVal]);

  return (
    <div className="bg-black sm:py-4 sm:px-6 static sm:fixed w-full z-50 flex justify-center sm:shadow-none shadow-md ">
      <div
        className={`h-screen w-3/4 bg-gray-500 absolute ${
          navSlider && navSlider ? "left-0" : "left-[-100%]"
        } z-50  transition-all flex flex-col gap-y-4 pt-4 pl-4 duration-700`}
      >
        <NavLink
          to="/"
          className="text-4xl font-extrabold flex items-center gap-3 overflow-hidden"
        >
          <span
            className={`text-[#2D3340] duration-[1s]  relative ${
              navSlider ? "bottom-0" : "-bottom-full"
            } transition-all`}
          >
            Home
          </span>
          <span className="text-[#8F9DFF]"></span>
        </NavLink>
        <NavLink
          to="/movies"
          className="text-4xl font-extrabold flex items-center gap-3 overflow-hidden"
        >
          <span
            className={`text-[#2D3340] duration-[1s]  relative ${
              navSlider ? "bottom-0" : "-bottom-full"
            } transition-all`}
          >
            Movie
          </span>
          <span className="text-[#8F9DFF]"></span>
        </NavLink>
        <NavLink
          to="/series"
          className="text-4xl font-extrabold flex items-center gap-3 overflow-hidden"
        >
          <span
            className={`text-[#2D3340] duration-[1s]  relative ${
              navSlider ? "bottom-0" : "-bottom-full"
            } transition-all`}
          >
            Series
          </span>
          <span className="text-[#8F9DFF]"></span>
        </NavLink>
        <NavLink
          to="/wishlist"
          className="text-4xl font-extrabold flex items-center gap-3 overflow-hidden"
        >
          <span
            className={`text-[#2D3340] duration-[1s]  relative ${
              navSlider ? "bottom-0" : "-bottom-full"
            } transition-all`}
          >
            WishList
          </span>
          <span className="text-[#8F9DFF]"></span>
        </NavLink>
      </div>
      <div className="sm:hidden flex flex-col w-full items-center mb-4">
        <div>
          <NavLink to="/" className="mt-12 mb-8 flex justify-center">
            <img src={logo} alt="logo" width="85%" />
          </NavLink>
        </div>
        <form
          action="#"
          className="flex justify-center w-full relative gap-2.5 h-[40%]"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/searchData/${section}/${searchVal}`);
          }}
        >
          <input
            type="search"
            name="ser"
            id="search"
            value={searchVal}
            placeholder="Enter Your Movie Name"
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
            className=" border-[0.5px] border-black outline-none py-1.5 px-2 w-[64%] rounded-md font-medium"
          />
          <input
            type="submit"
            value="Search"
            className="bg-red-600 text-white px-5 rounded-md"
          />
        </form>
        <div className="w-full text-end mt-4 flex justify-end items-center py-1.5 pr-2 bg-gray-500">
          <button
            className="text-[28px] text-white"
            onClick={() => setNavSlider(!navSlider)}
          >
            {!navSlider ? (
              <HiMiniBars3CenterLeft />
            ) : (
              <HiOutlineBars3BottomRight />
            )}
          </button>
        </div>
      </div>
      <div className="hidden sm:flex w-full flex-col items-center">
        <div>
          <NavLink to="/" className="mt-4 mb-4 flex justify-center">
            <img src={logo} alt="logo" width="85%" />
          </NavLink>
        </div>
        <div className="flex justify-between items-center mb-9 bg-white py-2 sm:px-6 px-3 sm:rounded-full sm:w-[70%] w-full relative  ">
          <div className="h-8 w-8">
            <NavLink to="/wishlist">
              <div className="relative">
                <img src={heart} alt="moviePoster" className="h-full" />
                <h1 className="absolute top-[-6px] right-[-15px] bg-black text-white px-2 rounded-full">
                  {wishListData.length !== 0 ? wishListData.length : ""}
                </h1>
              </div>
            </NavLink>
          </div>
          <div>
            <ul
              className={`flex sm:gap-28 gap-6 ${
                isSearch ? "opacity-100" : "opacity-20"
              } transition-all`}
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-xl transition-all ${
                      isActive ? "font-bold" : "font-semibold"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/movies"
                  className={({ isActive }) =>
                    `text-xl transition-all ${
                      isActive ? "font-bold" : "font-semibold"
                    }`
                  }
                >
                  Movie
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/series"
                  className={({ isActive }) =>
                    `text-xl transition-all ${
                      isActive ? "font-bold" : "font-semibold"
                    }`
                  }
                >
                  Series
                </NavLink>
              </li>
            </ul>
          </div>
          <button className="text-2xl" onClick={gettingSear}>
            {isSearch ? (
              <HiMiniBars3CenterLeft />
            ) : (
              <HiOutlineBars3BottomRight />
            )}
          </button>
          <div
            className={`absolute right-14 ${
              isSearch ? "scale-x-0" : "scale-x-100 opacity-100"
            }  transition-all duration-500 origin-right opacity-0 w-[90%]  h-full flex items-center justify-center`}
          >
            <form
              action="#"
              className="flex sm:justify-center justify-end w-full sm:w-[80%] relative sm:gap-3 gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/searchData/${section}/${searchVal}`);
              }}
            >
              <input
                type="search"
                name="ser"
                id="search"
                value={searchVal}
                placeholder="Enter Your Movie Name"
                onChange={(e) => {
                  setSearchVal(e.target.value);
                }}
                className=" border-[0.5px] border-black outline-none py-1 px-2 w-[50%] rounded-md font-medium"
              />
              <input
                type="submit"
                value="Search"
                className="bg-red-600 text-white px-4 rounded-lg"
              />
            </form>
          </div>
          <div
            className={`bg-blue-500 sm:w-[60%] w-full overflow-auto max-h-[40vh] absolute top-full py-4 sm:px-4 px-2 z-[90] rounded-b-lg right-[50%] translate-x-[50%] flex flex-col gap-2 ${
              isSearch ? "hidden" : "flex"
            } ${
              (data && data.length === 0) ||
              (data && data.results && data.results.length === 0)
                ? "hidden"
                : "flex"
            }`}
          >
            <div className="w-full h-full flex flex-col sm:gap-4 gap-2">
              {data &&
                data.map((value) => {
                  return (
                    <NavLink
                      to={`/movDetails/${section}/${value.id}`}
                      key={value.id}
                    >
                      <div
                        className={`w-full bg-white min-h-20 overflow-hidden flex items-center justify-between py-2 px-4 rounded-md cursor-pointer`}
                      >
                        <div className="h-[80px]">
                          <img
                            src={`${
                              value.poster_path === null
                                ? "https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg"
                                : `https://media.themoviedb.org/t/p/w220_and_h330_face${value.poster_path}`
                            }`}
                            alt="poster"
                            className="h-full object-cover"
                          />
                        </div>
                        <div className="w-[50%]">
                          <h1 className="font-medium text-xl text-center">
                            {value.title || value.name || "NotAvailable"}
                          </h1>
                        </div>
                        <div>
                          <h1 className="font-medium text-xl">
                            {value.release_date ||
                              value.first_air_date ||
                              "NotAvailable"}
                          </h1>
                        </div>
                      </div>
                    </NavLink>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
