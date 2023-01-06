import axios from "axios";

const randomUserApi = axios.create({
  baseURL: "https://randomuser.me/api/",
  timeout: 5000,
});

export default randomUserApi;
