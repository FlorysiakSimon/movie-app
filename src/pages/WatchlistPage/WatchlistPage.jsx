import React,{useState,useEffect} from 'react'
import db from '../../services/db';
import NavBar from '../../components/NavBar/NavBar';
import MovieItem from '../../components/MovieItem/MovieItem';

export default function WatchlistPage() {

    // In first place i need to check if the JWT is inside the localStorage
    const userInfos = localStorage.getItem("userInfos");
    const [token, setToken] = useState(JSON.parse(userInfos).token)
    if (token === undefined) {
        localStorage.removeItem("userInfos");
        setToken('')
        window.location.href = "/";
    }

    //data state
    const [listData, setListData] = useState([]);

    //WATCHLIST
    useEffect(() => {
        let moviesId = window.localStorage.watchlist
        ? window.localStorage.watchlist.split(",")
        : [];

        for (let i = 0; i < moviesId.length; i++) {
        db.get(`movies/${moviesId[i]}`, {headers: {
            "Authorization": `Bearer ${token}`
            }})
            .then((res) => setListData((listData) => [...listData, res.data]));
        }
    }, [token]);


    return (
        <div id="movie">
        <NavBar />

        <div className='movieList'>
            <MovieItem data={listData} />

            

        </div>
        
    </div>
    )
}
