import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Home, Movies, Series, Wishlist } from "./component/index.js";
import MovieDetails from "./component/MovieDetails.jsx";
import Search from "./component/Cards/SerchData/Search.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/series" element={<Series />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/movDetails/:section/:id" element={<MovieDetails />} />
      <Route path="/searchData/:genres/:value" element={<Search />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
