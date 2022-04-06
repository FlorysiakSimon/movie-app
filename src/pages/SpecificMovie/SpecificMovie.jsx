import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { getMovie, getMovieCredits, getMovieVideos } from '../../services/db';
import './SpecificMovie.scss'
import NavBar from './../../components/NavBar/NavBar';
import MovieHeader from '../../components/MovieHeader/MovieHeader';
import MovieCasting from '../../components/MovieCasting/MovieCasting';

export default function SpecificMovie() {
    // In first place i need to check if the JWT is inside the localStorage
    const userInfos = localStorage.getItem("userInfos");
    const [token,setToken] = useState(JSON.parse(userInfos).token)
    if(token === undefined){
        localStorage.removeItem("userInfos");
        setToken('')
        window.location.href = "/";
    }

    //data states
    const [movie, setMovie] = useState([]);
    const [credits,setCredits] = useState([]);
    const [videos,setVideos] = useState([]);
    
    const {id} = useParams();
    

    useEffect(() => {
        const fetchMovie = async () => {
            const request = await getMovie(id,token);
            if (!request) return console.log('data error');
            setMovie(request);
          };
          fetchMovie();
    }, [id,token]);

    useEffect(() => {
        const fetchCasting = async () => {
            const request = await getMovieCredits(id,token);
            if (!request) return console.log('data error');
            setCredits(request);
          };
          fetchCasting();
    }, [id,token]);

    useEffect(() => {
        const fetchVideos = async () => {
            const request = await getMovieVideos(id,token);
            if (!request) return console.log('data error');
            const filteredVideos = request.results?.filter(video=> video.type === "Trailer");
            setVideos(filteredVideos[0]);
          };
          fetchVideos();
    }, [id,token]);
    
    //console.log(credits)
    // console.log(movie)
    console.log(videos)
    return (
        <div id="movie">

            <NavBar />

            <div id='movieInfos'>
                <MovieHeader data={movie} videos={videos} />
                <MovieCasting data={credits} />
            </div>
            
        </div>
    )
}
