import { LoginParams, useUserStore } from './../stores/userStore';
import { api, setAuthorizationTokenHeader } from 'src/boot/axios';
import { AuthMeResponse, AuthLoginRequest } from '../interfaces/auth.interface';
import { DefaultResponse } from '~/interfaces/defaultResponse.interface';

const BASE_URL = `${process.env.BASE_URL}/Auth`;
const userStore = useUserStore();

const AuthService = {
  async login({ userName, password }: AuthLoginRequest) {
    try {
      const response = await api.post<DefaultResponse<AuthMeResponse>>(
        `${BASE_URL}/Login`,
        {
          userName,
          password,
        }
      );
      const { data } = response.data;
      const loginParams: LoginParams = {
        userName: data.userToken.userName,
        roles: data.userToken.claims,
        userId: data.userToken.id,
        accessToken: data.accessToken,
        name: data.userToken.name,
      };
      setAuthorizationTokenHeader(data.accessToken);
      userStore.login(loginParams);
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },
  async logout() {
    try {
      await api.post(`${BASE_URL}/Logout`);
      userStore.logout();
      localStorage.removeItem('userStore');
    } catch (error) {
      throw Error('Server unavailable, try again later');
    }
  },
};

export { AuthService };
