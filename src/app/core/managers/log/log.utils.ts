export const mapColors: { [index: string]: any } = {
  Component: '#02a5d4',
  Service: '#7d02d4',
  Controller: '#022cd4',
  Model: '#d4d102',
  Module: '#d45302',
};

export const truncate = (str: string) => str.split('_')[1];
export const separateThroughUpperCase = (str: string) =>
  str.split(/(?=[A-Z])/).filter((part) => part !== '');

export function getColor(str: string) {
  const element = separateThroughUpperCase(str)[separateThroughUpperCase(str).length - 1];
  return mapColors[element] ?? '#000000';
}
