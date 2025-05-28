const getColType = (key: string) => {
  if (
    key.startsWith('vl_') ||
    key.startsWith('pc_') ||
    key.startsWith('id_') ||
    key.startsWith('qt_')
  ) {
    return 'Decimal';
  }
  if (key.startsWith('dt_')) {
    return 'DateTime';
  }
  if (key.startsWith('ds_') || key.startsWith('cd_')) {
    return 'String';
  }

  return 'String';
};

interface CvmColDef {
  campo: string;
  titulo: string;
  tipo: string;
  longitud: string;
  dec: string;
  alinea: string;
}

export default function converJsonToCvmColDef(json: string) {
  const keys = Object.keys(json);
  const result: CvmColDef[] = [];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const colType = getColType(key);
    result.push({
      campo: key,
      titulo: key.toUpperCase(),
      tipo: colType,
      longitud: '0',
      dec: '0',
      alinea: '',
    });
  }
  return JSON.stringify(result, null, 2);
}
