import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL
    : process.env.REACT_APP_LOCAL_URL;
export default axios.create({
  baseURL,
});
