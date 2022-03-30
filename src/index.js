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
//Dependencies
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MoviePage/>} />
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

