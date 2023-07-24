<template>
  <q-dialog :model-value="open" persistent>
    <q-card class="dialog-card">
      <q-linear-progress v-if="isPersonLoading" indeterminate />
      <q-card-section class="flex">
        <div class="default-title">
          {{ title }}
        </div>
        <q-space />
        <q-btn @click="closeDialog" size="12px" flat round icon="close" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="q-pa-md" v-if="!readonly && !edit">
          <div class="q-gutter-sm">
            <q-radio
              class="label"
              v-model="isCompanyRadio"
              size="xs"
              val="true"
              label="Empresa"
              @update:model-value="isJuridicalPerson"
            />
            <q-radio
              class="label"
              v-model="isCompanyRadio"
              size="xs"
              val="false"
              label="Pessoal"
              @update:model-value="isPhysicalPerson"
            />
          </div>
        </div>
        <q-tabs
          v-model="currentTab"
          dense
          align="justify"
          indicator-color="#36b363"
          style="color: #36b363"
        >
          <q-tab name="personal" label="Dados Gerais" no-caps />
          <q-tab name="address" label="Endereço" no-caps />
          <q-tab
            v-if="!readonly"
            name="access"
            label="Dados de Acesso"
            no-caps
          />
        </q-tabs>
        <q-tab-panels v-model="currentTab" animated>
          <q-tab-panel name="personal" class="q-pa-none">
            <div :hidden="hiddenJuricalPerson">
              <div class="row q-col-gutter-x-md q-mt-md">
                <div class="col-4">
                  <input-field-wrapper
                    label="Razão Social"
                    :errors="juridicalPersonValidation.companyName.$errors"
                  >
                    <q-input
                      v-model="personForm.companyName"
                      :error="juridicalPersonValidation.companyName.$error"
                      :readonly="readonly"
                      hide-bottom-space
                      outlined
                      dense
                    />
                  </input-field-wrapper>
                </div>
                <div class="col-4">
                  <input-field-wrapper label="Nome Fantasia">
                    <q-input
                      v-model="personForm.tradingName"
                      :readonly="readonly"
                      hide-bottom-space
                      outlined
                      dense
                    />
                  </input-field-wrapper>
                </div>
                <div class="col-4">
                  <input-field-wrapper
                    label="CNPJ"
                    :errors="juridicalPersonValidation.cnpj.$errors"
                  >
                    <q-input
                      v-model="personForm.cnpj"
                      :error="juridicalPersonValidation.cnpj.$error"
                      :readonly="readonly"
                      hide-bottom-space
                      outlined
                      dense
                    />
                  </input-field-wrapper>
                </div>
              </div>
            </div>
            <div :hidden="!hiddenJuricalPerson">
              <div class="row q-col-gutter-x-md q-mt-md">
                <div class="col-4">
                  <input-field-wrapper
                    label="Nome"
                    :errors="physicalPersonValidation.name.$errors"
                  >
                    <q-input
                      v-model="personForm.name"
                      :error="physicalPersonValidation.name.$error"
                      :readonly="readonly"
                      hide-bottom-space
                      outlined
                      dense
                    />
                  </input-field-wrapper>
                </div>
                <div class="col-4">
                  <input-field-wrapper
                    label="Cpf"
                    :errors="physicalPersonValidation.cpf.$errors"
                  >
                    <q-input
                      v-model="personForm.cpf"
                      :error="physicalPersonValidation.cpf.$error"
                      :readonly="readonly"
                      hide-bottom-space
                      outlined
                      dense
                    />
                  </input-field-wrapper>
                </div>
                <div class="col-4">
                  <input-field-wrapper label="Aniversário">
                    <q-input
                      v-model="personForm.birthdayDate"
                      :readonly="readonly"
                      hide-bottom-space
                      outlined
                      dense
                    >
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="personForm.birthdayDate"
                              mask="YYYY-MM-DD"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </input-field-wrapper>
                </div>
              </div>
            </div>
            <div class="row q-col-gutter-x-md q-mt-md">
              <div class="col-4">
                <input-field-wrapper
                  label="Email"
                  :errors="commonPersonValidation.email.$errors"
                >
                  <q-input
                    v-model="personForm.email"
                    :error="commonPersonValidation.email.$error"
                    :readonly="readonly"
                    hide-bottom-space
                    outlined
                    dense
                  />
                </input-field-wrapper>
              </div>
              <div class="col-4">
                <input-field-wrapper
                  label="Celular"
                  :errors="commonPersonValidation.firstNumber.$errors"
                >
                  <q-input
                    v-model="personForm.firstNumber"
                    :error="commonPersonValidation.firstNumber.$error"
                    :readonly="readonly"
                    hide-bottom-space
                    outlined
                    dense
                  />
                </input-field-wrapper>
              </div>
              <div class="col-4">
                <input-field-wrapper label="Telefone">
                  <q-input
                    v-model="personForm.secondNumber"
                    :readonly="readonly"
                    hide-bottom-space
                    outlined
                    dense
                  />
                </input-field-wrapper>
              </div>
            </div>
            <div class="row q-col-gutter-x-md q-mt-md">
              <div class="col-4" :hidden="!hiddenJuricalPerson">
                <input-field-wrapper label="Genero">
                  <q-input
                    type="number"
                    v-model="personForm.genderId"
                    :readonly="readonly"
                    hide-bottom-space
                    outlined
                    dense
                  />
                </input-field-wrapper>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="address" class="q-pa-none">
            <div class="row q-col-gutter-x-md q-mt-md">
              <div class="col-4">
                <input-field-wrapper label="CEP">
                  <q-input
                    v-model="addressForm.cep"
                    :readonly="readonly"
                    hide-bottom-space
                    outlined
                    dense
                  />
                </input-field-wrapper>
              </div>
              <div class="col-4">
                <input-field-wrapper label="Estado">
                  <q-input
                    type="number"
                    v-model="addressForm.stateId"
                    :readonly="readonly"
                    hide-bottom-space
                    outlined
                    dense
                  />
                </input-field-wrapper>
              </div>
              <div class="col-4">
                <input-field-wrapper label="Cidade">
                  <q-input
                    type="number"
                    v-model="addressForm.cityId"
                    :readonly="readonly"
                    hide-bottom-space
                    outlined
                    dense
                  />
                </input-field-wrapper>
              </div>
            </div>
            <div class="row q-col-gutter-x-md q-mt-md">
              <div class="col-4">
                <input-field-wrapper label="Bairro">
                  <q-input
                    v-model="addressForm.neighborhood"
                    :readonly="readonly"
                    hide-bottom-space
                    outlined
                    dense
                  />
                </input-field-wrapper>
              </div>
              <div class="col-4">
                <input-field-wrapper label="Logradour">
                  <q-input
                    v-model="addressForm.street"
                    :readonly="readonly"
                    hide-bottom-space
                    outlined
                    dense
                  />
                </input-field-wrapper>
              </div>
              <div class="col-4">
                <input-field-wrapper label="Número">
                  <q-input
                    v-model="addressForm.number"
                    :readonly="readonly"
                    hide-bottom-space
                    outlined
                    dense
                  />
                </input-field-wrapper>
              </div>
            </div>
            <div class="row q-col-gutter-x-md q-mt-md">
              <div class="col-4">
                <input-field-wrapper label="Complemento">
                  <q-input
                    v-model="addressForm.complement"
                    :readonly="readonly"
                    hide-bottom-space
                    outlined
                    dense
                  />
                </input-field-wrapper>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="access" class="q-pa-none">
            <div class="row q-col-gutter-x-md q-mt-md">
              <div class="col-4">
                <input-field-wrapper
                  label="Usuário"
                  :errors="commonPersonValidation.userName.$errors"
                >
                  <q-input
                    v-model="personForm.userName"
                    :error="commonPersonValidation.userName.$error"
                    :readonly="readonly"
                    hide-bottom-space
                    outlined
                    dense
                  />
                </input-field-wrapper>
              </div>
              <div class="col-4">
                <input-field-wrapper
                  label="Senha"
                  :errors="passwordValidation.password.$errors"
                >
                  <q-input
                    v-model="personForm.password"
                    :error="passwordValidation.password.$error"
                    :readonly="readonly"
                    hide-bottom-space
                    outlined
                    dense
                    type="password"
                  />
                </input-field-wrapper>
              </div>
              <div class="col-4">
                <input-field-wrapper
                  label="Confirma Senha"
                  :errors="passwordValidation.confirmPassword.$errors"
                >
                  <q-input
                    v-model="personForm.confirmPassword"
                    :error="passwordValidation.confirmPassword.$error"
                    :readonly="readonly"
                    hide-bottom-space
                    outlined
                    dense
                    type="password"
                  />
                </input-field-wrapper>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
      <q-card-section class="flex gap-2 justify-end">
        <template v-if="readonly">
          <q-btn @click="closeDialog" color="grey" no-caps label="Voltar" />
        </template>
        <template v-else>
          <q-btn @click="closeDialog" color="grey" no-caps label="Cancelar" />
          <q-btn
            :loading="isSubmitLoading"
            @click="onSubmit"
            color="green"
            no-caps
            label="Confirmar"
          />
        </template>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { email, helpers, required, sameAs } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { notifySuccessFeedback } from 'src/helpers/notify.helper';
import InputFieldWrapper from 'src/components/InputFieldWrapper.vue';
import { PersonForm } from 'src/interfaces/persons.interface';
import { PersonApi } from 'src/api/Person.api';
import { Address } from '~/interfaces/addresses.interface';

const isSubmitLoading = ref(false);
const isPersonLoading = ref(false);
const currentTab = ref('personal');
const isCompanyRadio = ref('true');
const hiddenJuricalPerson = ref(false);

// const persons = ref<PersonSelect[]>([]);
// const personOptions = ref<PersonSelect[] | any>([]);
// const person = ref<PersonSelect | any>();

interface Props {
  open: boolean;
  edit: boolean;
  personId?: number;
  readonly: boolean;
  roleId: string | null;
}

function isPhysicalPerson() {
  hiddenJuricalPerson.value = true;
}

function isJuridicalPerson() {
  hiddenJuricalPerson.value = false;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  edit: false,
  readonly: false,
});

const title = computed(() => {
  if (props.readonly) return 'Detalhes do cliente';
  return props.edit ? 'Editar cliente' : 'Novo cliente';
});

const emit = defineEmits<{
  (event: 'update:open', value: boolean): void;
  (event: 'success'): void;
}>();

const personForm = ref<PersonForm>({
  isCompany: 'true',
  name: null,
  companyName: null,
  tradingName: null,
  userName: '',
  password: '',
  confirmPassword: '',
  email: '',
  firstNumber: '',
  secondNumber: null,
  cpf: null,
  cnpj: null,
  address: null,
  birthdayDate: null,
  genderId: null,
  roleId: props.roleId,
});

const addressForm = ref<Address>({
  cep: '',
  street: '',
  number: '',
  neighborhood: '',
  complement: null,
  stateId: null,
  cityId: null,
});

const physicalPersonRules = {
  name: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  cpf: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
};

const juridicalPersonRules = {
  companyName: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  cnpj: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
};

const commonPersonRules = {
  email: {
    email: helpers.withMessage('Formato de email inválido', email),
    required: helpers.withMessage('Campo obrigatório', required),
  },
  firstNumber: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  userName: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
};

const passwordRules = {
  password: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  confirmPassword: {
    sameAs: helpers.withMessage(
      'TEste',
      sameAs(computed(() => personForm.value.password))
    ),
    required: helpers.withMessage('Campo obrigatório', required),
  },
};

const physicalPersonValidation = useVuelidate(physicalPersonRules, personForm);
const juridicalPersonValidation = useVuelidate(
  juridicalPersonRules,
  personForm
);
const commonPersonValidation = useVuelidate(commonPersonRules, personForm);
const passwordValidation = useVuelidate(passwordRules, personForm);

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      resetPerson();
      resetAddress();
      currentTab.value = 'personal';
      if (props.edit || props.readonly) {
        getPerson();
      }
    }
  }
);

function resetPerson() {
  physicalPersonValidation.value.$reset();
  juridicalPersonValidation.value.$reset();
  commonPersonValidation.value.$reset();
  hiddenJuricalPerson.value = false;
  isCompanyRadio.value = 'true';
  personForm.value = {
    isCompany: 'true',
    name: null,
    companyName: null,
    tradingName: null,
    userName: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstNumber: '',
    secondNumber: null,
    cpf: null,
    cnpj: null,
    address: null,
    birthdayDate: null,
    genderId: null,
    roleId: props.roleId,
  };
}

function resetAddress() {
  addressForm.value = {
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    complement: null,
    stateId: null,
    cityId: null,
  };
}

function closeDialog(): void {
  emit('update:open', false);
  resetPerson();
}

async function getPerson() {
  try {
    isPersonLoading.value = true;
    const data = await PersonApi.getPerson(props.personId as number);
    const {
      id,
      isCompany,
      name,
      companyName,
      tradingName,
      userName,
      password,
      confirmPassword,
      email,
      firstNumber,
      secondNumber,
      cpf,
      cnpj,
      address,
      birthdayDate,
      genderId,
      roleId,
    } = data;
    personForm.value = {
      id,
      isCompany,
      name,
      companyName,
      tradingName,
      userName,
      password,
      confirmPassword,
      email,
      firstNumber,
      secondNumber,
      cpf,
      cnpj,
      address,
      birthdayDate,
      genderId,
      roleId,
    };
    addressForm.value = personForm.value.address;
    isCompanyRadio.value = personForm.value.isCompany.toString();
    hiddenJuricalPerson.value =
      personForm.value.isCompany.toString() === 'true' ? false : true;
  } catch (error) {
    console.error(error);
  } finally {
    isPersonLoading.value = false;
  }
}

async function onSubmit() {
  try {
    commonPersonValidation.value.$validate();
    passwordValidation.value.$validate();
    if (isCompanyRadio.value === 'true') {
      juridicalPersonValidation.value.$validate();
      personForm.value.isCompany = 'true';
    } else if (isCompanyRadio.value === 'false') {
      physicalPersonValidation.value.$validate();
      personForm.value.isCompany = 'false';
    }
    if (
      !commonPersonValidation.value.$invalid && isCompanyRadio.value === 'true'
        ? !juridicalPersonValidation.value.$invalid
        : !physicalPersonValidation.value.$invalid && !props.edit
        ? !passwordValidation.value.$invalid
        : true
    ) {
      personForm.value.address = addressForm.value;
      isSubmitLoading.value = true;
      if (props.edit) {
        console.log('entrou aqui');
        await PersonApi.updatePerson(personForm.value);
      } else {
        await PersonApi.createPerson(personForm.value);
      }
      onSubmitSuccess();
    }
  } catch (error) {
    console.error(error);
  } finally {
    isSubmitLoading.value = false;
  }
}

function onSubmitSuccess() {
  notifySuccessFeedback(
    `Cliente ${props.edit ? 'editado' : 'criado'} com sucesso!`
  );
  closeDialog();
  emit('success');
}
</script>
<style scoped lang="scss">
.dialog-card {
  width: 1000px;
  max-width: 80vw;
}
:deep(.q-tab--active .q-tab__indicator) {
  opacity: 1;
  color: #36b363;
  height: 5px;
  border-radius: 10px;
}
</style>
