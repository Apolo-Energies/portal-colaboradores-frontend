import React, { useState } from 'react'
import { ModalAddCommission } from '../Modals/ModalAddCommission';
import { Plus } from 'lucide-react';

export const HeaderCommission = () => {
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
            Agregar Comisión
          </button>
        </div>
  
        <ModalAddCommission open={open} onClose={() => setOpen(false)} />
      </div>
    );
  };
  