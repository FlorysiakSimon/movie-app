import React from 'react'

export default function MovieHeader({data}) {

    function NumToTime(num) { 
        var hours = Math.floor(num / 60);  
        var minutes = num % 60;
        if (minutes + ''.length < 2) {
          minutes = '0' + minutes; 
        }
        return hours + "h " + minutes;
    }
      

    const divStyle = {
        backgroundPosition: 'right 0 top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
        minHeight:'280px'
    }

    return (
        <div className='specific'>
            <div className="specificMovie" style={divStyle}>
                <div className='custombg'>
                    <div className='specificMovieInfo'>
                        <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt={data.title} />
                        <div className='specificMovieInfoDetails'>
                            <h2>{data.title}</h2>
                            <p>{data.release_date} <span>&#183;</span> {
                                data.genres?.map((genres,index) => {
                                        return  <span className='' key={index}>{genres.name} </span>
                                    })
                                }<span>&#183;</span> {NumToTime(data.runtime)}</p>
                            <p>{data.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
