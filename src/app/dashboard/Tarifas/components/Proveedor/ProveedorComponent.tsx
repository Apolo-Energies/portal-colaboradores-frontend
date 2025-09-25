import { Building, Plus } from "lucide-react";
import React from "react";
import {
  Proveedor,
} from "../../interfaces/proveedor";

interface Props {
  proveedor: Proveedor;
}

export const ProveedorComponent = ({proveedor}: Props) => {
  const totalProductos = proveedor.tarifas.reduce((acc, tarifa) => acc + tarifa.productos.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Información del Proveedor</h3>
        <button
          // onClick={onAddProvider}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          <Plus size={14} />
          Agregar Proveedor
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-700 rounded-lg">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-900">{proveedor.nombre}</h4>
              <span className="inline-flex px-3 py-1 text-sm font-medium rounded-lg bg-green-100 text-green-800">
                Activo
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-medium text-gray-700 mb-1">Tarifas registradas</div>
              <div className="text-2xl font-bold text-gray-900">{proveedor.tarifas.length}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-medium text-gray-700 mb-1">Productos configurados</div>
              <div className="text-2xl font-bold text-gray-900">{totalProductos}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-medium text-gray-700 mb-1">Estado</div>
              <div className="text-lg font-semibold text-green-600">Operativo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};