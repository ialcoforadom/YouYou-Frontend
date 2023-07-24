import { defineStore } from 'pinia';
import { Claim } from '~/interfaces/auth.interface';

export interface LoginParams {
  userName: string;
  userId: string;
  roles: Claim[];
  accessToken: string;
  name: string;
}

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userName: '',
    userId: '',
    name: '',
    roles: [] as Claim[],
    isLoggedIn: false,
    accessToken: '',
  }),
  actions: {
    setUserName(userName: string) {
      this.userName = userName;
    },
    setName(name: string) {
      this.name = name;
    },
    setRoles(roles: Claim[]) {
      this.roles = roles;
    },
    login(params: LoginParams) {
      this.userName = params.userName;
      this.userId = params.userId;
      this.roles = params.roles;
      this.accessToken = params.accessToken;
      this.name = params.name;
      this.isLoggedIn = true;
    },
    logout() {
      this.userName = '';
      this.userId = '';
      this.roles = [];
      this.name = '';
      this.accessToken = '';
      this.isLoggedIn = false;
    },
  },
  persist: true,
});
