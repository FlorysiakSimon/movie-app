import React, {useEffect,useState} from 'react'
import './SpotLight.scss'
import db from '../../services/db'
import { addStorage } from '../../services/addStorage';
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

    //return loader if backgroundImage is not loaded
    if(!spotLight.poster_path){
        return <div className='spotlightLoader'></div>
    }
        
    return (
        <div className='spotLight' style={{
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${spotLight?.poster_path})`,
            minHeight:'360px'
            }}>
                
            <h3>{spotLight.title}</h3>
            <Link to={`/movies/${spotLight.id}`}>
                <button>Watch Now</button>  
            </Link>
            <button className="spotLightWatchlist addtowatch" onClick={()=>{addStorage(spotLight)}}>+</button>
        </div>
    )
}
