import axios from 'axios';


const axiosService = axios.create({
  baseURL: process.env.NODE_ENV == 'production' ? process.env.REACT_APP_API_URL : 'http://localhost:5000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }, 
});

axiosService.interceptors.request.use(
  async (config:any) => {
    const token =  window.localStorage.getItem('userToken')
    if (token) {
      config.headers.Authorization = "Bearer "+token
    }
    return config
  },
  (error:any)  => {
    return Promise.reject(error)
  }
);

export default axiosService;
