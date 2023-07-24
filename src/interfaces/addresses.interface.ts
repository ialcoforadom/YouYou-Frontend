export interface Address {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string | null;
  stateId: number | null;
  cityId: number | null;
}
