"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/buttons/button";
import { DropzoneUpload } from "./upload/DropzoneUpload";
import { ComparadorFormModal } from "./modals/ComparadorFormModal";
import { useLoadingStore } from "@/app/store/ui/loading.store";
import { useAlertStore } from "@/app/store/ui/alert.store";
import { subirYProcesarDocumento } from "@/app/services/MatilService/ocr.service";
import { getTipoArchivo } from "@/utils/typeFile";
import { OcrData } from "../interfaces/matilData";
import { useSession } from "next-auth/react";
import { getProveedorByUser } from "@/app/services/TarifarioService/proveedor.service";
import { useTarifaStore } from "@/app/store/tarifario/tarifa.store";

export const Comparador = () => {
  const [matilData, setMatilData] = useState<unknown | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  
  const [file, setFile] = useState<File | string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  
  const { setLoading } = useLoadingStore();
  const { showAlert } = useAlertStore();
  
  const { setTarifas, setProveedorActual } = useTarifaStore();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchTarifas = async () => {
      if (!session?.user?.token) return;

      try {
        const response = await getProveedorByUser(session.user.token);

        if (response.isSuccess && response.result) {
          setProveedorActual(response.result);
          setTarifas(response.result.tarifas ?? []);
        } else {
          console.error("Error cargando tarifas:", response.errorMessages);
        }
      } catch (err) {
        console.error("Fallo al obtener tarifas:", err);
      }
    };

    fetchTarifas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.token]);

  const handleFileSelect = (file: File | string) => {
    setFile(file);
  };


  const handleComparar = async () => {
    if (!file || typeof file === "string") return;
  
    setLoading(true);
    try {
      const tipo = getTipoArchivo(file);
      const nombre = file.name.split(".")[0];
  
      const token = session?.user?.token;
  
      if (!token) {
        showAlert("No se encontró el token de autenticación.", "error");
        setLoading(false);
        return;
      }
  
      const resultado = await subirYProcesarDocumento(token, file, nombre, tipo);
  
      setMatilData(resultado?.result?.ocrData);
      setFileId(resultado?.result?.id);
      setOpenModal(true);
      showAlert("Documento procesado correctamente.", "success");
    } catch (error) {
      console.error("Error al analizar documento:", error);
      showAlert("Error al procesar el documento.", "error");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen px-6 py-8 space-y-6">
      <div>
        <p className="text-2xl text-foreground font-bold">
          Comparador de Precios
        </p>
        <p className="text-muted-foreground">
          Sube tu factura para realizar comparaciones y ajustes.
        </p>
      </div>

      <div className="flex justify-center">
        <Card className="w-full max-w-2xl rounded-xl p-6 space-y-4">
          <DropzoneUpload onFileSelect={handleFileSelect} />
          <div className="flex justify-center">
            <Button size="sm" onClick={handleComparar} disabled={!file}>
              Comparar
            </Button>
          </div>
        </Card>
      </div>

      <ComparadorFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        matilData={matilData as OcrData | undefined}
        fileId={fileId || ""}
        token={session?.user.token || ""} 
      />
    </div>
  );
};
