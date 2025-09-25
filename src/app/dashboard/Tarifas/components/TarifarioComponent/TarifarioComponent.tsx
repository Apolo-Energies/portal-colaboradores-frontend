"use client";

import { useEffect, useState } from "react";
import { TarifarioHeader } from "../Header/TarifarioHeader";
import { ProveedorComponent } from "../Proveedor/ProveedorComponent";
import { NavigatorTop } from "../Navigator/NavigatorTop";
import { RepartoComponent } from "../Reparto/RepartoComponent";
import { PotenciaComponent } from "../Potencia/PotenciaComponent";
import { getProveedores, getProveedorById } from "@/app/services/TarifarioService/proveedor.service";
import { useSession } from "next-auth/react";
import { useLoadingStore } from "@/app/store/ui/loading.store";
import { useReloadStore } from "@/app/store/reloadData/reloadFlag.store";
import { Proveedor } from "../../interfaces/proveedor";
import { TarifaComponent } from "../Tarifa/TarifaComponent";

export const TarifarioComponent = () => {
  const [selectedTab, setSelectedTab] = useState("proveedor");
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | null>(null);

  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [tariffData, setTariffData] = useState<Proveedor>();
  // const [repartoData, setRepartoData] = useState<any[]>([]);
  // const [potenciaData, setPotenciaData] = useState<any[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const { data: session, status } = useSession();
  const { setLoading } = useLoadingStore();
  const { reloadFlag } = useReloadStore();

  // Cargar lista de proveedores al montar
  useEffect(() => {
    const fetchProveedores = async () => {
      if (!session?.user.token) return;

      setLoading(true);
      try {
        const response = await getProveedores(session.user.token);
        if (response.isSuccess) {
          setProveedores(response.result);

          // Seleccionamos el primer proveedor por defecto
          if (response.result.length > 0) {
            setSelectedProveedor(response.result[0]);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") fetchProveedores();
  }, [session?.user.token, reloadFlag]);

  // Cada vez que cambia el proveedor seleccionado, cargar sus datos completos
  useEffect(() => {
    const fetchProveedorData = async () => {
      if (!selectedProveedor || !session?.user.token) return;

      setLoading(true);
      try {
        const response = await getProveedorById(selectedProveedor.id, session.user.token);
        if (response.isSuccess && response.result) {
          setTariffData(response.result || []);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProveedorData();
  }, [selectedProveedor, session?.user.token]);

  return (
    <div className="min-h-screen bg-body">
      <div className="p-6 max-w-7xl mx-auto space-y-1">
        <TarifarioHeader
          hasChanges={hasChanges}
          proveedores={proveedores}
          selectedProveedor={selectedProveedor}
          setSelectedProveedor={setSelectedProveedor}
          token={session?.user.token}
        />

        <NavigatorTop selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {selectedTab === "proveedor" && selectedProveedor && (
          <ProveedorComponent
            proveedor={selectedProveedor}
          />
        )}

        {selectedTab === "tarifas" && tariffData?.tarifas && selectedProveedor && (
          <TarifaComponent proveedorId={selectedProveedor.id} tarifas={tariffData?.tarifas} />
        )}

        {selectedTab === "reparto" && tariffData?.tarifas && selectedProveedor && (
          <RepartoComponent tarifas={tariffData?.tarifas} />
        )}

        {selectedTab === "potencia" && tariffData?.tarifas && selectedProveedor && (
          <PotenciaComponent tarifas={tariffData?.tarifas} />
        )}
      </div>
    </div>
  );
};
