import axios from 'axios';

//also put jwt authentication here
export default axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});
