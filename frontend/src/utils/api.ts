import axios from "axios";
import { AnyObject } from "yup";
const BASE_URL = "http://localhost:3000";

export const postData = async (data: AnyObject, url: string) => {
  const response = await axios.post(BASE_URL + url, data);
  return response.data;
};
