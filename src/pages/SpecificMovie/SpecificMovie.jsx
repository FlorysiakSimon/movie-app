import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import db from '../../services/db'
import './SpecificMovie.scss'
import NavBar from './../../components/NavBar/NavBar';
import MovieHeader from '../../components/MovieHeader/MovieHeader';

export default function SpecificMovie() {
    // In first place i need to check if the JWT is inside the localStorage
    const userInfos = localStorage.getItem("userInfos");
    const [token,setToken] = useState(JSON.parse(userInfos).token)
    const [data, setData] = useState([]);
    if(token === undefined){

        localStorage.removeItem("userInfos");
        setToken('')
        window.location.href = "/";
    }

    const {id} = useParams();
    

    const getMovie = async (id) => {
        try {
            const res = await db.get(`movies/${id}`, {headers: {
                "Authorization": `Bearer ${token}`
                }});
            return res.data;
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        
        const getData = async () => {
            const request = await getMovie(id);
            if (!request) return alert('data error');
            setData(request);
          };
          getData();
          
    }, [id]);
    
    
    
    console.log(data)
    return (
        <div id="movie">
            <NavBar />

            <MovieHeader data={data} />
            
        </div>
    )
}
