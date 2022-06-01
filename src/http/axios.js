import axios from 'axios'
import Qs from 'qs'
import Vue from 'vue';
// request 拦截器
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err)
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            let res = response.data;
            return res || {}
        }
    },
    error => {
        if (error && error.response) {
            //console.log(error.response.status)
        }
        return Promise.reject(error)
    }
)
export default axios
