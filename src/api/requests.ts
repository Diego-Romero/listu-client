import axios from "axios"
import { config } from "../config"

export const registerRequest = async(values) => {
  const url = `${config.env.serverUrl}/user/register`
  return axios.post(url, values)
}