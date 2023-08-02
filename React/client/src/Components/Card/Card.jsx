import { useState, useEffect } from "react";
import { Figure } from "./Card.styled";
import { toast } from "react-toastify";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import {FaRegCommentDots} from "react-icons/fa";
import Modal from "../Modal/Modal";

import defaultImage from "@/assets/IMG/No_IMG.png";
import loadingImage from "@/assets/IMG/second.gif";
import { genre_ID_Object } from "./genre_ID";

import "./card.style.css";

function Card({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState({});

  const [showModal, setShowModal] = useState(false);

  const genreLookup = genre_ID_Object.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});

  const genreNames = (movie.genre_ids || [])
    .map((id) => genreLookup[id])
    .join(", ");

  const token = localStorage.getItem("user");
  const host = import.meta.env.VITE_HOST;
  const url = `${host}/user/favorite`;

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (Object.keys(movie).length === 0) {
      console.log("Empty movie object, aborting request...");
      return;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        movie,
      }),
    });

    const data = await response.json();
    if (data.message === "Movie added to favorites") {
      toast.success("Movie added to favorites");
      setIsFavorite(true);
    }
  };

  const handleRemoveFavorite = async (e) => {
    e.preventDefault();
    if (Object.keys(movie).length === 0) {
      console.log("Empty movie object, aborting request...");
      return;
    }

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        movie,
      }),
    });

    const data = await response.json();

    if (data.message === "Movie removed from favorites") {
      toast.success("Movie removed from favorites");
      setIsFavorite(false);
    }
  };

  const checkFavorite = async () => {
    if (movie.Error === "Movie not found!") {
      toast.error("Movie not found");
      return;
    }

    const response = await fetch(`${url}/${movie.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.message === "Movie is already in favorites") {
      setIsFavorite(true);
    } else if (data.message === "Movie is not in favorites") {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    if (token === null) {
      setUser(false);
    } else {
      setUser(true);
      checkFavorite();
    }
  }, [movie]);

  return (
    <>
      {movie.length === 0 ? (
        <div className="indexLoadingWrapper">
          <img
            src={loadingImage}
            alt="loading animation"
            className="beforeLoad"
          />
        </div>
      ) : movie && !movie.Error ? (
        <div className="cardWrapper">
          {user ? (
            <>
              <button
                className="card_icon"
                onClick={isFavorite ? handleRemoveFavorite : handleFavorite}
              >
                {isFavorite ? (
                  <MdOutlineFavorite />
                ) : (
                  <MdOutlineFavoriteBorder />
                )}
              </button>

            

            </>
          ) : null}
          <Figure>
            <img
              onClick={() => setShowModal(true)}
              className="cardL"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                  : defaultImage
              }
              alt={movie.Title}
            />
            <figcaption>
              <h3 className="font-bold">Info</h3>
              <p>
                <span className="font-extrabold">Year:</span>{" "}
                {movie.release_date}
              </p>
              <p>
                <span className="font-extrabold">IMBd rating:</span>{" "}
                {movie.vote_average}
              </p>
              <p>
                <span className="font-extrabold">Genre:</span>{" "}
                {genreNames || "Not available"}
              </p>
            </figcaption>
            {showModal && (
              <Modal
                movie={movie}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            )}
          </Figure>
        </div>
      ) : null}
    </>
  );
}

export default Card;
