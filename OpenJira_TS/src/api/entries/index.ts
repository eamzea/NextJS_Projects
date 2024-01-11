import axios from "axios";

const baseEntriesApi = axios.create({
  baseURL: '/api'
})

export default baseEntriesApi
