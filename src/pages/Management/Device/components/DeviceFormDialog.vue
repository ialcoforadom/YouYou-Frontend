<template>
  <q-dialog :model-value="open" persistent>
    <q-card class="dialog-card">
      <q-linear-progress v-if="isDeviceLoading" indeterminate />
      <q-card-section class="flex">
        <div class="default-title">{{ title }}</div>
        <q-space />
        <q-btn
          @click="closeDialog"
          size="12px"
          flat
          round
          icon="close"
        /> </q-card-section
      ><q-card-section class="q-pt-none">
        <div class="row q-col-gutter-x-md q-mt-md">
          <div class="col-4">
            <input-field-wrapper
              label="Modelo"
              :errors="deviceValidation.model.$errors"
            >
              <q-input
                v-model="deviceForm.model"
                :error="deviceValidation.model.$error"
                :readonly="readonly"
                hide-bottom-space
                outlined
                dense
              />
            </input-field-wrapper>
          </div>
          <div class="col-4">
            <input-field-wrapper
              label="Código"
              :errors="deviceValidation.code.$errors"
            >
              <q-input
                v-model="deviceForm.code"
                :error="deviceValidation.code.$error"
                :readonly="readonly"
                hide-bottom-space
                outlined
                dense
              />
            </input-field-wrapper>
          </div>
          <div class="col-4">
            <input-field-wrapper label="Selecionar Pessoa">
              <q-select
                outlined
                dense
                @filter="personFilter"
                use-input
                v-model="deviceForm.personId"
                :readonly="readonly"
                :options="personOptions"
                placeholder="Pesquisar pessoa"
                :option-value="
                  (opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)
                "
                emit-value
                map-options
                :option-label="
                  (opt) =>
                    Object(opt) === opt && 'name' in opt ? opt.name : '- Null -'
                "
              >
                <template v-slot:prepend>
                  <q-icon name="search" class="cursor-pointer"> </q-icon>
                </template>
              </q-select>
            </input-field-wrapper>
          </div>
        </div>
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
import { computed, onMounted, ref, watch } from 'vue';
import { DeviceForm } from 'src/interfaces/devices.interface';
import { helpers, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { notifySuccessFeedback } from 'src/helpers/notify.helper';
import { DeviceApi } from 'src/api/Device.api';
import InputFieldWrapper from 'src/components/InputFieldWrapper.vue';
import { PersonSelect } from 'src/interfaces/persons.interface';
import { PersonApi } from 'src/api/Person.api';

onMounted(() => {
  getPersons();
});

const isSubmitLoading = ref(false);
const isDeviceLoading = ref(false);
const persons = ref<PersonSelect[]>([]);
const personOptions = ref<PersonSelect[] | any>([]);
const person = ref<PersonSelect | any>();

interface Props {
  open: boolean;
  edit: boolean;
  deviceId?: number;
  readonly: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  edit: false,
  readonly: false,
});

const title = computed(() => {
  if (props.readonly) return 'Detalhes do dispositivo';
  return props.edit ? 'Editar dispositivo' : 'Novo dispositivo';
});

const emit = defineEmits<{
  (event: 'update:open', value: boolean): void;
  (event: 'success'): void;
}>();

const deviceForm = ref<DeviceForm>({
  model: '',
  code: '',
  personId: null,
});

const deviceRules = {
  model: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  code: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
};

const deviceValidation = useVuelidate(deviceRules, deviceForm);

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      resetDevice();

      if (props.edit || props.readonly) {
        getPersons();
        personOptions.value = persons;
        getDevice();
      }
    }
  }
);

function resetDevice() {
  deviceValidation.value.$reset();
  deviceForm.value = {
    model: '',
    code: '',
    personId: null,
  };
  person.value = null;
}

function closeDialog(): void {
  emit('update:open', false);
}

async function getDevice() {
  try {
    isDeviceLoading.value = true;
    const data = await DeviceApi.getDevice(props.deviceId as number);
    const { id, model, code, status, personId, history } = data;
    deviceForm.value = {
      id,
      model,
      code,
      status,
      personId,
      history,
    };
  } catch (error) {
    console.error(error);
  } finally {
    isDeviceLoading.value = false;
  }
}

async function onSubmit() {
  try {
    //deviceForm.value.personId = person.value.id;
    deviceValidation.value.$validate();
    if (!deviceValidation.value.$invalid) {
      isSubmitLoading.value = true;
      if (props.edit) {
        await DeviceApi.updateDevice(deviceForm.value);
      } else {
        await DeviceApi.createDevice(deviceForm.value);
      }
      onSubmitSuccess();
    }
  } catch (error) {
    console.error(error);
  } finally {
    isSubmitLoading.value = false;
  }
}

async function getPersons() {
  try {
    const response = await PersonApi.getPersonsToSelect();
    persons.value = response;
  } catch (error) {
    console.error(error);
  }
}

async function personFilter(val: string, update: (items: any) => void) {
  if (val === '') {
    update(() => {
      personOptions.value = persons;
    });
  }

  update(() => {
    const needle = val.toLowerCase();
    personOptions.value = persons.value.filter(
      (v) => v.name.toLowerCase().indexOf(needle) > -1
    );
  });
}

function onSubmitSuccess() {
  notifySuccessFeedback(
    `Dispositivo ${props.edit ? 'editado' : 'criado'} com sucesso!`
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
