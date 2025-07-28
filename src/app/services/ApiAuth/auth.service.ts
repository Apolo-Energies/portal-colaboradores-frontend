import axios from "axios";
import { ApiManager } from "../ApiManager/ApiManager";

export interface ApiResponse<T> {
  data: T;
  status: number;
}

export const userLogin = async (
  userName: string,
  password: string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<ApiResponse<any>> => {
  if (!userName || !password) {
    return {
      data: "Usuario o contraseña vacíos",
      status: 400,
    };
  }

  try {
    const response = await ApiManager.post("/Autenticar", null, {
      params: {
        userName,
        password,
      },
    });

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        data: error.response?.data ?? "Unknown error",
        status: error.response?.status ?? 500,
      };
    }

    return {
      data: "Unexpected error",
      status: 500,
    };
  }
};




