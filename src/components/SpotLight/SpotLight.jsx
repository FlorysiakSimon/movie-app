import React, {useEffect,useState} from 'react'
import './SpotLight.scss'
import db from '../../services/db'

import { Link } from 'react-router-dom';


export default function SpotLight() {

    // In first place i need to check if the JWT is inside the localStorage
    const userInfos = localStorage.getItem("userInfos");
    const [token,setToken] = useState(JSON.parse(userInfos).token)
    const [spotLight, setspotLight] = useState([]); 

    useEffect(() => {
          db.get("movies/popular/1", {headers: {
            "Authorization": `Bearer ${token}`
            }})
          .then(response => setspotLight(response.data.results[0]))
          .catch(e=>setToken(''));
    }, [token]);

    return (
        <div className='spotLight' style={{
            backgroundPosition: 'right 0 top -300px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${spotLight.poster_path})`,
            minHeight:'280px'
            }}>
            {/* <img src={`https://image.tmdb.org/t/p/original/${spotLight.poster_path}`} alt={spotLight.title} /> */}
            <h3>{spotLight.title}</h3>
            <Link to={`/movies/${spotLight.id}`}>
                <button>Watch Now</button>  
            </Link>
            <button className="spotLightWatchlist addtowatch">+</button>
        </div>
    )
}
