import React, { useState, useEffect } from 'react'
import './SearchArea.scss'
import { Link } from 'react-router-dom'
//back-end calls
import { getPopularMovies, searchMovie } from '../../services/db';
import db from '../../services/db';
//components
import SearchItem from '../SearchItem/SearchItem';


/** Display right search area on MoviePage
 */
export default function SearchArea() {
  // In first place i need to check if the JWT is inside the localStorage
  const userInfos = localStorage.getItem("userInfos");
  const [token, setToken] = useState(JSON.parse(userInfos).token)
  if (token === undefined) {
    localStorage.removeItem("userInfos");
    setToken('')
    window.location.href = "/";
  }

  //datas states
  const [search, setSearch] = useState('')
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [listData, setListData] = useState([]);

  //WATCHLIST
  useEffect(() => {
    if(window.localStorage.watchlist.length){
      let moviesId = window.localStorage.watchlist
        ? window.localStorage.watchlist.split(",")
        : [];

      for (let i = 0; i < moviesId.length; i++) {
        db.get(`movies/${moviesId[i]}`, {headers: {
          "Authorization": `Bearer ${token}`
          }})
          .then((res) => setListData((listData) => [...listData, res.data]));
      }
    }
  }, [token]);

  //POPULARMOVIE
  useEffect(() => {
    const getData = async () => {
      const request = await getPopularMovies(token);
      if (!request) return console.log('data error');
      setData(request.results);
    };
    getData();
  }, [token]);

  //SEARCHMOVIE
  useEffect(() => {
    if(search.length){
      const getSearchData = async () => {
        const request = await searchMovie(search, token);
        if (!request) return console.log('data error');
        setSearchData(request.results);
      };
      getSearchData();
    }
  }, [search, token]);

  

  return (
    <div className="search">
      <div className='searchInput'>
        <input type='text' value={search} onChange={(event) => { setSearch(event.target.value) }} placeholder='Search' />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" /></svg>
      </div>

      <h2 className='movieTitle'>{search.length ? 'Results' : 'Popular Movies'}</h2>

      {search.length ? (
        searchData.map((card, index) => {
          return index <= 4 ?

            <SearchItem data={card} key={index}/>
            
            :undefined
          }
        )

      ) : data?.map((card, index) => {
        return index <= 1 ?

          <SearchItem data={card} key={index}/>

        : undefined

      })
      }

      {!search.length 
      ? (<Link to="/popular"><button className='popularButton'>See More</button></Link>) 
      : <Link to="/discover"><button className='popularButton'>See More</button></Link>}

      {!search.length ? <h2 className='movieTitle'>Watchlist</h2> : undefined}


      {!search.length 
        
        ? listData?.map((card,index) =>  {
        return index <= 1 ?

          <SearchItem data={card} key={index}/>

        : undefined
        })

      : undefined}

      {!search.length ? !listData.length ? <h5 style={{marginLeft:"1.5em"}}>There is no movie in your watchlist</h5> :<Link to="/watchlist"><button className='popularButton'>See More</button></Link>:undefined}
    </div>
  )
}
