import axios from 'axios';

// Create an instance of Axios
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your base URL
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers if needed
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before the request is sent, like adding an authorization token
    const token = localStorage.getItem('token'); // Example: Get token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lies within the range of 2xx causes this function to trigger
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx causes this function to trigger
    // Handle the response error
    return Promise.reject(error);
  }
);

export default axiosClient;