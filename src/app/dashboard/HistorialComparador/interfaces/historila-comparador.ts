export interface HistorialComparador {
    id:           string;
    userId:       string;
    user:         User;
    archivoId:    string;
    archivo:      null;
    cups:         string;
    consumoAnual: number;
    fecha:        Date;
}

export interface User {
    id?:              string;
    nombreCompleto:  string;
    email:           string;
    estadoActivo:    boolean;
    role?:            number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userCommissions?: any[];
}
