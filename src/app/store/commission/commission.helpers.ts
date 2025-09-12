import { CalcularComisionParams } from "./commission.types";


export const calculateComisionFunction = ({
    matilData,
    feeEnergia,
    comisionEnergia,
    feePotencia,
    productoSeleccionado
  }: CalcularComisionParams): number => {
    // console.log("DEBUG datos entrada: ", {
    //   matilData,
    //   feeEnergia: feeEnergia[0],
    //   comisionEnergia,
    //   feePotencia: feePotencia[0],
    //   productoSeleccionado,
    // });
    if (!matilData?.energia || !matilData?.potencia) return 0;

    const consumoPeriodo =
      matilData.energia.reduce((acc, item) => acc + (item.kwh ?? 0), 0) ?? 0;
      
      // console.log("consumo periodo: ", 10 * consumoPeriodo)
      
      const coeficienteEnergia = 10 * consumoPeriodo;
      // console.log('DEBUG datos operacion Energia: ', {feePotencia: feeEnergia[0], comisionEnergia, consumoPeriodo})
      const energia = (feeEnergia[0] * comisionEnergia * coeficienteEnergia) / 1000;
      
      const potenciaContratada = matilData.potencia.reduce(
        (acc, item) => acc + (item.kw ?? 0),
        0
      );
      
      const coeficientePotencia = 0.5;
      const potencia = feePotencia[0] * coeficientePotencia * potenciaContratada;
      // console.log('DEBUG datos operacion Potencia: ', {energia, potencia})
      
    return energia + potencia;
  };