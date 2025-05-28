export const localeFormatNumber = ({
  field,
  originalValue,
}: {
  field: string;
  originalValue: string;
}): string => {
  let resultado = originalValue;
  const numberAsNumber = Number.parseFloat(originalValue);

  //* Tabla totales consulta de movimientos
  if ((field === 'valor1' || field === 'pc_valor2') && numberAsNumber === 0) {
    return '';
  }

  const hasDecimals = field.startsWith('vl_') || field.startsWith('pc_');

  resultado = new Intl.NumberFormat(undefined, {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: hasDecimals ? 2 : 0,
  }).format(numberAsNumber);
  return resultado;
};
