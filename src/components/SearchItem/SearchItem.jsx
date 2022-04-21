import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../Rating/Rating'
import './SearchItem.scss'

/** Display search item results
 * @param  {array} data
 */
export default function SearchItem({data}) {

  const genreFinder = () => {
    let genreArray = [];
    for (let i = 0; i < data.genre_ids.length; i++) {
      switch (data.genre_ids[i]) {
        case 28:
          genreArray.push(`Action`);
          break;
        case 12:
          genreArray.push(`Aventure`);
          break;
        case 16:
          genreArray.push(`Animation`);
          break;
        case 35:
          genreArray.push(`Comédie`);
          break;
        case 80:
          genreArray.push(`Policier`);
          break;
        case 99:
          genreArray.push(`Documentaire`);
          break;
        case 18:
          genreArray.push(`Drame`);
          break;
        case 10751:
          genreArray.push(`Famille`);
          break;
        case 14:
          genreArray.push(`Fantasy`);
          break;
        case 36:
          genreArray.push(`Histoire`);
          break;
        case 27:
          genreArray.push(`Horreur`);
          break;
        case 10402:
          genreArray.push(`Musique`);
          break;
        case 9648:
          genreArray.push(`Mystère`);
          break;
        case 10749:
          genreArray.push(`Romance`);
          break;
        case 878:
          genreArray.push(`Science-fiction`);
          break;
        case 10770:
          genreArray.push(`Téléfilm`);
          break;
        case 53:
          genreArray.push(`Thriller`);
          break;
        case 10752:
          genreArray.push(`Guerre`);
          break;
        case 37:
          genreArray.push(`Western`);
          break;
        default:
          break;
      }
    }
    return genreArray.map((genre) => <span key={genre}>{genre} </span>);
  };

  return (
    <Link to={`/movies/${data.id}`} className="popular" >
            <div className='popularCard'>
              {data.poster_path === null 
               ? <img src="/images/placeholder.jpg" alt={data.title}/> 
               : <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt={data.title}/>}
               
              
                
              

              <div className='popularCardInfos'>
                <h3>{data.title} <span>({(new Date(data.release_date)).getFullYear()})</span></h3>
                <div className='popularCardGenres'>
                  {data.genre_ids
                    ? genreFinder()
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
