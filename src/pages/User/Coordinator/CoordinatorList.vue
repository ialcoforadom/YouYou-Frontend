<template>
  <div class="default-title">Coordenadores</div>
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
      <template #body-cell-birthdayDate="{ value }">
        <q-td style="text-align: center">{{
          date.formatDate(value, 'DD/MM/YYYY')
        }}</q-td>
      </template>
      <template #body-cell-isActived="{ row }: { row: Person }">
        <q-td style="padding-left: 4px; text-align: center">
          <q-toggle
            v-model="row.isActived"
            @update:model-value="ChangeStatus(row.isActived, row.id)"
            :label="row.isActived ? 'Ativo' : 'Inativo'"
          ></q-toggle>
        </q-td>
      </template>
    </q-table>
  </div>
  <confirm-dialog
    v-model:open="isConfirmModalOpen"
    @confirm="deletePerson"
    title="Excluir Coordenador"
    message="Você tem certeza que deseja excluir o coordenador?"
  ></confirm-dialog>
  <person-form-dialog
    v-model:open="isPersonFormDialogOpen"
    :edit="isEditPersonForm"
    :readonly="isDetailPersonForm"
    :person-id="personIdInEdit"
    role-id="091E4C3D-0AA4-48A6-B201-6E69C9577E51"
    @success="getPersons"
  ></person-form-dialog>
</template>

<script setup lang="ts">
import Breadcrumb from 'src/components/Breadcrumb.vue';
import { BreadcrumbItem } from 'src/interfaces/breadcrumbItem.interface';
import SearchInput from 'src/components/SearchInput.vue';
import CreateButton from 'src/components/CreateButton.vue';
import { onMounted, ref } from 'vue';
import { QTableProps, date } from 'quasar';
import { Filter, Pagination } from 'src/interfaces/pagination.interface';
import { notifySuccessFeedback } from 'src/helpers/notify.helper';
import ConfirmDialog from 'src/components/ConfirmDialog.vue';
import { Person } from 'src/interfaces/persons.interface';
import { PersonApi } from 'src/api/Person.api';
import PersonFormDialog from 'src/components/PersonFormDialog.vue';

onMounted(() => {
  getPersons();
});

const isConfirmModalOpen = ref<boolean>(false);
const isPersonFormDialogOpen = ref(false);
const isEditPersonForm = ref(false);
const isDetailPersonForm = ref(false);
const personIdInEdit = ref(0);
const personToDelete = ref<number | any>();

const breadcrumbItems: BreadcrumbItem[] = [
  { link: '', name: 'Usuários' },
  { link: '', name: 'Coordenadores' },
];

const isTableLoading = ref(false);

const rows = ref<Person[]>([]);

const pagination = ref<Pagination>({
  page: 1,
  rowsNumber: 1,
  rowsPerPage: 10,
});

const requestFilters = ref<Filter>({
  pageNumber: 1,
  pageSize: 10,
  General: '',
  RoleId: '091E4C3D-0AA4-48A6-B201-6E69C9577E51',
});

const columns: QTableProps['columns'] = [
  { name: 'name', label: 'Nome', field: 'name', align: 'left' },
  {
    name: 'birthdayDate',
    label: 'Aniversário',
    field: 'birthdayDate',
    align: 'left',
  },
  {
    name: 'email',
    label: 'E-mail',
    field: 'email',
    align: 'left',
  },
  { name: 'phone', label: 'Telefone', field: 'phone', align: 'center' },
  { name: 'cpfOrCnpj', label: 'Cpf/Cnpj', field: 'cpfOrCnpj', align: 'center' },
  { name: 'cityName', label: 'Cidade', field: 'cityName', align: 'center' },
  { name: 'genderName', label: 'Genero', field: 'genderName', align: 'center' },
  { name: 'isActived', label: 'Status', field: 'isActived', align: 'center' },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'center' },
];

const onRequest: QTableProps['onRequest'] = function (props) {
  const { page, rowsPerPage } = props.pagination;
  pagination.value.page = page;
  pagination.value.rowsPerPage = rowsPerPage;
  requestFilters.value.pageNumber = page;
  requestFilters.value.pageSize = rowsPerPage;
  getPersons();
};

async function getPersons() {
  try {
    isTableLoading.value = true;
    const response = await PersonApi.getPersonList(requestFilters.value);
    rows.value = response.data;
    pagination.value.rowsNumber = response.totalRecords;
  } catch (error) {
    console.error(error);
  } finally {
    isTableLoading.value = false;
  }
}

async function deletePerson() {
  await PersonApi.deletePerson(personToDelete.value);
  notifySuccessFeedback('Cliente deletado com sucesso!');
  isConfirmModalOpen.value = false;
  getPersons();
}

async function ChangeStatus(rowStatus: boolean, id: number) {
  if (rowStatus === false) {
    await PersonApi.disablePerson(id);
  } else {
    await PersonApi.enablePerson(id);
  }
  getPersons();
}

function onDeleteClick(personId: number) {
  isConfirmModalOpen.value = true;
  personToDelete.value = personId;
}

function handleOpenCreateFormDialog() {
  isPersonFormDialogOpen.value = true;
  isEditPersonForm.value = false;
  isDetailPersonForm.value = false;
}

function handleOpenDetailsDialog(personId: number) {
  isEditPersonForm.value = false;
  isDetailPersonForm.value = true;
  personIdInEdit.value = personId;
  isPersonFormDialogOpen.value = true;
}

function handleOpenEditFormDialog(personId: number) {
  isEditPersonForm.value = true;
  isDetailPersonForm.value = false;
  personIdInEdit.value = personId;
  isPersonFormDialogOpen.value = true;
}

function onSearchClick(searchText: string) {
  requestFilters.value.General = searchText;
  getPersons();
}
</script>
