import axios from "axios";

const api = axios.create({
  baseURL: "https://groweasy-ai-backend-uqor.onrender.com/api",
});

export default api;