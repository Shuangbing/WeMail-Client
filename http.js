import axios from 'axios'
import GLOBAL from './global';


global.variables = {
    http_loading: false
}

const http = axios.create({
    baseURL: 'https://b4590153.ngrok.io',
    timeout: 5000,
});

http.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZDI3NDMzYmU3Mzg4YzE2OGEzYzE5ZDQiLCJpYXQiOjE1NjI5MzA0MjN9.jB7EzDLyUrjs-YAdoDQ3J4UMBxdtjVsc-cHlrybejBQ'
    return config
});

http.interceptors.response.use(res => {
    return res.data
}, err => {
    if(err.response.data.message) {
        return err.response.data
    }
});


export default http

