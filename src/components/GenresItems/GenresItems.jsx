import React,{useEffect} from 'react'
import axios from 'axios';
import './GenresItems.scss'

export default function GenresItems({genres,setGenres,selectedGenre}) {

    useEffect(() => {
        axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=ccfb5b1d68f6fc53b586ba1f720f736e&language=en-US`
        )
        .then((response)=>setGenres(response.data.genres))
        .catch((e)=>console.log(e));
      });
  
      const selectGenre = (genre) =>{
        if(selectedGenre.length === 0){
          selectedGenre.push(genre.id);
        }else{
            if(selectedGenre.includes(genre.id)){
                selectedGenre.forEach((id, idx) => {
                    if(id === genre.id){
                        selectedGenre.splice(idx, 1);
                    }
                })
            }else{
                selectedGenre.push(genre.id);
            }
        }
      }
  return (
    <div className='genres'>
            {genres?.map((genre,index)=>{
                return <div key={index}
                  className="tag"
                  onClick={(e)=>{selectGenre(genre);e.currentTarget.classList.toggle('active');}}>
                    {genre.name} 
                  </div>
              })}
    </div>
  )
}
