import axios from 'axios'

export default axios.create({
	baseURL: 'http://localhost:3000/',
});

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

