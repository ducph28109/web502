import axios from 'axios';

const instanse = axios.create({
  baseURL: 'http://localhost:8080/api',
 
});

instanse.interceptors.request.use(config=>{
  const token = JSON.parse(localStorage.getItem('token')!);
config.headers.Authorization ="Bearer " + token
return config;
})
export default instanse;
