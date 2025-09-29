import React, { useEffect, useState } from "react";
import { HistorialComparador } from "../../interfaces/historila-comparador";
import { useSession } from "next-auth/react";
import { Column, DataTable } from "@/components/ui/DataTable";
import { HistorialFilters } from "../../interfaces/historial-filter";
import { useLoadingStore } from "@/app/store/ui/loading.store";
import { getHistorialComparador } from "@/app/services/HistorialService/historial.service";

interface Props {
  filters: HistorialFilters;
}

export const TableHistorial = ({ filters }: Props) => {
  const [historials, setHistorials] = useState<HistorialComparador[]>([]);
  const { setLoading } = useLoadingStore();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        if (!session?.user.token) {
          return;
        }
        const response = await getHistorialComparador(session.user.token, filters);
        if (response.status === 200) {
          setHistorials(response.result);
        } else {
          console.error("Error cargando usuarios:", response.result);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.token, filters]);

  const columns: Column<HistorialComparador>[] = [
    {
      key: "usuario",
      label: "Usuario",
      align: "center",
      render: (item: HistorialComparador) => (
        <div>
          {item.user?.nombreCompleto}
        </div>
      ),
    },
    {
      key: "Correo",
      label: "Correo",
      align: "center",
      render: (item: HistorialComparador) => <div>{item.user?.email}</div>,
    },
    {
      key: "cups",
      label: "CUPS",
      align: "center"
    },
    {
      key: "consumoAnual",
      label: "Consumo Anual",
      render: (item: HistorialComparador) => item.consumoAnual ?? 0,
      align: "center",
    },
    {
      key: "fecha",
      label: "Fecha",
      align: "center",
      render: (item: HistorialComparador) =>
        new Date(item.fecha).toLocaleString(),
    },
  ];

  return <DataTable data={historials} columns={columns} rowKey="id" />;
};
