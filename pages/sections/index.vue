<template>
  <div class="">
    <div :class="$style.header">
      <div :class="$style.title">
        Разделы
      </div>
      <div :class="$style.panel">

      </div>
    </div>
    <TableDefault
    title="Разделы"
    :loading="loading"
    :tableOptions="tableOptions"
    @rowClick="editRow"
    @changeSort="changeSort"
    @changePage="changePage"
    @searchInput="searchInput"
    />
  </div>
</template>

<script>
import { ref, useContext, onMounted, useRouter } from '@nuxtjs/composition-api';


export default {
  name: "Sections",
  components: {

  },
  setup() {
    const { store } = useContext()
    const router = useRouter()
    const columns = ref([
      {
        label: 'Название',
        field: 'title',
        type: 'text'
      },
      {
        label: 'Описание',
        field: 'description',
        type: 'text'
      },
      {
        label: 'Сортировка',
        field: 'sort',
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
      perPage: 20
    })
    const paramsSearch = ref({
      section_id: null,
      searchField: '',
      tags: [],
      page: 1,
      count: 20,
      order_by_column: '',
      order_by_mode: '',
    })
    const loading = ref(false)
    const sections = ref([])
    const dataTable = ref([
    ])
    const editRow = (params) => {
      router.push({
        path: `/sections/${params.row.id}`,
        query: { title: params.row.title }
      })
    }
    const changePage = (newPage) => {
      paramsSearch.value.page = newPage
      getSections()
    }
    const getSections = async () => {
      loading.value = true
      const data = await store.dispatch('sections/getSections', paramsSearch.value)
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
    const changeSort = async (params) => {
      console.log(params)
      paramsSearch.value.order_by_column = params[0].field
      if (paramsSearch.value.order_by_mode === '') {
        paramsSearch.value.order_by_mode = params[0].type
      } else if (paramsSearch.value.order_by_mode === 'asc') {
        paramsSearch.value.order_by_mode = 'desc'
      } else if (paramsSearch.value.order_by_mode === 'desc') {
        paramsSearch.value.order_by_mode = 'asc'
      }
      getSections()
    }
    onMounted(() => {
      getSections()
    })

    return {
      columns,
      dataTable,
      getSections,
      sections,
      tableOptions,
      loading,
      editRow,
      paramsSearch,
      changePage,
      searchInput,
      changeSort
    }
  }
}
</script>

<style lang="scss" module>
  .title {
    font-size: 2.4rem;
    margin-bottom: 1rem;
    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }
  .wrap {
    position: relative;
    flex-grow: 1;
  }
</style>