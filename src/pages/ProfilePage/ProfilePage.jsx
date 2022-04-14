import React,{useState,useEffect} from 'react'
import { getUserAvatar } from '../../services/db'
import db from '../../services/db'
import './ProfilePage.scss'
import NavBar from '../../components/NavBar/NavBar'

export default function ProfilePage() {

    const [file, setFile] = useState(null);
    const [userAvatar,setUserAvatar] = useState()

    const userInfos = localStorage.getItem("userInfos");
    
    const author = JSON.parse(userInfos).nickname
    const user_id = JSON.parse(userInfos).user_id

    useEffect(() => {
        const fetchAvatar = async () => {
            const request = await getUserAvatar(user_id);
            if (!request) return console.log('data error');
            setUserAvatar(request.avatar);
        };
        fetchAvatar();
    }, [user_id,userAvatar]);


    const handleSubmit = (e) => {
        e.preventDefault()
          if (file) {
            const data = new FormData();
            const fileName = `${Date.now()}${file.name}`;
            data.append("originalname", fileName);
            data.append("file", file);
            console.log(fileName)
            console.log(file)
            console.log(data)
            db.post(`users/modify-avatar/${user_id}`,{data})
            .then((res) => {
                    console.log(res)
                })
            .catch((err) => {
                    console.log(err)
                });
          }
        };
       
        
    return (
        <div id="movie">

            <NavBar />
        
            <div className='profile'>

                <h2 className='movieTitle'>Profile</h2>
                <h3 className='profileName'>{author}</h3>

                <div className='profileInfos'>
                    <h4>Modify your avatar :</h4>
                    <span>Please make sure to use only jpg, png or jpeg</span>
                </div>
                
                <div className='profileModify'>
                
                    <form onSubmit={handleSubmit} encType="multipart/form-data" >
                        <input 
                        type="file" 
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={(e) => setFile(e.target.files[0])} />
                        <input type="submit" value="Submit"/>
                    </form>

                    <div className='profileModifyAvatar'>
                        <img src={userAvatar} alt={author} />
                    </div>
                    
                    {/* <form method="post"  encType="multipart/form-data" action={`http://localhost:3000/users/modify-avatar/${user_id}`} >
                        <input type="file"  onChange={(e) => setFile(e.target.files[0])} name="image"/>
                        <input type="submit" value="Submit"/>
                    </form> */}
                </div>
                

            </div>

        </div>
    )
}
