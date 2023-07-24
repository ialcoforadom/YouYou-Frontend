<template>
  <div class="default-title">Dispositivos</div>
  <breadcrumb :items="breadcrumbItems"></breadcrumb>
  <div class="q-mt-sm row">
    <div class="col-12 flex gap-3">
      <search-input @search="onSearchClick" class="flex-1"></search-input>
      <create-button @click="handleOpenCreateFormDialog" />
    </div>
  </div>

  <div class="q-mt-md">
    <q-table
      :rows="rows"
      :columns="columns"
      v-model:pagination="pagination"
      @request="onRequest"
      row-key="id"
      table-class="default-table"
    >
      <template #body-cell-actions="{ row }">
        <q-td style="text-align: center">
          <q-btn
            @click="handleOpenDetailsDialog(row.id)"
            size="12px"
            flat
            round
            color="primary"
            icon="o_description"
          />
          <q-btn
            @click="handleOpenEditFormDialog(row.id)"
            size="12px"
            flat
            round
            color="primary"
            icon="o_edit"
          />
          <q-btn
            @click="onDeleteClick(row.id)"
            flat
            round
            color="red"
            icon="o_delete"
          />
        </q-td>
      </template>
      <template #body-cell-isActive="{ row }: { row: Device }">
        <q-td style="padding-left: 4px; text-align: center">
          <q-toggle
            v-model="row.isActive"
            @update:model-value="ChangeStatus(row.isActive, row.id)"
            :label="row.isActive ? 'Ativo' : 'Inativo'"
          ></q-toggle>
        </q-td>
      </template>
    </q-table>
  </div>
  <confirm-dialog
    v-model:open="isConfirmModalOpen"
    @confirm="deleteDevice"
    title="Excluir Dispositivo"
    message="Você tem certeza que deseja excluir o dispositivo?"
  ></confirm-dialog>
  <device-form-dialog
    v-model:open="isDeviceFormDialogOpen"
    :edit="isEditDeviceForm"
    :readonly="isDetailDeviceForm"
    :device-id="deviceIdInEdit"
    @success="getDevices"
  ></device-form-dialog>
</template>

<script setup lang="ts">
import Breadcrumb from 'src/components/Breadcrumb.vue';
import { BreadcrumbItem } from 'src/interfaces/breadcrumbItem.interface';
import SearchInput from 'src/components/SearchInput.vue';
import CreateButton from 'src/components/CreateButton.vue';
import { onMounted, ref } from 'vue';
import { Device } from 'src/interfaces/devices.interface';
import { QTableProps } from 'quasar';
import { Filter, Pagination } from 'src/interfaces/pagination.interface';
import { DeviceApi } from 'src/api/Device.api';
import { notifySuccessFeedback } from 'src/helpers/notify.helper';
import ConfirmDialog from 'src/components/ConfirmDialog.vue';
import DeviceFormDialog from './components/DeviceFormDialog.vue';

onMounted(() => {
  getDevices();
});

const isConfirmModalOpen = ref<boolean>(false);
const isDeviceFormDialogOpen = ref(false);
const isEditDeviceForm = ref(false);
const isDetailDeviceForm = ref(false);
const deviceIdInEdit = ref(0);
const deviceToDelete = ref<number | any>();

const breadcrumbItems: BreadcrumbItem[] = [
  { link: '', name: 'Gerenciamento' },
  { link: '', name: 'Dispositivos' },
];

const isTableLoading = ref(false);

const rows = ref<Device[]>([]);

const pagination = ref<Pagination>({
  page: 1,
  rowsNumber: 1,
  rowsPerPage: 10,
});

const requestFilters = ref<Filter>({
  pageNumber: 1,
  pageSize: 10,
  General: '',
});

const columns: QTableProps['columns'] = [
  {
    name: 'model',
    label: 'Modelo',
    field: 'model',
    align: 'left',
  },
  { name: 'personName', label: 'Pessoa', field: 'personName', align: 'left' },
  {
    name: 'code',
    label: 'Código',
    field: 'code',
    align: 'left',
  },
  { name: 'isActive', label: 'Status', field: 'isActive', align: 'center' },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'center' },
];

const onRequest: QTableProps['onRequest'] = function (props) {
  const { page, rowsPerPage } = props.pagination;
  pagination.value.page = page;
  pagination.value.rowsPerPage = rowsPerPage;
  requestFilters.value.pageNumber = page;
  requestFilters.value.pageSize = rowsPerPage;
  getDevices();
};

async function getDevices() {
  try {
    isTableLoading.value = true;
    const response = await DeviceApi.getDeviceList(requestFilters.value);
    rows.value = response.data;
    pagination.value.rowsNumber = response.totalRecords;
  } catch (error) {
    console.error(error);
  } finally {
    isTableLoading.value = false;
  }
}

async function ChangeStatus(rowStatus: boolean, id: number) {
  if (rowStatus === false) {
    await DeviceApi.disableDevice(id);
  } else {
    await DeviceApi.enableDevice(id);
  }
  getDevices();
}

async function deleteDevice() {
  await DeviceApi.deleteDevice(deviceToDelete.value);
  notifySuccessFeedback('Dispositivo deletado com sucesso!');
  isConfirmModalOpen.value = false;
  getDevices();
}

function onDeleteClick(deviceId: number) {
  isConfirmModalOpen.value = true;
  deviceToDelete.value = deviceId;
}

function handleOpenCreateFormDialog() {
  isDeviceFormDialogOpen.value = true;
  isEditDeviceForm.value = false;
  isDetailDeviceForm.value = false;
}

function handleOpenDetailsDialog(deviceId: number) {
  isEditDeviceForm.value = false;
  isDetailDeviceForm.value = true;
  deviceIdInEdit.value = deviceId;
  isDeviceFormDialogOpen.value = true;
}

function handleOpenEditFormDialog(deviceId: number) {
  isEditDeviceForm.value = true;
  isDetailDeviceForm.value = false;
  deviceIdInEdit.value = deviceId;
  isDeviceFormDialogOpen.value = true;
}

function onSearchClick(searchText: string) {
  requestFilters.value.General = searchText;
  getDevices();
}
</script>
