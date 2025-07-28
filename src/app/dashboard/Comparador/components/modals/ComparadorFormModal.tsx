"use client";

import React, { useState } from "react";
import { Download, Mail } from "lucide-react";
import { Dialog } from "@/components/Dialogs/Dialog";
import { Button } from "@/components/buttons/button";
import { Input } from "@/components/Inputs/Input";
import { Slider } from "@/components/ui/Slider";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  matilData?: any;
}

type FormData = {
  producto: string;
};

export const ComparadorFormModal = ({ open, onClose, matilData }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      producto: "Index base",
    },
  });
  const [feeEnergia, setFeeEnergia] = useState([83]);
  const [feePotencia, setFeePotencia] = useState([83]);

  console.log("Matil Data:", matilData);

  const calcularComision = () => {
    const base = 2000;
    const factor = (feeEnergia[0] + feePotencia[0]) / 200;
    return (base * factor * 1.2295).toFixed(0);
  };

  const calcularAhorro = () => {
    const base = 300;
    const factor = (feeEnergia[0] + feePotencia[0]) / 200;
    return (base * factor * 0.79).toFixed(0);
  };

  const calcularPorcentajeExtra = () => {
    const basePercentage = 8;
    const factor = (feeEnergia[0] + feePotencia[0]) / 200;
    return (basePercentage * factor + 2).toFixed(1);
  };

  const calcularAhorroAnual = () => {
    const baseAmount = 10000;
    const factor = (feeEnergia[0] + feePotencia[0]) / 200;
    return (baseAmount * factor * 1.2).toFixed(0);
  };

  const handleEnviarCliente = () => {
    console.log("Enviando al cliente...");
  };

  const handleDescargarPDF = () => {
    console.log("Descargando PDF...");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">
            Configura el producto
          </p>
        </div>

        <div className="space-y-2">
          <Input
            label="Producto a ofertar"
            name="producto"
            placeholder="Index base"
            register={register}
            required
            errors={errors}
          />
        </div>

        <div className="space-y-2">
          <div className="flex pb-2 items-center">
            <label
              htmlFor="feeEnergia"
              className="text-sm font-medium text-foreground"
            >
              Fee energía
            </label>
          </div>

          <div className="relative w-full">
            <div
              className={`absolute -top-4 text-xs font-semibold transition-colors 
    ${
      feeEnergia[0] === 0
        ? "text-red-500"
        : feeEnergia[0] === 100
        ? "text-green-600"
        : "text-foreground"
    }`}
              style={{
                left: `${feeEnergia[0]}%`,
                transform: "translateX(-50%)",
              }}
            >
              {feeEnergia[0]}
            </div>

            <Slider
              value={feeEnergia}
              onValueChange={setFeeEnergia}
              max={100}
              min={0}
              step={1}
            />
            <div className="flex justify-end">
              <span
                className={`text-sm font-semibold transition-colors ${
                  feeEnergia[0] === 100 ? "text-green-600" : "text-foreground"
                }`}
              >
                100
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex pb-2 items-center">
            <label
              htmlFor="feePotencia"
              className="text-sm font-medium text-foreground"
            >
              Fee potencia
            </label>
          </div>

          <div className="relative w-full">
            <div
              className={`absolute -top-4 text-xs font-semibold transition-colors 
    ${
      feePotencia[0] === 0
        ? "text-red-500"
        : feePotencia[0] === 100
        ? "text-green-600"
        : "text-foreground"
    }`}
              style={{
                left: `${feePotencia[0]}%`,
                transform: "translateX(-50%)",
              }}
            >
              {feePotencia[0]}
            </div>

            <Slider
              value={feePotencia}
              onValueChange={setFeePotencia}
              max={100}
              min={0}
              step={1}
            />
          </div>
          <div className="flex justify-end">
            <span
              className={`text-sm font-semibold transition-colors ${
                feePotencia[0] === 100 ? "text-green-600" : "text-foreground"
              }`}
            >
              100
            </span>
          </div>
        </div>

        {/* Resultados */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-input">
            <p className="text-sm font-medium text-foreground mb-1">
              Comisión comercial
            </p>
            <p className="text-2xl font-bold text-foreground">
              {calcularComision()}€
            </p>
            <p className="text-sm text-green-500">
              +{calcularPorcentajeExtra()}% extra
            </p>
          </div>

          <div className="p-4 rounded-lg bg-input">
            <p className="text-sm font-medium text-foreground mb-1">
              Ahorro cliente
            </p>
            <p className="text-2xl font-bold text-foreground">
              {calcularAhorro()}€ al mes
            </p>
            <p className="text-sm text-green-500">
              +{calcularAhorroAnual()}€ al año
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-2 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleEnviarCliente}
            className="flex-1"
          >
            <Mail className="w-4 h-4 mr-2" />
            Enviar al cliente
          </Button>
          <Button onClick={handleDescargarPDF} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Descargar en PDF
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
