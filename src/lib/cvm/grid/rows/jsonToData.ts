import buildDynamicData from './build-dynamic-data';

export default function converJsonToRowData(json: string) {
  const { columnas, datos } = JSON.parse(json);
  return JSON.stringify(buildDynamicData(datos, columnas), null, 2);
}
