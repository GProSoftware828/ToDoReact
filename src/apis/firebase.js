import axios from 'axios';

const database = axios.create({
  baseURL: 'https://appdb783.firebaseio.com/'
});

export default database;
