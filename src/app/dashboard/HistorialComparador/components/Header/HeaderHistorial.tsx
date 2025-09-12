import React from "react";
import { InputSearch } from "@/components/Inputs/InputSearch";
import { HistorialFilters } from "../../interfaces/historial-filter";
import { Search, X } from "lucide-react";

interface Props {
  filters: HistorialFilters;
  setFilters: (filters: HistorialFilters) => void;
  onSearch: () => void;
}

export const HeaderHistorial = ({ filters, setFilters, onSearch }: Props) => {
  const handleClear = () => {
    setFilters({});
    onSearch();
  };

  // console.log("filtros: ", filters);
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Historial Comparador
        </h1>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InputSearch
          type="text"
          placeholder="Buscar por email..."
          value={filters.email ?? ""}
          onChange={(e) => setFilters({ ...filters, email: e })}
          icon={Search}
        />

        <InputSearch
          type="date"
          placeholder="Filtrar por fecha..."
          value={filters.fecha ?? ""}
          onChange={(e) => setFilters({ ...filters, fecha: e })}
        />

        <InputSearch
          type="text"
          placeholder="Buscar por CUPS..."
          value={filters.cups ?? ""}
          onChange={(e) => setFilters({ ...filters, cups: e })}
          icon={Search}
        />

        <div className="flex items-center justify-around">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center justify-center gap-1 cursor-pointer"
            onClick={onSearch}
          >
            <Search size={14} />
            Buscar
          </button>

          {/* Botón de limpiar */}
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded flex items-center justify-center gap-1 cursor-pointer"
            onClick={handleClear}
          >
            <X size={14} />
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};
