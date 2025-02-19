import axios from "axios";

const api = axios.create({
    //baseURL: 'http://localhost:3333'
    //baseURL: 'http://192.168.0.107:3333'
    baseURL: "https://pizzaria-backend-xi.vercel.app/"
})

export { api };