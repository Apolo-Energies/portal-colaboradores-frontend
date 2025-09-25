import React, { useState, useEffect } from "react";
import { PeriodoCard } from "../Cards/PeriodoCard";
import { FileText } from "lucide-react";
import { getPeriodColor } from "@/utils/tarifario/formatsColors";
import {
  Tarifa,
  PotenciasBoe,
  PotenciasBoePeriodo,
} from "../../interfaces/proveedor";
import { TarifaSelector } from "../SelectorTop/TarifaSelector";

interface Props {
  tarifas: Tarifa[];
}

export const PotenciaComponent = ({ tarifas }: Props) => {
  const [selectedTarifa, setSelectedTarifa] = useState<string>("all");
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [data, setData] = useState<PotenciasBoe[]>([]);

  // Construimos los PotenciasBoe desde las tarifas
  useEffect(() => {
    const allPotencias = tarifas.flatMap((t) => t.potenciasBoe);
    setData(allPotencias);
  }, [tarifas]);

  const handleEditStart = (cellId: string, value: number) => {
    setEditingCell(cellId);
    setEditValue(value.toString());
  };

  const handleEditCancel = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const handleEditSave = () => {
    const newValue = parseFloat(editValue);
    if (isNaN(newValue)) {
      alert("Por favor, ingresa un valor numérico válido");
      return;
    }

    const [, potenciaIdStr, periodoIdStr] = editingCell!.split("-");
    const potenciaId = parseInt(potenciaIdStr);
    const periodoId = parseInt(periodoIdStr);

    setData((prev) =>
      prev.map((potencia) =>
        potencia.id === potenciaId
          ? {
              ...potencia,
              periodos: potencia.periodos.map((p) =>
                p.id === periodoId ? { ...p, valor: newValue } : p
              ),
            }
          : potencia
      )
    );

    setEditingCell(null);
    setEditValue("");
  };

  //   const getFilteredData = (): PotenciasBoe[] => {
  //     if (selectedTarifa === "all") return data;
  //     if (selectedTarifa === "") return [];
  //     return data.filter((p) => p.tarifaId === selectedTarifa);
  //   };

  const getFilteredData = (): PotenciasBoe[] => {
    const allRepartos = tarifas.flatMap((tarifa) => tarifa.potenciasBoe);
    if (selectedTarifa === "all") return allRepartos;
    if (selectedTarifa === "") return [];
    return allRepartos.filter(
      (item) => item.tarifaId.toString() === selectedTarifa
    );
  };

  return (
    <div className="space-y-6">
      {/* <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar Tarifa
        </label>
        <select
          value={selectedTarifa}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "all") setSelectedTarifa("all");
            else if (val === "") setSelectedTarifa("");
            else setSelectedTarifa(parseInt(val));
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Selecciona una tarifa</option>
          <option value="all">Mostrar todos</option>
          {tarifas.map((t) => (
            <option key={t.id} value={t.id}>
              {t.codigo}
            </option>
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
          {getFilteredData().map((potencia) => {
            const tarifa = tarifas.find((t) => t.id === potencia.tarifaId);

            return (
              <div
                key={potencia.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                  <div className="p-3 bg-blue-700 rounded-lg shadow-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {tarifa?.codigo ?? "Sin código"}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">
                    Periodos de Potencia BOE
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {potencia.periodos.map((periodo: PotenciasBoePeriodo) => {
                      const cellId = `potencia-${potencia.id}-${periodo.id}`;
                      const isEditing = editingCell === cellId;

                      return (
                        <div
                          key={periodo.id}
                          className="text-center p-4 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-all duration-200 border border-gray-100"
                        >
                          <div
                            className={`inline-block px-3 py-1.5 text-sm font-bold rounded-lg mb-3 border ${getPeriodColor(
                              periodo.periodo
                            )}`}
                          >
                            {periodo.periodo}
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
                            unit="kW"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
