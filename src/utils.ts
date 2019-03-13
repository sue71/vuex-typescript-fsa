/**
 * makeType with prefix
 * @param type
 * @param prefix
 */
export function makeType(type: string, prefix?: string): string {
  if (prefix) {
    return `${prefix}/${type}`;
  }
  return type;
}
