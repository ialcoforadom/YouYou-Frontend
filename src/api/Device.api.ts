import { api } from 'src/boot/axios';
import {
  Filter,
  PaginationResponse,
} from 'src/interfaces/pagination.interface';
import { Device, DeviceForm } from '~/interfaces/devices.interface';

const BASE_URL = `${process.env.BASE_URL}`;

const DeviceApi = {
  async getDeviceList(filters: Filter) {
    try {
      const response = await api.get<PaginationResponse<Device>>(
        `${BASE_URL}/Devices`,
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
  async getDevice(deviceId: number) {
    try {
      const response = await api.get<DeviceForm>(
        `${BASE_URL}/Devices/${deviceId}`
      );
      const data = response.data;
      return data;
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },
  async enableDevice(deviceId: number) {
    try {
      await api.put(`${BASE_URL}/Devices/Enable/${deviceId}`);
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },
  async disableDevice(deviceId: number) {
    try {
      await api.put(`${BASE_URL}/Devices/Disable/${deviceId}`);
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },
  async createDevice(device: DeviceForm) {
    try {
      const response = await api.post(`${BASE_URL}/Devices`, device);
      const data = response.data;
      return data;
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },
  async updateDevice(device: DeviceForm) {
    try {
      const response = await api.put(`${BASE_URL}/Devices`, device);
      const data = response.data;
      return data;
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },
  async deleteDevice(deviceId: number) {
    try {
      await api.delete(`${BASE_URL}/Devices/${deviceId}`);
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },
};

export { DeviceApi };
