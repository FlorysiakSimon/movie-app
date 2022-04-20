import React,{useEffect,useState} from 'react'
import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";
import NavBar from '../../components/NavBar/NavBar'
import './DiscoverPage.scss'
import db from '../../services/db'
import { searchMovie } from '../../services/db';
import { useParams } from 'react-router-dom'
import MovieItem from '../../components/MovieItem/MovieItem'
import GenresItems from '../../components/GenresItems/GenresItems';


export default function DiscoverPage() {

    // In first place i need to check if the JWT is inside the localStorage
    const userInfos = localStorage.getItem("userInfos");
    const [token,setToken] = useState(JSON.parse(userInfos).token)
    if(token === undefined){
        localStorage.removeItem("userInfos");
        setToken('')
        window.location.href = "/";
    }
    //page params 
    const {name} = useParams()
   

    //data state
    const [data,setData] = useState([]);
    const [genres,setGenres] = useState('horror')
    const [currentPage, setPage] = useState(1);
    const [search, setSearch] = useState('')
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        db.get(`movies/discover/${currentPage}/${genres}`, {headers: {
            "Authorization": `Bearer ${token}`
            }})
          .then(response => setData(response.data))
          .catch(e=>setToken(''));
    }, [name,currentPage,token,genres]);
    

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
       // window.scroll(0, 0);
    };

    console.log(searchData)

    return (
    <div id="movie">
            <NavBar />

            <div className='movieList'>

            <div className='discover'>
                <input type='text' value={search} onChange={(event) => { setSearch(event.target.value) }} placeholder='Search a movie' />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" /></svg>
            </div>
                
            <GenresItems />    
            
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
                    <MovieItem data={data.results} />

                    <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageChange}
                    pageCount={data.total_pages}
                    previousLabel="<"
                    breakLabel="..."
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    /> 
                </>
            }
            
            

               

            </div>
            
        </div>
  )
}
