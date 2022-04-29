import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../Rating/Rating'
import './SearchItem.scss'
import { genreFinder } from "../../services/genreFinder.js"
/** Display search item results
 * @param  {array} data
 */
export default function SearchItem({data}) {

  
  return (
    <Link to={`/movies/${data.id}`} className="popular" >
            <div className='popularCard'>
              
              {data?.poster_path === null 
               ? <img src="/images/placeholder.jpg" alt={data.title}/> 
               : <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt={data.title}/>}
            
              <div className='popularCardInfos'>
                <h3>{data.title} <span>({(new Date(data.release_date)).getFullYear()})</span></h3>
                <div className='popularCardGenres'>
                  {data?.genre_ids
                    ? genreFinder(data)
                    : data.genres.map((genre, index) => (
                        <span key={index}>{genre.name} </span>
                    ))
                  }
                </div>
                <Rating rating={data.vote_average}/>
              </div>
            </div>
    </Link>
  )
}

