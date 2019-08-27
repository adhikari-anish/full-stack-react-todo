import axios from "axios";

const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.headers = Object.assign(config.headers, {
      Authorization: localStorage.usertoken
    });
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export { axiosInstance };
