import React,{useState} from 'react'
import './ProfilePage.scss'
import NavBar from '../../components/NavBar/NavBar'

export default function ProfilePage() {

    const [input,setInput] = useState()

    const userInfos = localStorage.getItem("userInfos");
    const token = JSON.parse(userInfos).token
    
    const author = JSON.parse(userInfos).nickname
    const author_id = JSON.parse(userInfos).user_id
    const avatar = JSON.parse(userInfos).avatar

    

    const modifyAvatar = () =>{
        
    }
    return (
        <div id="movie">
        <NavBar />
        
        <div className='profile'>
        <h2 className='movieTitle'>Profile</h2>
            <p>{author}</p>
            <img src={avatar} alt={author} />

            <form method="post" encType="multipart/form-data" action={`http://localhost:3000/users/modify-avatar/${author_id}`} onClick={modifyAvatar}>
                <input type="file" value={input} onChange={(event) => { setInput(event.target.value) }} name="image"/>
                <input type="submit" value="Submit"/>
            </form>

        </div>

        </div>
    )
}
