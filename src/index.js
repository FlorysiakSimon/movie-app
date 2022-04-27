import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css'
//pages
import HomePage from './pages/HomePage/HomePage';
import MoviePage from "./pages/MoviePage/MoviePage";
import SpecificMovie from './pages/SpecificMovie/SpecificMovie';
import DiscoverPage from "./pages/DiscoverPage/DiscoverPage";
import ListPage from "./pages/ListPage/ListPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
//Components
//Dependencies
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import WatchlistPage from "./pages/WatchlistPage/WatchlistPage";
import ActorPage from "./pages/ActorPage/ActorPage";


if (localStorage.getItem("watchlist") === null) {
  localStorage.setItem('watchlist',"")
}


render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MoviePage/>} />
      <Route path="/movies/:id" element={<SpecificMovie />}/>
      <Route path="/:name" element={<ListPage />}/>
      <Route path="/discover" element={<DiscoverPage />} />
      <Route path="/profile" element={<ProfilePage />}/>
      <Route path="/watchlist" element={<WatchlistPage />}/>
      <Route path="/actor/:id" element={<ActorPage />} />
    </Routes>
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover/>
  </BrowserRouter>,
  document.getElementById("root")
);

