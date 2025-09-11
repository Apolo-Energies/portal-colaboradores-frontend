import React from 'react'
import { TableCommission } from '../Table/TableCommission';
import { HeaderCommission } from '../Header/HeaderCommission';

export const CommissionComponent = () => {
  // const [filters, setFilters] = useState({
  //   nombre: "",
  //   email: "",
  //   role: "",
  // });
  return (
    <div className="max-w-7xl mx-auto">
      <HeaderCommission />
      <TableCommission /*filters={filters}*/ />
    </div>
  );
};
