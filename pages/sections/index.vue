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
      perPage: 10
    })
    const paramsSearch = ref({
      section_id: null,
      searchField: '',
      author_id: null,
      tags: [],
      page: 1,
      count: 10
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