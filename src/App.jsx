import { Outlet } from "react-router-dom";
import { Nav } from "./component/index.js";
import { ContextProvider } from "./context/wishlistContext.js";
import { useEffect, useState } from "react";
import { BiArrowFromBottom, BiArrowFromTop } from "react-icons/bi";

function App() {
  const [wishListData, setWishList] = useState([]);
  const /* Search Animation Boolean Val */ [isSearch, setIsSearch] =
      useState(true);
  const /* val add in params of section */ [section, setSection] = useState("");
  const [checkingDuplicating, setCheckingDuplicating] = useState();
  const [selectVal, setSelectVal] = useState(null);
  const [navSlider, setSlider] = useState(false);

  const setNavSlider = (value) => {
    setSlider(value);
  };

  const setSelect = (value) => {
    setSelectVal(value);
  };

  const settingSection = (val) => {
    setSection(val);
  };

  const setisSearch = (val) => {
    setIsSearch(!val);
  };

  const addWishList = (wishVal) => {
    setWishList((prev) => {
      let deplicate = prev.some((value) => value.id === wishVal.id);
      if (deplicate) {
        setCheckingDuplicating(true);
        return prev;
      }
      setCheckingDuplicating(false);
      return [{ ...wishVal }, ...prev];
    });
  };
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("wishList"));
    if (data && data.length > 0) {
      setWishList(data);
    }
    setIsSearch(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishListData || []));
  }, [wishListData]);

  const deleteWishList = (id) => {
    setWishList((prev) => prev.filter((value) => value.id !== id));
  };

  const isWatch = (id, isCondition) => {
    setWishList((prev) => {
      return prev.map((value) =>
        value.id === id ? { ...value, isWatched: isCondition } : value
      );
    });
  };

  const handleGoToTop = () => {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ContextProvider
      value={{
        wishListData,
        addWishList,
        deleteWishList,
        isWatch,
        isSearch,
        setisSearch,
        section,
        settingSection,
        checkingDuplicating,
        setSelect,
        selectVal,
        navSlider,
        setNavSlider,
      }}
    >
      <div
        className="w-[50px] h-[50px] bg-opacity-25 text-3xl text-gray-800 flex justify-center items-center bg-white backdrop-blur-lg  rounded-full fixed bottom-[10px] right-[10px] z-50 outline outline-1 outline-white"
        onClick={handleGoToTop}
      >
        <BiArrowFromBottom />
      </div>
      <div className="w-screen">
        <Nav />
      </div>
      <div className="sm:pt-24 sm:px-6 bg-black min-h-screen ">
        <Outlet />
      </div>
    </ContextProvider>
  );
}

export default App;
