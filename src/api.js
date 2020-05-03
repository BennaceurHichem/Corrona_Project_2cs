import axios from 'axios';


axios.defaults.headers.common['Authorization'] = 'Basic YWRtaW46YWRtaW4=';
export default axios.create({
  baseURL: `https://cors-anywhere.herokuapp.com/https://corona-watch-api.herokuapp.com/corona-watch-api/v1/`
});