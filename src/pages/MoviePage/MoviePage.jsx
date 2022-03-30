import React,{useState} from 'react'
import "./MoviePage.scss"
import NavBar from '../../components/NavBar/NavBar'
import db from '../../services/db.js'
import { toast } from 'react-toastify';

export default function MoviePage() {
    

    // In first place i need to check if the JWT is inside the localStorage
    const userInfos = localStorage.getItem("userInfos");
    const [token,setToken] = useState(JSON.parse(userInfos).token)


    if(userInfos === null){
      return window.location.href = "/";
    }

    if(token === undefined){

        localStorage.removeItem("userInfos");

        window.location.href = "/";
    }
    // In second place we need to check if the JWT exist on back-end
    db.get("users/verifytoken", {headers: {
    "Authorization": `Bearer ${token}`
    }})
    .catch((error) => {
        window.location.href = "/";
        setToken('')
        return toast.error("Your session has expired, please login ! !")
    })
    
    
    return (
        <section id="root">
    
        <div id="sidebar">
            <NavBar />
        </div>
        <div id="movie-area"></div>

        </section>
    )
}
