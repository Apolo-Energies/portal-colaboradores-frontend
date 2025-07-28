"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/buttons/button";
import { DropzoneUpload } from "./upload/DropzoneUpload";
import { ComparadorFormModal } from "./modals/ComparadorFormModal";
import { analizarDocumentoMatil } from "@/app/services/MatilService/ocr.service";
import { useLoadingStore } from "@/app/store/ui/LoadingStore";
import { useAlertStore } from "@/app/store/ui/AlertStore";

export const Comparador = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [matilData, setMatilData] = useState<any | null>(null);
  const [file, setFile] = useState<File | string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const { setLoading } = useLoadingStore();
  const { showAlert } = useAlertStore();

  const handleFileSelect = (file: File | string) => {
    setFile(file);
  };

  const handleComparar = async () => {
    if (!file || typeof file !== "string") return;

    setLoading(true);
    try {
      const resultado = await analizarDocumentoMatil(file);
      setMatilData(resultado?.data);
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
        matilData={matilData}
      />
    </div>
  );
};
