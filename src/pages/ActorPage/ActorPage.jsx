import React,{useEffect,useState} from 'react'
import './ActorPage.scss'
import { actorInfos,actorInfosMovies } from '../../services/db'
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import ActorHeader from '../../components/ActorHeader/ActorHeader';
import ActorMovies from '../../components/ActorMovies/ActorMovies';

export default function ActorPage() {

    // In first place i need to check if the JWT is inside the localStorage
    const userInfos = localStorage.getItem("userInfos");
    const [token,setToken] = useState(JSON.parse(userInfos).token)
    if(token === undefined){
        localStorage.removeItem("userInfos");
        setToken('')
        window.location.href = "/";
    }
   

    const [data,setData] = useState([])
    const [movies,setMovies] = useState([])

    const {id} = useParams()

    useEffect(()=>{
        const fetchActorInfos = async () => {
            const request = await actorInfos(id,token);
            if (!request) return console.log('data error');
            setData(request);
        };
        const fetchActorInfosMovies = async () => {
            const request = await actorInfosMovies(id,token);
            if (!request) return console.log('data error');
            setMovies(request);
        };
        fetchActorInfos()
        fetchActorInfosMovies()
    },[id,token])


  return (
    <div id="movie">
       
            <NavBar />

            <div id="movieInfos">
                <ActorHeader data={data} />
                <ActorMovies movies={movies} />
            </div>

        </div> 
  )
}
