import { toast } from "react-toastify";

export const addStorage = (movie) => {
    let storedData = window.localStorage.watchlist
    ? window.localStorage.watchlist.split(",")
    : [];

    if (!storedData.includes(movie.id.toString())) {
    storedData.push(movie.id);
    window.localStorage.watchlist = storedData;
    toast.success('Movie added to your watchlist !')
    }
};