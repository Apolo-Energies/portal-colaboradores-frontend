'use client';

import React, { useState } from "react";
import { HeaderHistorial } from "../Header/HeaderHistorial";
import { TableHistorial } from "../Table/TableHistorial";
import { HistorialFilters } from "../../interfaces/historial-filter";

export const HistorialComponent = () => {
  const [filters, setFilters] = useState<HistorialFilters>({});
  
  const handleSearch = (newFilters?: HistorialFilters) => {
    // Si pasamos filtros vacíos, la URL del endpoint no tendrá query params
    setFilters({ ...newFilters, page: 1 });
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <HeaderHistorial filters={filters} setFilters={setFilters} onSearch={handleSearch} />
      <TableHistorial filters={filters} />
    </div>
  );
};
