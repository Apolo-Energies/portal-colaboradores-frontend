import React, { useState } from "react";
import { PeriodoCard } from "../Cards/PeriodoCard";
import { Producto, Tarifa } from "../../interfaces/proveedor";
import { getPeriodColor } from "@/utils/tarifario/formatsColors";
import { Calculator, Plus } from "lucide-react";
import { TarifaSelector } from "../SelectorTop/TarifaSelector";

interface Props {
  tarifas: Tarifa[];
  proveedorId: number;
}

export const TarifaComponent = ({ tarifas }: Props) => {
  const [selectedTarifa, setSelectedTarifa] = useState<string>("all");
  const [selectedProducto, setSelectedProducto] = useState<string>("");
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const [newPeriodoForProducto, setNewPeriodoForProducto] = useState<
    number | null
  >(null);

  const handleEditStart = (cellId: string, value: number): void => {
    setEditingCell(cellId);
    setEditValue(value.toString());
  };

  const handleEditCancel = (): void => {
    setEditingCell(null);
    setEditValue("");
    setNewPeriodoForProducto(null);
  };

  const handleEditSave = (): void => {
    // Aquí se llamaría al API para guardar cambios
    setEditingCell(null);
    setEditValue("");
    setNewPeriodoForProducto(null); // cerrar nuevo periodo temporal si existía
  };

  const getFilteredData = (): Tarifa[] => {
    let result = tarifas;

    // Filtrar por tarifa
    if (selectedTarifa !== "all" && selectedTarifa !== "") {
      result = result.filter((item) => item.id.toString() === selectedTarifa);
    }

    // Filtrar por producto
    if (selectedProducto !== "" && selectedProducto !== "all") {
      result = result.map((tarifa) => ({
        ...tarifa,
        productos: tarifa.productos.filter(
          (p) => p.id.toString() === selectedProducto
        ),
      }));
    }

    return result;
  };

  const preparePeriodoData = (producto: Producto) => {
    const periodosOrdenados = [...producto.periodos].sort(
      (a, b) => a.periodo - b.periodo
    );
    const maxPeriodo = periodosOrdenados.length
      ? periodosOrdenados[periodosOrdenados.length - 1].periodo
      : 0;
    const showNewPeriodo = newPeriodoForProducto === producto.id;

    const periodosRender = periodosOrdenados.map((periodo) => ({
      periodo,
      cellId: `producto-${producto.id}-${periodo.periodo}`,
      isEditing: editingCell === `producto-${producto.id}-${periodo.periodo}`,
    }));

    const newPeriodoRender = showNewPeriodo
      ? {
          periodo: {
            id: -1,
            productoId: producto.id,
            periodo: maxPeriodo + 1,
            valor: 0,
            producto: null,
          },
          cellId: `producto-${producto.id}-nuevo`,
          isEditing: true,
        }
      : null;

      const allowAddButton = maxPeriodo < 6;

    return { periodosRender, newPeriodoRender, maxPeriodo, showNewPeriodo, allowAddButton  };
  };

  return (
    <div className="space-y-6">
      <TarifaSelector
        selectedTarifa={selectedTarifa}
        setSelectedTarifa={setSelectedTarifa}
        selectedProducto={selectedProducto}
        setSelectedProducto={setSelectedProducto}
        options={tarifas.map((t) => ({
          id: t.id,
          codigo: t.codigo,
          productos: t.productos.map((p) => ({
            id: p.id,
            nombre: p.nombre,
          })),
        }))}
        showAll={true}
      />

      {selectedTarifa && (
        <div className="space-y-6">
          {getFilteredData().map((tarifa) =>
            tarifa.productos.map((producto) => {
              const {
                periodosRender,
                newPeriodoRender,
                maxPeriodo,
                showNewPeriodo,
                allowAddButton 
              } = preparePeriodoData(producto);

              return (
                <div
                  key={producto.id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-700 rounded-lg">
                        <Calculator className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {tarifa.codigo}
                        </h3>
                        <span className="text-sm text-gray-600">
                          {producto.nombre}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm font-semibold text-gray-700 mb-4">
                      Períodos (€/kWh)
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {periodosRender.map(({ periodo, cellId, isEditing }) => (
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
                            unit="€/kWh"
                          />
                        </div>
                      ))}

                      {newPeriodoRender && (
                        <div className="text-center p-4 bg-gray-50 rounded-lg border border-dashed border-blue-400">
                          <div
                            className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg mb-3 border ${getPeriodColor(
                              maxPeriodo + 1
                            )}`}
                          >
                            P{maxPeriodo + 1}
                          </div>

                          <PeriodoCard
                            periodo={newPeriodoRender.periodo}
                            cellId={newPeriodoRender.cellId}
                            isEditing={newPeriodoRender.isEditing}
                            editValue={editValue}
                            onEditStart={handleEditStart}
                            onEditChange={setEditValue}
                            onEditSave={handleEditSave}
                            onEditCancel={handleEditCancel}
                            decimals={6}
                            unit="€/kWh"
                          />
                        </div>
                      )}

                      {allowAddButton && !showNewPeriodo && (
                        <button
                          onClick={() => setNewPeriodoForProducto(producto.id)}
                          className="flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition"
                        >
                          <Plus className="w-6 h-6 mb-2" />
                          <span className="text-sm">Añadir periodo</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
