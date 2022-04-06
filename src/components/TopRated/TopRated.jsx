import React, {useEffect,useState} from 'react'
import './TopRated.scss'
import db from '../../services/db'
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';


export default function TopRated() {
    // In first place i need to check if the JWT is inside the localStorage
    const userInfos = localStorage.getItem("userInfos");
    const [token,setToken] = useState(JSON.parse(userInfos).token)
    
    const [topRated, settopRated] = useState([]); 

    useEffect(() => {
          db.get("movies/top-rated/1", {headers: {
            "Authorization": `Bearer ${token}`
            }})
          .then(response => settopRated(response.data.results))
          .catch(e=>setToken(''));
    }, [token]);

  return (
    <>
        <h2>Top Rated Movies</h2>

        <div className='topRated'>
            <Splide options={ {
                perPage: 3,
                pagination:false,
                rewind : true,
                gap    : '1rem',
            }}>

                {topRated.map((movie,index) => {
                    return  <SplideSlide key={index}>
                                <div className="topRatedCard" >
                                    <Link to={`/movies/${movie.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.title} />
                                        <h3>{movie.title}</h3>
                                    </Link>
                                </div>
                            </SplideSlide>
                })}
                
            </Splide>
        </div>
    </>
  )
}
