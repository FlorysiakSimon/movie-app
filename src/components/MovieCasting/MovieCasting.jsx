import React from 'react'
import './MovieCasting.scss'
import { Link } from 'react-router-dom';

/** Display casting for a movie
 * @param  {array} data
 */
export default function MovieCasting({data}) {
  console.log(data)
  return (
      <>
        <h2 className='movieTitle'>Casting</h2>

        <div className='casting'>
            
            {data.cast?.map((cast,index) => {
                
            return index <= 5 ?
            <Link to={`/actor/${cast.id}`} key={index}>
              <div className='castingInfos' >
                {cast.profile_path === null 
                ? <img src="/images/placeholder.jpg" alt={cast.name}/> 
                : <img src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`} alt={cast.name}/>}
                  <h4>{cast.name} </h4>
                  <p>{cast.character}</p>
              </div> 
            </Link>
            : undefined
        })}
        </div>
    </>
  )
}
