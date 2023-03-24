import { useState, useEffect } from 'react'
import Card from './Components/Card'
import Search from './Components/Search'

//import './App.css'

//API key: 15767414
//  https://www.omdbapi.com/?t=Babylon&plot=full&apikey=15767414

function App() {

const [movie, setMovie] = useState([])
const [search, setSearch] = useState('')

const apikey =  `15767414`

let url = `https://www.omdbapi.com/?t=${search}&plot=full&apikey=${apikey}`

const fetchData = async (url) => {
  const response = await fetch(url)
  const data = await response.json()
  setMovie(data)
}


  return (
    <div className="App">
      <Search/>
      <Card  movie={movie} />
    </div>
  )
}

export default App
