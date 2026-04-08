import axios from "axios";

const API = axios.create({
  baseURL: "https://library-system-lojh.onrender.com", 
});

export default API;
