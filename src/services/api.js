import axios from "axios";
import { parseCookies } from "nookies";

const { token } = parseCookies();

const api = axios.create({
  baseURL: "http://localhost:5000",
  }
);

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export default api;
