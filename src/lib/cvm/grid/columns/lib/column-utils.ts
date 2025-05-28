import { localeFormat } from '@/lib/cvm/formatters/date';
import type { ColDataType } from '../types/ColTypes';
import { localeFormatNumber } from '@/lib/cvm/formatters/number';

export const alignmentSolver = (type: string): string => {
  let alignment = '';
  if (type === 'Decimal') {
    alignment = 'right';
  } else if (type === 'String') {
    alignment = 'left';
  } else {
    alignment = 'center';
  }
  return alignment;
};

export const typeSolver = (type: string) => {
  let filterType = '';
  if (type === 'Decimal' || type === 'Int32') {
    filterType = 'agNumberColumnFilter';
  } else if (type === 'DateTime') {
    filterType = 'agDateColumnFilter';
  } else {
    filterType = 'agTextColumnFilter';
  }

  return filterType;
};

export const isColumnHidden = (field: string): boolean => {
  const isHidden: { [key: string]: boolean } = {
    ID_CC_CBTE: true,
    ID_CC_RECIBO: true,
    ID_ENTIDAD: true,
    TF: true,
    TIPOTOTALES: true,
    IDTOTALES: true,
    TIPOFILATOTALES: true,
    ID_IMAGEN: true,
    ID_CBTE_TIPO: true,
  };

  return isHidden[field] ? isHidden[field] : false;
};

export const formatSolver = ({
  type,
  value,
  campo,
}: {
  type: ColDataType | string;
  value: string;
  campo: string;
}) => {
  let resultado = value;
  if (type === 'DateTime') {
    resultado = localeFormat(value);
  } else if (type === 'Decimal' || type === 'Int32') {
    resultado = localeFormatNumber({ field: campo, originalValue: value });
  }
  return resultado;
};
