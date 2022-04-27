import axios from "axios";
import { useEffect } from "react";
import './Genres.scss'

/** display genres filter buttons
 * @param  {array} {selectedGenres
 * @param  {array} setSelectedGenres
 * @param  {array} genres
 * @param  {array} setGenres
 * @param  {string} type
 * @param  {array} setPage
 */
const Genres = ({selectedGenres,setSelectedGenres,genres,setGenres,type,setPage,}) => {

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=ccfb5b1d68f6fc53b586ba1f720f736e&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({}); // unmounting
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="genres">
      {selectedGenres.map((genre) => (
        <div
          key={genre.id}
          onClick={() => handleRemove(genre)}
          className='tag active'
        >
        {genre.name} <span>x</span>
        </div>
      ))}
      {genres.map((genre) => (
       <div
       key={genre.id}
       onClick={() => handleAdd(genre)}
       className='tag'
        >
        {genre.name}
        </div>
      ))}
    </div>
  );
};

export default Genres;