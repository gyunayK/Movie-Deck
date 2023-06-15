import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "./Card.favorites";
import "./favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true); 
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setFavorites(data.favorites);
    setIsLoading(false); 
  };

  useEffect(() => {
    getFavorites();
  }, [deleted]);

  return (
    <>
      {!isLoading ? (
        <div className="loadingWrapper">
          <img
            src={"https://ik.imagekit.io/riviaa/Loading.gif?updatedAt=1686817878170"}
            alt="loading_Fav_animation"
            className="loading_Fav"
          />
        </div>
      ) : favorites.length === 0 ? (
        <h1 className="noFavorites">There are no favorites yet</h1>
      ) : (
        <div className="gridContainer">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="cardWrapper">
                <Card
                  movie={movie}
                  handleRemoveFavorite={handleRemoveFavorite}
                />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Favorites;
