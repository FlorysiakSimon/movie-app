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
//Components
//Dependencies
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';




render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MoviePage/>} />
      <Route path="/movies/:id" element={<SpecificMovie />}/>
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

