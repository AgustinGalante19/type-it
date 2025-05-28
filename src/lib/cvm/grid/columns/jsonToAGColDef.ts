import type { ColDef as ColDefProps, ColGroupDef } from 'ag-grid-community';
import type { DynamicColumns } from './types/ColTypes';
import {
  alignmentSolver,
  formatSolver,
  isColumnHidden,
  typeSolver,
} from './lib/column-utils';
import RowNumber from '../rows/row-number';

export function buildDynamicColumns({
  colsDef,
  lastRow,
  checkbox = false,
  hasNroFila = true,
}: DynamicColumns): ColDefProps[] | ColGroupDef[] {
  const results = colsDef.map((col) => {
    const alineacion = alignmentSolver(col.tipo);
    const filtro = typeSolver(col.tipo);
    const isHidden = isColumnHidden(col.campo);
    const isDate = col.tipo === 'DateTime';

    const colDefResult: ColDefProps | ColGroupDef = {
      headerName: col.titulo === '' ? col.campo : col.titulo,
      field: col.campo.toLowerCase(),
      cellStyle: { textAlign: alineacion },
      headerClass: 'header-text-center',
      resizable: true,
      sortable: true,
      filter: filtro,
      hide: isHidden,
      cellDataType: isDate ? 'date' : undefined,
      valueFormatter: (params) =>
        formatSolver({
          type: col.tipo,
          value: params.data[col.campo.toLowerCase()],
          campo: col.campo.toLowerCase(),
        }),
      filterParams: isDate && {
        comparator: filterDateComparator,
      },
    };

    if (col.subItems) {
      const colGroupDefResult: ColGroupDef = {
        ...colDefResult,
        children: buildDynamicColumns({
          lastRow,
          colsDef: col.subItems,
          hasNroFila: false,
        }),
      };

      return colGroupDefResult;
    }

    return colDefResult;
  });

  return hasNroFila ? [buildNroFila(lastRow, checkbox), ...results] : results;
}

export const buildNroFila = (
  dataLength: number,
  checkbox: boolean
): ColDefProps => {
  const nroFila: ColDefProps = {
    maxWidth: checkbox ? 110 : 70,
    cellRenderer: ({ rowIndex }: { rowIndex: number }) => {
      const index = rowIndex + 1;
      const qtRegs = dataLength;
      const qtDigits = qtRegs.toString().length;
      const rowIndexFormatted = index.toString().padStart(qtDigits, '0');
      return RowNumber({ rowIndexFormatted });
    },
    checkboxSelection: checkbox,
    headerClass: 'header-text-center hide-filter-icon',
    cellStyle: { textAlign: 'center', backgroundColor: '#e8e8e8' },
    filter: false,
    pinned: 'left',
    lockPosition: true,
    sortable: false,
    floatingFilter: false,
    headerComponentParams: {
      supressMenu: true,
      menuIcon: null,
    },
  };
  return nroFila;
};

function filterDateComparator(
  filterLocalDateAtMidnight: Date,
  cellValue: string
) {
  const dateParts = cellValue.split('-');
  const year = Number(dateParts[0]);
  const month = Number(dateParts[1]) - 1;
  const day = Number(dateParts[2]);
  const cellDate = new Date(year, month, day);

  if (cellDate < filterLocalDateAtMidnight) {
    return -1;
  }

  if (cellDate > filterLocalDateAtMidnight) {
    return 1;
  }
  return 0;
}

export default function converJsonToAGColDef(json: string) {
  return JSON.stringify(
    buildDynamicColumns({
      colsDef: JSON.parse(json),
      lastRow: 0,
      checkbox: false,
      hasNroFila: false,
    }),
    null,
    2
  );
}
