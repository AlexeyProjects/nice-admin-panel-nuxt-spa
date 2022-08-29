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
      { id:1, name:"John", age: 20, createdAt: '2011-10-31',score: 0.03343 },
      { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
      { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
      { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
      { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
      { id:1, name:"John", age: 20, createdAt: '2011-10-31',score: 0.03343 },
      { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
      { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
      { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
      { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
      { id:1, name:"John", age: 20, createdAt: '2011-10-31',score: 0.03343 },
      { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
      { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
      { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
      { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
      { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 }
    ])
    const editRow = (params) => {
      router.push({
        path: `/sections/${params.row.id}`,
        query: { title: params.row.title }
      })
    }
    const changePage = (newPage) => {
      console.log(newPage)
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
      changePage
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