import React from 'react'
import './MovieItem.scss'
import { Link } from 'react-router-dom'


/** Display movie card for ListPage
 * @param  {array} data
 */
export default function MovieItem({data}) {

  return (
    <div className='list'>
        {data?.map((item,index)=>{
            return  <Link to={`/movies/${item.id}`} className="listItem" key={index}> 
                        {item.poster_path === null 
                        ? <img src="/images/placeholder.jpg" alt={item.title}/> 
                        : <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={data.title}/>}
                        <div>
                          <h4>{item.title}</h4>
                          <p>({(new Date(item.release_date)).getFullYear()})</p>
                        </div>
                    </Link>

        })}
    </div>
  )
}
