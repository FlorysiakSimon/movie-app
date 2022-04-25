import React from 'react'
import './MovieRecommendations.scss'
import SearchItem from '../SearchItem/SearchItem';

/** Display movie recommendations for a specific movie
 * @param  {array} data
 */
export default function MoviesRecommendations({data}) {
  return (
    <div className='similar'>
         <h2 className='movieTitle'>Recommendations</h2>
         {data?.map((card,index)=>{
             return index <= 9 ? 
             <SearchItem data={card} key={index}/>

                : undefined
         })}
         
    </div>
  )
}
