<template>
  <div class="">
    <div :class="$style.header">
      <div :class="$style.title">
        Карточки
      </div>
      <div :class="$style.panel">

      </div>
    </div>
    <TableDefault
    title="Карточки"
    :loading="loading"
    :tableOptions="tableOptions"
    :curPage="paramsSearch.curPage"
    @rowClick="editRow"
    @changePage="changePage"
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
        label: 'id',
        field: 'id',
        type: 'text'
      },
      {
        label: 'Раздел',
        field: 'section_id',
        type: 'text'
      },
      {
        label: 'Название',
        field: 'title',
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
    const editRow = (params) => {
      router.push({
        path: `/users/${params.row.id}`,
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
      const data = await store.dispatch('cards/getCards', paramsSearch.value)
      sections.value = data
      console.log(sections.value)
      tableOptions.value.dataTable = sections.value.data
      tableOptions.value.totalRows = sections.value.total
      loading.value = false
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