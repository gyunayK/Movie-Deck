import { Figure, Notfound } from "./Card.styled";
import defaultImage from "@/assets/IMG/No_IMG.png";
import loadingImage from "@/assets/IMG/second.gif";

import { MdOutlineFavorite } from "react-icons/md";

function Card({ movie, handleRemoveFavorite }) {
  const posterSrc = movie.Poster !== "N/A" ? movie.Poster : defaultImage;

  return (
    <>
      {movie.length === 0 ? (
        <Figure>
          <img src={loadingImage} alt="loading animation" id="beforeLoad" />
        </Figure>
      ) : movie && movie.Title ? (
        <div className="cardFavWrapper">
          <MdOutlineFavorite
            className="card_icon"
            onClick={() => handleRemoveFavorite(movie)}
          />
          <Figure>
            <img alt={movie.Title} src={posterSrc} width="100%" height="100%" />
            <figcaption>
              <h3>Info</h3>
              <p>Year: {movie.Year}</p>
              <p>IMBd rating: {movie.imdbRating}</p>
              <p>Genre: {movie.Genre}</p>
            </figcaption>
          </Figure>
        </div>
      ) : (
        <Notfound>Movie Not Found</Notfound>
      )}
    </>
  );
}

export default Card;
