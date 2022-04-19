import React, {useState} from 'react'
import { postMovieComments,deleteMovieComment } from '../../services/db';
import db from '../../services/db';
import { toast } from 'react-toastify';
import './MovieComments.scss'

export default function MovieComments({data,id}) {
    
    const [comment, setComment] = useState('');
    const [getAvatar,setGetAvatar] = useState()

    //input change state
    const handleInputChange = (event) => {
        setComment(event.target.value) 
    }

    //Get user avatar
    const getUserAvatar = (id) =>{
        db.get(`users/getAvatar/${id}`,{
            headers: {
                    'Content-Type': 'application/json',
                }
        }) 
        .then((res) => {
            setGetAvatar(res.data.avatar)
        });
        
    }

    // In first place i need to check if the JWT is inside the localStorage
    const userInfos = localStorage.getItem("userInfos");
    const [token,setToken] = useState(JSON.parse(userInfos).token)
    const author = JSON.parse(userInfos).nickname
    const user_id = JSON.parse(userInfos).user_id
    const avatar = JSON.parse(userInfos).avatar
    
    if(token === undefined){
        localStorage.removeItem("userInfos");
        setToken('')
        window.location.href = "/";
    }


    const newComment = () =>{
        if(comment.length < 10){
            return toast.error('Please wrise a comment longer than 10 characters.')
        }
        postMovieComments(author,user_id,comment,id,avatar,token)
        toast.success("Comment posted !")
        setTimeout(function(){ window.location.reload()}, 1500)

    }
    // const deleteComment = ()=>{
    //     console.log(token)
    //     deleteMovieComment(author_id,_id,token) 
    // }

// console.log(token)
     console.log(data)
    return (
        <>
            <h2 className='movieTitle'>Comments</h2>

                <div className="comments">
                    <textarea value={comment} onChange={handleInputChange} name="comment" cols="45" rows="8" aria-required="true" placeholder="Write a comment" required="required"></textarea>
                    <button id="new-comment-button" onClick={newComment}>New comment</button>     
                </div>
            <div>
                {data?.map((comment,index)=>{
                    
                    return <div className="commentsSection" key={index}>
                                {getUserAvatar(comment.author_id)}

                                <div>
                                    <img src={getAvatar} alt={comment.author} />
                                    <h4 className='commentsSectionNickname'>{comment.author}</h4>
                                </div>
                                
                                <div>
                                    <div className='commentsSectionInfos'>
                                        <h5>{comment.date}</h5>

                                        {comment.author_id === user_id ?
                                        <svg onClick={() => {
                                            deleteMovieComment(user_id,comment._id,token);
                                            toast.success("Comment deleted !");
                                            setTimeout(function(){ window.location.reload()}, 1500)
                                            }} 
                                        viewBox="0 0 320 512">
                                        <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" fill="red"/></svg>
                                        : undefined}

                                    </div>
                                    <p className='commentsSectionComment'>{comment.comment}</p>
                                </div>
                            </div>
                })}
            </div>
            
        </>
  )
}
