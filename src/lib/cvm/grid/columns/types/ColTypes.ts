export type ColDataType = 'DateTime' | 'String' | 'Int32' | 'Decimal';

export interface CvmColDef {
  campo: string;
  titulo: string;
  tipo: string;
  longitud: string;
  dec: string;
  alinea: string;
  subItems?: CvmColDef[];
}

export interface DynamicColumns {
  colsDef: CvmColDef[];
  lastRow: number;
  checkbox?: boolean;
  hasNroFila?: boolean;
}
