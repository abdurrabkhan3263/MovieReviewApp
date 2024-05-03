import React, { createContext, useContext } from "react";

const wishListContext = createContext({
  wishListData: [
    {
      id: "",
      movPoster: "",
      movName: "",
      isWatched: false,
    },
  ],
  addWishList: (wishListData) => {},
  deleteWishList: (id, wishListData) => {},
  isWatch: (id, wishListData) => {},
});

const ContextProvider = wishListContext.Provider;

const useWishCont = () => useContext(wishListContext);

export { useWishCont, ContextProvider };
