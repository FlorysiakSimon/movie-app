import axios from 'axios'

export default axios.create({
	baseURL: 'http://localhost:3000/',
});

const baseURL = 'http://localhost:3000/'

export const verifyToken = async (token) => {
	axios.get('http://localhost:3000/users/verifytoken', { headers: { Authorization: `Bearer`+ token } })
    .then(response => {
        // If request is good...
        console.log(response.data);
    })
    .catch((error) => {
        console.log('error ' + error);
    });
};

/* SPECIFIC MOVIE REQUESTS */
export const getMovie = async (id,token) => {
    try {
        const res = await axios.get(`${baseURL}movies/${id}`, {headers: {
            "Authorization": `Bearer ${token}`
            }});
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const getMovieCredits = async (id,token) => {
    try {
        const res = await axios.get(`${baseURL}movies/${id}/credits`, {headers: {
            "Authorization": `Bearer ${token}`
            }});
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const getMovieVideos = async (id,token) => {
    try {
        const res = await axios.get(`${baseURL}movies/${id}/videos`, {headers: {
            "Authorization": `Bearer ${token}`
            }});
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const getMovieSimilar = async (id,token) => {
    try {
        const res = await axios.get(`${baseURL}movies/${id}/similar`, {headers: {
            "Authorization": `Bearer ${token}`
            }});
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
