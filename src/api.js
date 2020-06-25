import axios from 'axios';


axios.defaults.headers.common['Authorization'] = 'token ee5f6766123e0fa438f03380f300a8f74f081c9f';
export default axios.create({
  baseURL: `https://cors-anywhere.herokuapp.com/https://corona-watch-api.herokuapp.com/corona-watch-api/v1/`
});