import React from 'react'
import './MovieCasting.scss'


export default function MovieCasting({data}) {
  return (
      <>
        <h2 className='castingTitle'>Casting</h2>

        <div className='casting'>
            
            {data.cast?.map((cast,index) => {
                
            return index <= 6 ?

            <div className='castingInfos' key={index}>
                <img src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`} alt={cast.name}/>
                <h4>{cast.name} </h4>
                <p>{cast.character}</p>
                </div> 
            
            : undefined
        })}
        </div>
    </>
  )
}
