import axios from "axios";
dotenv.config();
import * as dotenv from "dotenv";

console.log("varible local: ", process.env.NEXT_PUBLIC_ENVIRONMENT_LOCAL);
console.log("varible produccion: ", process.env.NEXT_PUBLIC_ENVIRONMENT_PROD);

export const ApiManager = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_ENVIRONMENT_LOCAL,
  baseURL: "https://ee.renovaenergy.es/api/VicoApi",
  responseType: "json",
  withCredentials: true,
});

export function setAuthToken(token: string): void {
  ApiManager.defaults.headers.common.Authorization = `Bearer ${token}`;
}
