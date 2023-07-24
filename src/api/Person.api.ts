import { api } from 'src/boot/axios';
import { Filter, PaginationResponse } from '~/interfaces/pagination.interface';
import {
  Person,
  PersonForm,
  PersonSelect,
} from 'src/interfaces/persons.interface';

const BASE_URL = `${process.env.BASE_URL}`;

const PersonApi = {
  async createPerson(person: PersonForm) {
    try {
      const response = await api.post(`${BASE_URL}/Person`, person);
      const data = response.data;
      return data;
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },
  async updatePerson(person: PersonForm) {
    try {
      const response = await api.put(`${BASE_URL}/Person`, person);
      const data = response.data;
      return data;
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },
  async getPerson(personId: number) {
    try {
      const response = await api.get<PersonForm>(
        `${BASE_URL}/Person/${personId}`
      );
      const data = response.data;
      return data;
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },
  async getPersonList(filters: Filter) {
    try {
      const response = await api.get<PaginationResponse<Person>>(
        `${BASE_URL}/Person`,
        {
          params: filters,
        }
      );
      const data = response.data;
      return data;
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },
  async getPersonsToSelect() {
    try {
      const response = await api.get<PersonSelect[]>(
        `${BASE_URL}/Person/GetPersonsToSelect`
      );
      const data = response.data;
      return data;
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },
  async deletePerson(personId: number) {
    try {
      await api.delete(`${BASE_URL}/Person/${personId}`);
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },
  async enablePerson(personId: number) {
    try {
      await api.put(`${BASE_URL}/Person/Enable/${personId}`);
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },
  async disablePerson(personId: number) {
    try {
      await api.put(`${BASE_URL}/Person/Disable/${personId}`);
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },
};

export { PersonApi };
