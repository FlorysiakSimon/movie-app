import React, {useEffect,useState} from 'react'
import './SpotLight.scss'
import db from '../../services/db'
import { token } from '../../services/token';
import { Link } from 'react-router-dom';


export default function SpotLight() {

    const [spotLight, setspotLight] = useState([]); 

    useEffect(() => {
          db.get("movies/popular/1", {headers: {
            "Authorization": `Bearer ${token}`
            }})
          .then(response => setspotLight(response.data.results[1]));
    }, []);

    console.log(spotLight)
    return (
        <div className='spotLight'>
            <img src={`https://image.tmdb.org/t/p/original/${spotLight.poster_path}`} alt={spotLight.title} />
            <h3>{spotLight.title}</h3>
            <Link to={`/movies/${spotLight.id}`}>
                <button>Watch Now</button>
            </Link>
        </div>
    )
}
