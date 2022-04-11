import React from 'react'
import './MovieItem.scss'
import { Link } from 'react-router-dom'
import Rating from '../Rating/Rating'

export default function MovieItem({data}) {

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  return (
    <div className='list'>
        {data?.map((item,index)=>{
            return  <Link to={`/movies/${item.id}`} className="listItem" key={index}> 
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} />
                        <h4>{item.title}</h4>
                        <p>({(new Date(item.release_date)).getMonth()}/{(new Date(item.release_date)).getDay()}/{(new Date(item.release_date)).getFullYear()})</p>
                    </Link>

        })}
    </div>
  )
}
