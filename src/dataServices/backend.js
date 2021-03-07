import settings from 'blocks/settings';
import axios from 'axios';

const config = {
   baseURL: settings.apiUrl
};
const backend = axios.create(config);

backend.interceptors.request.use(requestInterceptor);
backend.interceptors.response.use(responseInterceptorSuccess, responseInterceptorError)

export default backend;

function requestInterceptor(config) {
   return config;
}

function responseInterceptorSuccess(response) {
   return response.data;
}

function responseInterceptorError(error){
   // if (error.response && error.response.status >= 500){
   console.warn(error);
   // }

   return Promise.reject(error);
}