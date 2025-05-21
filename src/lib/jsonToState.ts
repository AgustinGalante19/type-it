export default function convertJsonToState(json: string): string {
  const parsed = JSON.parse(json);

  const getEmptyValue = (value: unknown): unknown => {
    if (Array.isArray(value)) return [];
    if (typeof value === 'string') return '';
    if (typeof value === 'number') return 0;
    if (typeof value === 'boolean') return false;
    if (typeof value === 'object' && value !== null) {
      const obj: Record<string, unknown> = {};
      const entries = Object.entries(value);
      for (const [key, val] of entries) {
        obj[key] = getEmptyValue(val);
      }
      return obj;
    }
    return null;
  };

  const initialState = getEmptyValue(parsed);
  return JSON.stringify(initialState, null, 2);
}
