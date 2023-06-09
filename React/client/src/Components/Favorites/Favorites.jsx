import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "./Card.favorites";
import "./favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const token = localStorage.getItem("user");
  const host = import.meta.env.VITE_HOST;

  const url = `${host}/user/favoritesList`;
  const removeFavURL = `${host}/user/favorite`;

  const handleRemoveFavorite = async (movie) => {
    const response = await fetch(removeFavURL, {
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
      setDeleted(!deleted);
    }
  };

  const getFavorites = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setFavorites(data.favorites);
  };

  useEffect(() => {
    getFavorites();
  }, [deleted]);

  return (
    <>
      {favorites && favorites.length > 0 && (
        <div className="gridContainer">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="cardWrapper">
              <Card movie={movie} handleRemoveFavorite={handleRemoveFavorite} />
            </div>
          ))}
        </div>
      )}
      {!favorites ||
        (favorites.length === 0 && (
          <div className="noFavorites">
            <h1>Your list is empty!</h1>
          </div>
        ))}
    </>
  );
}

export default Favorites;
