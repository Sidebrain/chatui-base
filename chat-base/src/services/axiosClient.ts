import axios from "axios";

const ax = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

console.log(import.meta.env.VITE_API_URL);

export default ax;
