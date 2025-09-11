import axios from "axios";

console.log("varible local: ", process.env.NEXT_PUBLIC_API_BASE_LOCAL);
console.log("varible produccion: ", process.env.NEXT_PUBLIC_API_BASE_PROD);

export const ApiManagerColaboradores = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_ENVIRONMENT_LOCAL,
  baseURL: "https://localhost:7264/api/apolo/v1",
  responseType: "json",
  withCredentials: true,
});

export function setAuthToken(token: string): void {
  ApiManagerColaboradores.defaults.headers.common.Authorization = `Bearer ${token}`;
}
