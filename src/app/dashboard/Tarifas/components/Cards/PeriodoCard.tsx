import React from "react";
import { Plus } from "lucide-react";
import { formatValue } from "@/utils/tarifario/formatsColors";
import {
  PotenciasBoePeriodo,
  ProductoPeriodo,
  RepartosOmiePeriodo,
} from "../../interfaces/proveedor";

interface Props {
  periodo: RepartosOmiePeriodo | PotenciasBoePeriodo | ProductoPeriodo;
  cellId: string;
  isEditing: boolean;
  editValue: string;
  onEditStart: (cellId: string, value: number) => void;
  onEditChange: (value: string) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  decimals?: number;
  unit: string;
}

export const PeriodoCard = ({
  periodo,
  cellId,
  isEditing,
  editValue,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  decimals = 6,
  unit,
}: Props) => {
  // 🔹 Determinar el "valor editable" (valor o factor según tipo)
  const value =
    "valor" in periodo
      ? periodo.valor
      : "factor" in periodo
      ? periodo.factor
      : null;

  // label "P1, P2, ..." desde el número
  const periodoLabel =
    periodo.periodo != null ? `P${periodo.periodo}` : "Sin período";

  if (isEditing) {
    return (
      <div className="space-y-3">
        <input
          type="number"
          step={decimals === 6 ? "0.000001" : "0.0001"}
          value={editValue}
          onChange={(e) => onEditChange(e.target.value)}
          className="w-full text-sm p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") onEditSave();
            if (e.key === "Escape") onEditCancel();
          }}
        />
        <div className="flex justify-center gap-2">
          <button
            onClick={onEditSave}
            className="p-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            ✓
          </button>
          <button
            onClick={onEditCancel}
            className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  // 🔹 Caso: no existe valor/factor => mostrar botón de agregar
  if (value == null) {
    return (
      <div
        className="flex flex-col items-center justify-center cursor-pointer p-3 border border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-gray-50 transition"
        onClick={() => onEditStart(cellId, 0)}
      >
        <Plus size={20} className="text-blue-500 mb-1" />
        <span className="text-xs text-blue-600">Agregar {periodoLabel}</span>
      </div>
    );
  }

  // 🔹 Caso: ya existe valor/factor => mostrar número con decimales
  return (
    <div
      className="cursor-pointer relative group"
      onClick={() => onEditStart(cellId, value)}
    >
      <div className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
        {formatValue(value, decimals)}
      </div>
      <div className="text-xs text-gray-500 mt-1">{unit}</div>
      <div className="absolute -top-1 -right-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 text-xs">
        ✏️
      </div>
    </div>
  );
};
