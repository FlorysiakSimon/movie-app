import { toast } from "react-toastify";

export const deleteStorage = (movie) => {
    let storedData = window.localStorage.watchlist.split(",");

    let newData = storedData.filter((id) => id != movie.id);

    window.localStorage.watchlist = newData;
    toast.success('Movie removed from your watchlist !')
};