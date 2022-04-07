import React from 'react'
import { Link } from 'react-router-dom';
import './MovieRecommendations.scss'

export default function MoviesRecommendations({data}) {
  return (
    <div className='similar'>
         <h2 className='movieTitle'>Recommendations</h2>
         {data?.map((card,index)=>{
             return index <= 5 ? 
                    <Link key={index} to={`/movies/${card.id}`} >
                        <div className='similarCard'>
                            <img src={`https://image.tmdb.org/t/p/w200/${card.poster_path}`} alt={card.title}/>
                            <div className='similarCardInfos'>
                                <h3>{card.title}</h3>
                                <p>{card.release_date}</p>
                            </div>
                        </div>
                    </Link> 

                : undefined
         })}
         
    </div>
  )
}
