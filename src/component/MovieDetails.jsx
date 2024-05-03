import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Cards/Card";
import useStar from "../Hooks/useStar";
import useGetYear from "../Hooks/useGetYear.js";
import { useWishCont } from "../context/wishlistContext.js";
import useCastDetails from "../Hooks/useCastDetails.js";
import { FaPlay } from "react-icons/fa";

function MovieDetails() {
  const { id, section } = useParams();
  const [data, setData] = useState([]);
  let [review, setReview] = useState();
  let [stars, setStars] = useState();
  const { setisSearch } = useWishCont();
  const [castData, setCastData] = useState([]);
  const castApiData = useCastDetails(section, id);
  const [trailerWin, setTrailerWin] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const video = useRef();

  const fetchData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${section}/${id}?api_key=d200b667c03f27a9799e244340744b29&language=en-US`
    );
    const responseData = await response.json();
    console.log(responseData);
    setData(await responseData);
  };

  const handleTrailer = () => {
    setTrailerWin(!trailerWin);
  };

  useEffect(() => {
    fetchData();
    setisSearch(false);
  }, [id]);

  useEffect(() => {
    if (!trailerWin) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [trailerWin]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const apiCalling = async () => {
      if (castApiData && castApiData.length < 0) return;
      setCastData(await castApiData);
    };
    apiCalling();
  }, [castApiData, castData]);

  useEffect(() => {
    setReview(data.length !== 0 ? data.vote_average.toFixed(2) : "");
    setStars(useStar({ review }));
  }, [data, review]);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.getAttribute("id") == null) {
        setTrailerWin(false);
      }
    });
  }, []);

  useEffect(() => {
    async function callingTrailerApi() {
      try {
        let response = await fetch(
          `https://api.themoviedb.org/3/${section}/${id}/videos?api_key=d200b667c03f27a9799e244340744b29&language=en-US`
        );
        let data = await response.json();
        if (data.results && data.results.length > 0) {
          let key = data.results.filter((value) => value.type == "Trailer");
          setTrailerKey(...(key || data.results[0].key));
        }
      } catch (error) {
        console.log(error);
      }
    }
    callingTrailerApi();
  }, [id]);

  return (
    <div className="flex justify-between min-h-[89vh] sm:pt-8 pt-[120px] relative flex-col sm:flex-row sm:items-start  items-center px-3 sm:mt-[145px]">
      <div
        className={`fixed sm:w-[50%] sm:h-[50%] w-[100%] h-[40vh] z-20 overflow-hidden right-[50%] translate-x-[50%]  sm:bottom-[50%] sm:translate-y-[50%] rounded-lg transition-all ${
          trailerWin ? "scale-100" : "scale-0"
        }`}
        id="mov-Section"
      >
        <iframe
          id="main"
          src={`https://www.youtube.com/embed/${
            trailerKey && trailerKey.key && trailerKey.key
          }?si=mCjUbqlFZ2EDKA2S`}
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
          className="w-full h-full"
          ref={video}
        ></iframe>
      </div>
      <div className="w-full sm:w-[20%] flex justify-start items-center">
        <div className="sm:h-fit sm:w-[100%] w-[65%] h-fit bg-green-600 rounded-md overflow-hidden relative mb-4 ">
          <Card data={data} isLink={true} />
        </div>
      </div>
      <div className="sm:w-[70%] w-full flex flex-col items-center">
        <div className="bg-white w-full text-center sm:text-4xl text-2xl py-3 rounded-md font-bold">
          {`${data.title || data.name} ( ${useGetYear(
            data.release_date || data.first_air_date
          )} )`}
        </div>
        <div className="pt-6 flex gap-5 justify-start w-full flex-wrap">
          {data &&
            data.genres &&
            data.genres.map((value) => {
              return (
                <div
                  className="text-white bg-red-600 text-xl font-semibold py-1 sm:px-6 px-3 rounded-md"
                  key={value.id}
                >
                  {value.name}
                </div>
              );
            })}
        </div>
        <div className="flex justify-between pt-6 items-center flex-wrap gap-y-2 sm:flex-nowrap">
          <div className="flex gap-2 items-center py-2">
            <div className="sm:w-[25%] w-[30%]">
              <img src={stars} alt="stars" />
            </div>
            <div className="h-[60px] w-[60px] bg-white rounded-full flex items-center justify-center">
              <p className="text-black font-semibold sm:text-2xl text-xl">
                {review}
              </p>
            </div>
            <div
              className="text-white bg-red-600 py-2 px-3 text-nowrap rounded-md font-medium ml-2 flex items-center gap-2 cursor-pointer text-[18px] select-none"
              onClick={handleTrailer}
              id="button"
            >
              Watch Trailer <FaPlay />
            </div>
          </div>
          <div>
            <div className="text-white bg-red-600 text-xl font-semibold w-max py-1 px-4 rounded-md">
              <p>{data.release_date || data.first_air_date}</p>
            </div>
          </div>
        </div>
        <div className="text-white text-xl sm:text-2xl pt-4 font-medium">
          <p>{data.overview}</p>
        </div>
        <div className="w-full">
          <h3 className="text-white text-4xl font-semibold py-3">Casts</h3>
          <div className="flex sm:gap-4 overflow-x-auto w-full flex-wrap pb-2 justify-between sm:justify-start gap-y-3">
            {castData &&
              castData.cast &&
              castData.cast.slice(0, 9).map((value) => {
                return (
                  <div
                    className=" text-black bg-white flex flex-col sm:w-[155px] w-[110px] max-h-[350px] overflow-hidden rounded "
                    key={value.id}
                  >
                    <div>
                      <img
                        src={
                          value.profile_path
                            ? `https://media.themoviedb.org/t/p/w220_and_h330_face${value.profile_path}`
                            : "https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg"
                        }
                        alt="cast_image"
                        className="w-full object-cover"
                      />
                    </div>
                    <div className="px-2 pb-6 bg-white">
                      <h3 className="font-bold text-[18px]">{value.name}</h3>
                      <p className="font-normal text-[14px]">
                        {value.character || "...."}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
