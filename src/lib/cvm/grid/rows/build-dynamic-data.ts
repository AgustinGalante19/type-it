import type { CvmColDef } from '../columns/types/ColTypes';

export default function buildDynamicData(
  data: string[][],
  colDef: CvmColDef[]
) {
  const rowData = data.map((datosArray) => {
    const row: Record<string, unknown> = {};
    colDef.forEach((col, index) => {
      const normalizedField = col.campo.toString().toLowerCase();
      const value = datosArray[index];
      if (col.tipo === 'DateTime') {
        if (value !== '') {
          const newValue = value.split(' ');
          return newValue.at(0);
        }
        return '';
      }
      if (col.tipo === 'Time') {
        const [hours, minutes] = value.split(':');
        return `${hours}:${minutes}`;
      }
      if (col.tipo === 'Int32' && value === '') {
        return 0;
      }
      if (
        col.tipo === 'Decimal' &&
        (normalizedField.includes('debito') ||
          normalizedField.includes('credito'))
      ) {
        if (value === '0.00') {
          return 0;
        }
      }
      if (col.tipo === 'Decimal') {
        const normalizedNumber = value.toString().replace(/,/g, '.');
        const formattedValue = Number(normalizedNumber).toFixed(2);
        return Number(formattedValue);
      }
      row[normalizedField] = datosArray[index];
    });
    return row;
  });
  return rowData;
}
