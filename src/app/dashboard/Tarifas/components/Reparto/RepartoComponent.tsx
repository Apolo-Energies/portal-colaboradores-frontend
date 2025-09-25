import React, { useState } from "react";
import { PeriodoCard } from "../Cards/PeriodoCard";
import { TrendingUp } from "lucide-react";
import { getPeriodColor } from "@/utils/tarifario/formatsColors";
import { Tarifa, RepartosOmie } from "../../interfaces/proveedor";
import { TarifaSelector } from "../SelectorTop/TarifaSelector";

interface Props {
  tarifas: Tarifa[];
}

export const RepartoComponent = ({ tarifas }: Props) => {
  const [selectedTarifa, setSelectedTarifa] = useState<string>("all");
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const handleEditStart = (cellId: string, value: number): void => {
    setEditingCell(cellId);
    setEditValue(value.toString());
  };

  const handleEditCancel = (): void => {
    setEditingCell(null);
    setEditValue("");
  };

  const handleEditSave = (): void => {
    setEditingCell(null);
    setEditValue("");
  };

  // const handleExport = async (): Promise<void> => {
  //   await ApiService.exportExcel('reparto', proveedorId, selectedTarifa || undefined);
  // };

  const getFilteredData = (): RepartosOmie[] => {
    const allRepartos = tarifas.flatMap((tarifa) => tarifa.repartosOmie);
    if (selectedTarifa === "all") return allRepartos;
    if (selectedTarifa === "") return [];
    return allRepartos.filter(
      (item) => item.tarifaId.toString() === selectedTarifa
    );
  };

  return (
    <div className="space-y-6">
      {/* <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Tarifa</label>
          <select
            value={selectedTarifa}
            onChange={(e) => setSelectedTarifa(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecciona una tarifa</option>
            <option value="all">Mostrar todos</option>
            {tarifas.map(tarifa => (
              <option key={tarifa.id} value={tarifa.id}>{tarifa.codigo}</option>
            ))}
          </select>
        </div> */}

      <TarifaSelector
        selectedTarifa={selectedTarifa}
        setSelectedTarifa={setSelectedTarifa}
        options={tarifas}
        showAll={true}
      />

      {selectedTarifa && (
        <div className="space-y-6">
          {getFilteredData().map((reparto) => (
            <div
              key={reparto.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-700 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tarifas.find((t) => t.id === reparto.tarifaId)?.codigo}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {reparto.periodoNombre}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-4">
                  Factores de Reparto
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {reparto.periodos.map((periodo) => {
                    const cellId = `reparto-${reparto.id}-${periodo.periodo}`;
                    const isEditing = editingCell === cellId;

                    return (
                      <div
                        key={periodo.id}
                        className="text-center p-4 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-all duration-200 border border-gray-100"
                      >
                        <div
                          className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg mb-3 border ${getPeriodColor(
                            periodo.periodo
                          )}`}
                        >
                          P{periodo.periodo}
                        </div>

                        <PeriodoCard
                          periodo={periodo}
                          cellId={cellId}
                          isEditing={isEditing}
                          editValue={editValue}
                          onEditStart={handleEditStart}
                          onEditChange={setEditValue}
                          onEditSave={handleEditSave}
                          onEditCancel={handleEditCancel}
                          decimals={6}
                          unit="Factor"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
