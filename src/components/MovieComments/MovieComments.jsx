import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { getMovieComments,postMovieComments } from '../../services/db';
import db from '../../services/db';
import { toast } from 'react-toastify';
import './MovieComments.scss'

export default function MovieComments() {
    //page params
    const {id} = useParams();
    //input state
    const [comment, setComment] = useState('');
    //input change state
    const handleInputChange = (event) => {
        setComment(event.target.value) 
    }

    // In first place i need to check if the JWT is inside the localStorage
    const userInfos = localStorage.getItem("userInfos");
    const [token,setToken] = useState(JSON.parse(userInfos).token)
    const author = JSON.parse(userInfos).nickname
    const author_id = JSON.parse(userInfos).user_id
    const avatar = JSON.parse(userInfos).avatar
    if(token === undefined){
        localStorage.removeItem("userInfos");
        setToken('')
        window.location.href = "/";
    }

    //data states
    const [data, setData] = useState([]);
    
    //get movie data
    useEffect(() => {
        const fetchComments = async () => {
            const request = await getMovieComments(id,token);
            if (!request) return console.log('data error');
            setData(request.data);
          };
          fetchComments();
    }, [id,token]);

    const newComment = () =>{
        if(comment.length < 10){
            return toast.error('Please wrise a comment longer than 10 characters.')
        }
        postMovieComments(author,author_id,comment,id,avatar,token)
        
        return toast.success("Comment posted !")
		
    }

    return (
        <>
            <h2 className='movieTitle'>Comments</h2>

                <div className="comments">
                    <textarea value={comment} onChange={handleInputChange} name="comment" cols="45" rows="8" aria-required="true" placeholder="Write a comment" required="required"></textarea>
                    <button id="new-comment-button" onClick={newComment}>New comment</button>     
                </div>
            <div>
                {data.map((comment,index)=>{
                    
                    return <div className="commentsSection" key={index}>
                                <img src={comment.avatar} alt={comment.author} />
                                <div>
                                    <div className='commentsSectionInfos'>
                                        <h4>{comment.author}</h4>
                                        <p>{comment.date.toDateString}</p>
                                    </div>
                                    <p className='commentsSectionComment'>{comment.comment}</p>
                                </div>
                            </div>

                })}
            </div>
            
        </>
  )
}
