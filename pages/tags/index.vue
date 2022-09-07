<template>
  <div class="">
    <div :class="$style.header">
      <div :class="$style.title">
        Теги
      </div>
      <div :class="$style.panel">

      </div>
    </div>
    <TableDefault
    title="Разделы"
    :loading="loading"
    :tableOptions="tableOptions"
    @rowClick="editRow"
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
    const paramsSearch = ref({
      entity: 'tags',
      searchField: '',
      page: 1,
      count: 9999
    })
    const columns = ref([
      {
        label: 'Название',
        field: 'name',
        type: 'text'
      },
      {
        label: 'Кол-во карт',
        field: 'cards_count',
        type: 'text'
      }
    ])
    const tableOptions = ref({
      columns: columns.value,
      dataTable: []
    })

    const loading = ref(false)
    const sections = ref([])
    const editRow = (params) => {
      router.push({
        path: `/users/${params.row.id}`,
        query: { title: params.row.title }
      })
    }
    const getSections = async () => {
      loading.value = true
      const data = await store.dispatch('tags/getTags', paramsSearch.value)
      sections.value = data
      tableOptions.value.dataTable = sections.value.data
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