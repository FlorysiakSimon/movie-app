import React,{useState} from 'react'
import './MovieHeader.scss'
import { Modal } from 'r-modal-sf';

export default function MovieHeader({data,videos}) {

    //MODAL
    const [modalOpen, setModalOpen] = useState(false);
    
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

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
            background: 'rgba(49, 49, 49, 0.8)',
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
            maxWidth: '1000px',
            minHeight:'500px',
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

    //Convert numbers into hours
    function NumToTime(num) { 
        var hours = Math.floor(num / 60);  
        var minutes = num % 60;
        if (minutes + ''.length < 2) {
          minutes = '0' + minutes; 
        }
        return hours + "h " + minutes;
    }
      
    //custom bg style
    const divStyle = {
        backgroundPosition: 'right 0 top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`,
        minHeight:'280px'
    }

    
    
    return (
    <>
        <div className='specific'>
            <div className="specificMovie" style={divStyle}>
                <div className='custombg'>
                    <div className='specificMovieInfo'>
                        
                        {data.poster_path === null 
                        ? <img src="/images/placeholder.jpg" alt={data.title}/> 
                        : <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt={data.title}/>}

                        <button className='specificMovieWatchList addtowatch'>+</button>
                        <div className='specificMovieInfoDetails'>
                            <h2>{data.title}</h2>
                            <p>{data.release_date} <span>&#183;</span> {
                                data.genres?.map((genres,index) => {
                                        return  <span className='' key={index}>{genres.name} </span>
                                    })
                                }<span>&#183;</span> {NumToTime(data.runtime) }
                                <span className='specificMovieInfoDetailsTrailer' onClick={toggleModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                        <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"/></svg>
                                         Play trailer
                                </span>
                            </p>
                            <p className='specificMovieInfoDetailsTagline'>{data.tagline}</p>
                            <h3>Synopsys</h3>
                            <p>{data.overview}</p>

                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        <Modal
        content={<iframe 
            width="800"
            height="600"
            src={`https://www.youtube.com/embed/${videos.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
            </iframe>}
        modalOpen={modalOpen}
        modalClose={toggleModal}
        buttonContent="X"
        style={customStyle}
        />
    </>
  )
}
