<template>
  <q-layout>
    <q-page-container class="body--light-login">
      <q-page>
        <div
          class="flex justify-center items-center full-height"
          style="background-color: #eba29b; height: 100%"
        >
          <div class="login-form-wrapper flex justify-center">
            <div class="lets-start-label">
              <label>Vamos começar?</label>
            </div>
            <div class="text-youyou">
              <label
                ><b>Pessoas</b> diferentes criam
                <p>coisas <b>incríveis</b> juntas</p></label
              >
            </div>
            <form class="row full-width">
              <div class="col-12">
                <login-input-field-wrapper
                  label="Usuário"
                  :errors="v$.email.$errors"
                >
                  <p>
                    <input
                      class="input-login"
                      v-model="form.email"
                      hide-bottom-space
                    /></p
                ></login-input-field-wrapper>
              </div>
              <div class="col-12 right q-mt-sm">
                <login-input-field-wrapper
                  label="Senha"
                  :errors="v$.password.$errors"
                >
                  <p>
                    <input
                      class="input-login"
                      v-model="form.password"
                      :error="v$.password.$error"
                      @keyup.enter="login"
                      type="password"
                      hide-bottom-space
                    /></p
                ></login-input-field-wrapper>
              </div>
              <div class="col-12 text-center q-mt-md">
                <q-btn
                  :loading="isButtonLoading"
                  @click="login"
                  no-caps
                  class="botao-login"
                  color="#3c5f32"
                >
                  Entrar</q-btn
                >
                <!-- <span class="forgot-password"> Esqueceu a senha? </span> -->
              </div>
              <div class="logo">
                <img :src="logo" alt="system logo" style="width: 100px" />
              </div>
            </form>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import logo from '../assets/logoyouyou.png';
import teste from '../assets/youyouhashtag.png';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';
import { AuthService } from 'src/services/AuthService';
import { ref } from 'vue';
import LoginInputFieldWrapper from 'src/components/LoginInputFieldWrapper.vue';
import { AuthLoginRequest } from 'src/interfaces/auth.interface';

const isButtonLoading = ref(false);
const router = useRouter();

const form = ref({
  email: '',
  password: '',
});

const rules = {
  email: {
    required: helpers.withMessage('Informe seu email', required),
  },
  password: {
    required: helpers.withMessage('Informe sua senha', required),
  },
};
const v$ = useVuelidate(rules, form);

async function login() {
  v$.value.$touch();
  const formData: AuthLoginRequest = {
    userName: form.value.email.toLowerCase(),
    password: form.value.password,
  };
  if (!v$.value.$invalid) {
    try {
      isButtonLoading.value = true;
      await AuthService.login(formData);
      router.push('/');
    } catch (err) {
      Notify.create('Usuário ou senha incorretos, verifique e tente novamente');
    } finally {
      isButtonLoading.value = false;
    }
  }
}
</script>
<style scoped lang="scss">
.login-form-wrapper {
  width: 500px;
  padding: 0 15px;
  margin-top: 55px;
}
.text-youyou {
  background-color: #3c5f32;
  padding: 10px 10px 0px 10px;
  color: white;
  text-align: center;
  font-family: Montserrat;
  letter-spacing: 10px;
  margin: 25px 0px 25px 0px;
}
.lets-start-label {
  font-size: 50px;
  color: white;
  font-family: Stretch;
  line-height: 40px;
  text-align: center;
}
.forgot-password {
  font-weight: 600;
  color: $primary;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: #004d99;
  }
}
.logo {
  text-align: center;
  width: 100%;
  margin: 50px;
}
.botao-login {
  width: 140px;
  background-color: #3c5f32;
  color: #3c5f32;
}
.input-login {
  border: 3px solid white;
  border-radius: 30px;
  padding-left: 20px;
  background-color: #eba29b;
  width: 80%;
  height: 50px;
  color: white;
  font-size: 15px;
  font-weight: 500;
}
</style>
