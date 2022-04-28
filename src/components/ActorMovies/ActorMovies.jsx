import React from 'react'
import { Link } from 'react-router-dom';
import './ActorMovies.scss'

/** Display movies from a specific actor
 * @param  {array} movies
 */
export default function ActorMovies({movies}) {
  return (
      <>
    <h2 className="movieTitle">Known for</h2>
        <div className='actor'>  
          {movies.cast?.map((cast,index) => {
              return  <Link to={`/movies/${cast.id}`} key={index}>
                          <div className='actorInfos' >
                              {cast.poster_path === null 
                              ? <img src="/images/placeholder.jpg" alt={cast.name}/> 
                              : <img src={`https://image.tmdb.org/t/p/w500/${cast.poster_path}`} alt={cast.name}/>}
                              <h4>{cast.title} </h4>
                              <p>{cast.character}</p>
                          </div> 
                      </Link>
          })}
    </div>
    </>
  )
}
