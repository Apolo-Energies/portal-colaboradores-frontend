import { Filter, Plus, Search } from "lucide-react";
import React, { useState } from "react";
import { ModalUser } from "../Modals/ModalAddUser";
import { InputSearch } from "@/components/Inputs/InputSearch";
import { SelectSearch } from "@/components/Selects/SelectSearch";

interface Props {
  filters: {
    nombre: string;
    email: string;
    role: string;
  };
  setFilters: (filters: {
    nombre: string;
    email: string;
    role: string;
  }) => void;
}

export const HeaderUser = ({ filters, setFilters }: Props) => {
  const [open, setOpen] = useState(false);

  const openModalFunction = () => {
    setOpen(true);
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Gestión de Usuarios
        </h1>
        <button
          onClick={() => openModalFunction()}
          className="flex items-center gap-2 cursor-pointer bg-blue-600 text-foreground px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Agregar Usuario
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InputSearch
          type="text"
          placeholder="Buscar por nombre..."
          value={filters.nombre}
          onChange={(e) => setFilters({ ...filters, nombre: e })}
          icon={Search}
        />

        <InputSearch
          type="text"
          placeholder="Buscar por email..."
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e })}
          icon={Search}
        />

        <SelectSearch
          value={filters.role}
          onChange={(val) => setFilters({ ...filters, role: val })}
          icon={Filter} // import { Filter } from "lucide-react";
          options={[
            { value: "", label: "Todos los roles" },
            { value: "1", label: "Master" },
            { value: "2", label: "Colaborador" },
          ]}
        />
      </div>
      <ModalUser open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
