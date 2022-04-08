import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getPopularMovies,searchMovie } from '../../services/db';
import './SearchArea.scss'


export default function SearchArea() {
  // In first place i need to check if the JWT is inside the localStorage
  const userInfos = localStorage.getItem("userInfos");
  const [token,setToken] = useState(JSON.parse(userInfos).token)
  if(token === undefined){
      localStorage.removeItem("userInfos");
      setToken('')
      window.location.href = "/";
  }
  
  const [search,setSearch] = useState('')
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);


  useEffect(() => {
		const getData = async () => {
			const request = await getPopularMovies(token);
			if (!request) return console.log('data error');
			setData(request.results);
		};
		getData();
	}, [token]);
	

  useEffect(() => {
		const getSearchData = async () => {
			const request = await searchMovie(search,token);
			if (!request) return console.log('data error');
			setSearchData(request.results);
		};
		getSearchData();
	}, [search,token]);
      
  console.log(searchData)
  return (
    <div className="search">
        <div className='searchInput'>
          <input type='text' value={search} onChange={(event) =>{setSearch(event.target.value)}} placeholder='Search' />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
        </div>

        <h2 className='movieTitle'>{search.length ?'Results' : 'Popular Movies' }</h2>

        {search.length ?(
            searchData.map((card,index) =>{
              return (
                <div className="popularCard" key={index}>
                <Link to={`/movies/${card.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`} alt={card.title} />
                    <h3>{card.title}</h3>
                </Link>
              </div>
              );}
          )
        ):data?.map((card,index) => {
          return index <= 1 ? 
                <div className="popularCard" key={index}>
                  <Link to={`/movies/${card.id}`}>
                      <img src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`} alt={card.title} />
                      <h3>{card.title}</h3>
                  </Link>
                </div>
                : undefined
          })
        }
        
        {!search.length ?(<Link to="/popular"><button className='popularButton'>See More</button></Link>) : undefined }

        <h2 className='movieTitle'>Watchlists</h2>
    </div>
  )
}
