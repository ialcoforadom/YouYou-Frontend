export const requiredMoney = (value: string) => {
  const numberValue = Number(value);
  return numberValue !== 0;
};
