"use client";
import React, { useState } from "react";
import { HeaderUser } from "../Header/HeaderUser";
import { TableUsers } from "../Table/TableUsers";

export const UserComponent = () => {
  const [filters, setFilters] = useState({
    nombre: "",
    email: "",
    role: "",
  });
  return (
    <div className="max-w-7xl mx-auto">
      <HeaderUser filters={filters} setFilters={setFilters} />
      <TableUsers filters={filters} />
    </div>
  );
};
