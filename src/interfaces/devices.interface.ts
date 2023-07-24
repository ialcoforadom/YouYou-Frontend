export interface Device {
  id: number;
  model: string;
  personName: string;
  code: string;
  isDeleted: boolean;
  isActive: boolean;
}
export interface DeviceForm {
  id?: number;
  model: string;
  code: string;
  personId: number | null;
  status?: boolean;
  history?: DeviceHistory;
}
export interface DeviceHistory {
  personName: string;
  phone: string;
  bindingDate: string;
  unbindingDate: string | null;
  cityName: string;
  status: boolean;
}
