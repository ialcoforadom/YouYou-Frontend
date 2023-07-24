export function removeMoneyMask(value: string) {
  if (value) {
    return Number(value.replace(',', '.'));
  }
  return null;
}

export function addMoneyMask(value: number) {
  return Number(value).toLocaleString('pt-br', {
    currency: 'BRL',
    style: 'currency',
  });
}
