import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://dpproject-java.herokuapp.com/api/v1",
});

export default axiosClient;
