import { useState, useEffect } from 'react'
import Card from './Components/Card'
import Search from './Components/Search'

//import './App.css'



function App() {

const [movie, setMovie] = useState([])
const [search, setSearch] = useState('')

const apikey =  import.meta.env.VITE_MOVIE_API_KEY;
const url = `https://www.omdbapi.com/?t=${search}&plot=full&apikey=${apikey}`;

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setMovie(data);
  };


  return (
    <div className="App">
      <Search setSearch={setSearch} />
      <Card  movie={movie} />
    </div>
  )
}

export default App
