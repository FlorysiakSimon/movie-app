import React,{useEffect,useState} from 'react'
import NavBar from '../../components/NavBar/NavBar'
import './ListPage.scss'
import db from '../../services/db'
import { useParams } from 'react-router-dom'
import MovieItem from '../../components/MovieItem/MovieItem'

export default function ListPage() {

    // In first place i need to check if the JWT is inside the localStorage
    const userInfos = localStorage.getItem("userInfos");
    const [token,setToken] = useState(JSON.parse(userInfos).token)
    if(token === undefined){
        localStorage.removeItem("userInfos");
        setToken('')
        window.location.href = "/";
    }

    //page params 
    const {name} = useParams()
    const {page} = useParams()

    //data state
    const[data,setDate] = useState([])

    useEffect(() => {
        db.get(`movies/${name}/${page}`, {headers: {
            "Authorization": `Bearer ${token}`
            }})
          .then(response => setDate(response.data))
          .catch(e=>setToken(''));
    }, [name,page,token]);

    console.log(data.results)
    return (
        <div id="movie">
            <NavBar />

            <div className='movieList'>
                <MovieItem data={data.results} />
            </div>
            
        </div>
    )
}
