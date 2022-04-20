import React, {useState} from 'react'
import { postMovieComments,deleteMovieComment } from '../../services/db';
import db from '../../services/db';
import { toast } from 'react-toastify';
import './MovieComments.scss'
import { Modal } from 'r-modal-sf';

/** Display comments section for a movie
 * @param  {array} data
 * @param  {number} id
 */
export default function MovieComments({data,id}) {
    
    const [comment, setComment] = useState('');
    const [getAvatar,setGetAvatar] = useState()
    
    //modal
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

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
    
    const customStyle = {
        modal:{
            width: '100vw',
            height: '100vh',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            position: 'fixed',
        },
        overlay:{
            width: '100vw',
            height: '100vh',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            position: 'fixed',
            background: 'rgba(49, 49, 49, 0.2)',
        },
        content:{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            lineHeight: '1.4',
            background: '#f1f1f1',
            padding: '14px 28px',
            borderRadius: '3px',
            maxWidth: '400px',
            minWidth: '300px',
        },
        close:{
            position: 'absolute',
            top: '0px',
            right: '-5px',
            padding: '5px 17px',
            size:'14px',
            border:'none',
            background: 'transparent',
        }
    }
        
     
    
    
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
                                        <svg onClick={()=>{setModalOpen(!modalOpen)}}
                                        viewBox="0 0 320 512">
                                        <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" fill="red"/></svg>
                                        : undefined}

                                    </div>
                                    <p className='commentsSectionComment'>{comment.comment}</p>
                                </div>

                                <Modal
                                content={<>
                                    <h2 className='title'>Delete comment</h2>
                                        <p className='confirmation-message'>
                                        Are you sure you want to delete this comment? This will remove the
                                        comment and can't be undone.
                                        </p>
                                    <div className='btn-container'>
                                        <button className='cancel-btn' onClick={()=>{setModalOpen(!modalOpen)}}>
                                            No, cancel
                                        </button>
                                        <button className='delete-btn'
                                            onClick={() => {
                                                        deleteMovieComment(user_id,comment._id,token);
                                                        setModalOpen(!modalOpen);
                                                        toast.success("Comment deleted !");
                                                        setTimeout(function(){ window.location.reload()}, 1500)
                                                        }} >
                                            Yes, delete
                                        </button>
                                    </div>
                                </>}
                                modalOpen={modalOpen}
                                modalClose={toggleModal}
                                buttonContent="X"
                                style={customStyle}
                                />
                            </div>
                            
                })}
                
            </div>
            
        </>
  )
}
