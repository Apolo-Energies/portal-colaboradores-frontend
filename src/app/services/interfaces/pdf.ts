export interface PDF {
    usuario:   string;
    archivoId: string;
    cups:      string;
    datos:     Datos;
    cliente:   Cliente;
    totales:   Totales;
    lineas:    Linea[];
}

export interface Cliente {
    nombreCliente: string;
    razonSocial: string;
    cif:         string;
    direccion:   string;
}

export interface Datos {
    titulo:           string;
    tarifa:           string;
    modalidad:        string;
    periodo:          string;
    diasFactura:      number;
    ahorro:           number;
    ahorroPorcentaje: number;
    ahorroAnual:      number;
    consumoAnual:     number;
}

export interface Linea {
    termino:      string;
    unidad:       Unidad;
    valor:        number;
    precioActual: number;
    costeActual:  number;
    precioOferta: number;
    costeOferta:  number;
}

export enum Unidad {
    KW = "kW",
    KWh = "kWh",
}

export interface Totales {
    baseActual:              number;
    baseOferta:              number;
    impuestoElectricoActual: number;
    impuestoElectricoOferta: number;
    alquilerEquipo:          number;
    ivaActual:               number;
    ivaOferta:               number;
    totalActual:             number;
    totalOferta:             number;
    otrosNoComunesActual:    number;
    otrosNoComunesOferta:    number;
    otrosComunesSinIeOferta:  number;
    otrosComunesSinIeActual:  number;
    otrosComunesConIeActual:  number;
    otrosComunesConIeOferta:  number;
}
