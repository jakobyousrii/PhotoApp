import axios from "axios";

export const PixApi = axios.create({
    baseURL: "https://pixabay.com/api"
})