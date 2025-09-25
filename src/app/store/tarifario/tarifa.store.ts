import { Proveedor, Tarifa } from "@/app/dashboard/Tarifas/interfaces/proveedor";
import { create } from "zustand";

interface TarifaStore {
  proveedorActual: Proveedor | null;
  setProveedorActual: (proveedor: Proveedor) => void;
  
  tarifaSeleccionada: Tarifa | null;
  setTarifaSeleccionada: (tarifa: Tarifa) => void;

  modalidadSeleccionada: string;
  setModalidadSeleccionada: (modalidad: string) => void;
}

export const useTarifaStore = create<TarifaStore>((set) => ({
  proveedorActual: null,
  setProveedorActual: (proveedor) => set({ proveedorActual: proveedor }),
  
  tarifaSeleccionada: null,
  setTarifaSeleccionada: (tarifa) => set({ tarifaSeleccionada: tarifa, modalidadSeleccionada: "" }),
  
  modalidadSeleccionada: "",
  setModalidadSeleccionada: (modalidad) => set({ modalidadSeleccionada: modalidad }),
}));
