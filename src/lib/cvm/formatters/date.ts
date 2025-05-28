import { parse } from 'date-fns';

export const localeFormat = (fechaOrigen: string) => {
  if (fechaOrigen) {
    const parsedDate = parse(fechaOrigen, 'yyyy-MM-dd', new Date());

    return new Intl.DateTimeFormat(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(parsedDate);
  }
  return '';
};
