import React, {useState,useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';
import db from '../../services/db'
import { token } from '../../services/token';
import './SpecificMovie.scss'
import NavBar from './../../components/NavBar/NavBar';

export default function SpecificMovie() {

    const [data, setData] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        db.get(`movies/${id}`, {headers: {
          "Authorization": `Bearer ${token}`
          }})
        .then(response => setData(response.data));
    }, [id]);

    console.log(data)

    return (
        <div id="movie">
            <NavBar />

            <div id="movie-area">
                <h2>{data.title}</h2>
            </div>
            
        </div>
    )
}
