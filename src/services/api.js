import Axios from 'axios';

const api = Axios.create({
    baseURL: 'http://localhost:8080', //Inserir aqui a URL da api
    headers: {
        'Accept': 'application/json'
    }
})

export default api;