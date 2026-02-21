import axios from "axios";

const api = axios.create({
  baseURL: "/",
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;

    if (status === 404) {
      window.location.href = "/not-found";
    }

    return Promise.reject(error);
  },
);

export default api;