import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

import { Loading } from 'quasar';
import { useUserStore } from 'src/stores/userStore';

const baseUrl = process.env.BASE_URL;

const isDevelopment = process.env.NODE_ENV === 'development';

const userStore = useUserStore();

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: baseUrl });

setAuthorizationTokenHeader(userStore.accessToken);

api.interceptors.response.use(
  (response) => {
    Loading.hide();
    return response;
  },
  (error) => {
    Loading.hide();
    if (isDevelopment) {
      const errorInfo = {
        URL: error.response.request.responseURL,
        data: error.response.data !== null ? error.response.data : null,
        status: error.response.request.status,
        headers: error.response.headers,
      };
      console.log('Error Info:', errorInfo);
    }
    return error;
  }
);

api.interceptors.request.use((request) => {
  Loading.show({
    delay: 400,
  });

  return request;
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export function setAuthorizationTokenHeader(accessToken: string) {
  api.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
}

export { api };
