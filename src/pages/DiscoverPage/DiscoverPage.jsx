import React,{useEffect,useState} from 'react'
import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";
import NavBar from '../../components/NavBar/NavBar'
import './DiscoverPage.scss'
import axios from 'axios';
import { searchMovie } from '../../services/db';
import MovieItem from '../../components/MovieItem/MovieItem'
import Genres from '../../components/Genres/Genres';
import useGenre from '../../services/useGenre';

export default function DiscoverPage() {

    // In first place i need to check if the JWT is inside the localStorage
    const userInfos = localStorage.getItem("userInfos");
    const [token,setToken] = useState(JSON.parse(userInfos).token)
    if(token === undefined){
        localStorage.removeItem("userInfos");
        setToken('')
        window.location.href = "/";
    }
   

    //data state
    const [data,setData] = useState([]);
    const [currentPage, setPage] = useState(1);
    const [search, setSearch] = useState('')
    const [searchData, setSearchData] = useState([]);
    const [genres,setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);
    
    const fetchMovies = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=ccfb5b1d68f6fc53b586ba1f720f736e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&with_genres=${genreforURL}`
      );
      setData(data);
    }


    useEffect(() => {
      fetchMovies();

      // eslint-disable-next-line
    }, [genreforURL,currentPage]);

    useEffect(() => {
        if(search.length){
          const getSearchData = async () => {
            const request = await searchMovie(search, token,currentPage);
            if (!request) return console.log('data error');
            setSearchData(request);
          };
          getSearchData();
        }
    }, [search, token,currentPage]);

     

    const handlePageChange = (page) => {
        setPage(page.selected + 1)
        document.querySelector('.movieList').scrollIntoView()
    };
    
    return (
    <div id="movie">
            <NavBar />

            <div className='movieList'>

            <div className='discover'>
                <input type='text' value={search} onChange={(event) => { setSearch(event.target.value) }} placeholder='Search a movie' />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" /></svg>
            </div>
                
            <Genres
              type="movie"
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
              genres={genres}
              setGenres={setGenres}
              setPage={setPage}
            />

            {search.length > 2 ? (
                <>
                    <MovieItem data={searchData.results} />

                    <ReactPaginate
                      nextLabel=">"
                      onPageChange={handlePageChange}
                      pageCount={searchData.total_pages}
                      previousLabel="<"
                      breakLabel="..."
                      containerClassName="pagination"
                      activeClassName="active"
                      renderOnZeroPageCount={null}
                    /> 
                </>

            ) : <>
                    {data.total_results !== 0 ?  <MovieItem data={data.results} />: <h3 style={{marginLeft:"1em"}}> There is no movie</h3> }

                    {data.total_pages >= 1 ?
                     <ReactPaginate
                      nextLabel=">"
                      onPageChange={handlePageChange}
                      pageCount={data.total_pages}
                      previousLabel="<"
                      breakLabel="..."
                      containerClassName="pagination"
                      activeClassName="active"
                      renderOnZeroPageCount={null}
                    />  : undefined }
                    
                </>
            }
            </div>
        </div>
  )
}
