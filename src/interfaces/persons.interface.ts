import { Address } from './addresses.interface';

export interface PersonSelect {
  id: number;
  name: string;
}

export interface PersonForm {
  id?: number;
  isCompany: string;
  name: string | null;
  companyName: string | null;
  tradingName: string | null;
  userName: string;
  password: string;
  confirmPassword: string;
  email: string;
  firstNumber: string;
  secondNumber: string | null;
  cpf: string | null;
  cnpj: string | null;
  address: Address | any;
  birthdayDate: string | null;
  genderId: number | null;
  roleId: string | null;
}

export interface Person {
  id: number;
  name: string;
  birthdayDate: string;
  email: string;
  phone: string;
  cpfOrCnpj: string;
  cityName: string;
  genderName: string;
  isActived: boolean;
}
