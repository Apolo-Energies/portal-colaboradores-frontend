import axios from "axios";
import { ApiResponse } from "../interfaces/ApiResponse";
import { HistorialComparador } from "@/app/dashboard/HistorialComparador/interfaces/historila-comparador";
import { HistorialFilters } from "@/app/dashboard/HistorialComparador/interfaces/historial-filter";
import { ApiManager } from "../ApiManager/ApiManager";

export const getHistorialComparador = async (
  token: string,
  filters: HistorialFilters = {}
): Promise<ApiResponse<HistorialComparador[]>> => {
  try {
    const { email, fecha, cups, page = 1, pageSize = 15 } = filters;

    const response = await ApiManager.get("/historialComparador", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        email,
        fecha,
        cups,
        page,
        pageSize
      },
      withCredentials: false,
    });

    return {
      result: response.data.result,
      status: response.status,
      isSuccess: true,
      displayMessage: response.data.displayMessage ?? "",
      errorMessages: response.data.errorMessages ?? []
    };
  } catch (error) {
    console.error("Get historialComparador error:", error);
    if (axios.isAxiosError(error)) {
      return {
        result: [],
        status: error.response?.status ?? 500,
        isSuccess: false,
        displayMessage: error.response?.data?.displayMessage ?? "Unknown error",
        errorMessages: error.response?.data?.errorMessages ?? [error.message]
      };
    }
    return {
      result: [],
      status: 500,
      isSuccess: false,
      displayMessage: "Unknown error",
      errorMessages: [String(error)]
    };
  }
};
