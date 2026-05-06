import axios from "axios";

const api = axios.create({
  baseURL: "https://frostyghost23.alwaysdata.net/api",
});

export default api;