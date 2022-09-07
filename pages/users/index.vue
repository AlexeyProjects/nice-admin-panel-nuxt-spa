<template>
  <div class="">
    <div :class="$style.header">
      <div :class="$style.title">
        Пользователи
      </div>
      <div :class="$style.panel">

      </div>
    </div>
    <TableDefault
    title="Разделы"
    :loading="loading"
    :tableOptions="tableOptions"
    @rowClick="editRow"
    @changePage="changePage"
    @searchInput="searchInput"
    />
  </div>
</template>

<script>
import { ref, useContext, onMounted, useRouter } from '@nuxtjs/composition-api';


export default {
  name: "Users",
  components: {

  },
  setup() {
    const { store } = useContext()
    const router = useRouter()
    const columns = ref([
      {
        label: 'Имя',
        field: 'nickname',
        type: 'text'
      },
      {
        label: 'Телефон',
        field: 'phone',
        type: 'text'
      },
      {
        label: 'Email',
        field: 'email',
        type: 'text'
      },
      {
        label: 'Заметка',
        field: 'note',
        type: 'text'
      }
    ])
    const tableOptions = ref({
      columns: columns.value,
      dataTable: [],
      paginationOptions: {
        enable: true
      },
      totalRows: null,
      perPage: 10
    })
    const paramsSearch = ref({
      searchField: '',
      page: 1,
      count: 10
    })
    const loading = ref(false)
    const sections = ref([])
    const editRow = (params) => {
      router.push({
        path: `/users/${params.row.id}`,
        query: { title: params.row.title }
      })
    }
    const changePage = (newPage) => {
      paramsSearch.value.page = newPage
      getSections()
    }
    const getSections = async () => {
      loading.value = true
      const data = await store.dispatch('users/getUsers', paramsSearch.value)
      sections.value = data
      tableOptions.value.dataTable = sections.value.data
      tableOptions.value.totalRows = sections.value.total
      loading.value = false
    }
    const searchInput = async (searchParams) => {
      loading.value = true
      paramsSearch.value.searchField = searchParams
      getSections()
    }
    onMounted(() => {
      getSections()
    })

    return {
      columns,
      getSections,
      sections,
      tableOptions,
      loading,
      editRow,
      paramsSearch,
      changePage,
      searchInput
    }
  }
}
</script>

<style lang="scss" module>
  .title {
    font-size: 2.4rem;
    margin-bottom: 1rem;
  }
  .wrap {
    position: relative;
    flex-grow: 1;
  }
</style>