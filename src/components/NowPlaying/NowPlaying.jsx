import React, {useEffect,useState} from 'react'
import './NowPlaying.scss'
import db from '../../services/db'
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

export default function NowPlaying() {
    // In first place i need to check if the JWT is inside the localStorage
    const userInfos = localStorage.getItem("userInfos");
    const [token,setToken] = useState(JSON.parse(userInfos).token)
    
    const [nowPlaying, setnowPlaying] = useState([]); 
    

    useEffect(() => {
          db.get("movies/now-playing/1", {headers: {
            "Authorization": `Bearer ${token}`
            }})
          .then(response => setnowPlaying(response.data.results))
          .catch(e=>setToken(''));
    }, [token]);

    
    return (
    <>
    
    <h2>Now Playing</h2>
    <div className='nowPlaying'>
        <Splide options={ {
            perPage: 5,
            pagination:false,
            rewind : true,
            gap    : '1rem',
        }}>

            {nowPlaying.map((movie,index) => {
                return  <SplideSlide key={index}>
                            <div className="nowPlayingCard" >
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                            <Link to={`/movies/${movie.id}`}><button>Watch Now</button></Link>
                            </div>
                        </SplideSlide>
            })}

        </Splide>
    </div>
    </>
  )
}
