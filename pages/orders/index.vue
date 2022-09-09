<template>
  <div class="">
    <div :class="$style.header">
      <div :class="$style.title">
        Заказы
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
    const paramsSearch = ref({
      section_id: null,
      searchField: '',
      author_id: null,
      tags: [],
      page: 1,
      count: 30
    })
    const columns = ref([
      {
        label: 'ID',
        field: 'id',
        type: 'text'
      },
      {
        label: 'Статус',
        field: 'status_id',
        type: 'text'
      },
      {
        label: 'Пользователь',
        field: 'FIO',
        type: 'text'
      },
      {
        label: 'Сумма заказа',
        field: 'basket.cards_sum',
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
      perPage: 30
    })

    const loading = ref(false)
    const sections = ref([])
    const editRow = (params) => {
      router.push({
        path: `/orders/${params.row.id}`,
        query: { title: params.row.title }
      })
    }
    const getSections = async () => {
      loading.value = true
      try {
        const data = await store.dispatch('orders/getOrders', paramsSearch.value)
        sections.value = data
        tableOptions.value.dataTable = sections.value.data
        tableOptions.value.totalRows = sections.value.total
      }
      catch (e){
        console.log(e)
      }
      
      
      loading.value = false
    }
    const searchInput = async (searchParams) => {
      loading.value = true
      paramsSearch.value.searchField = searchParams
      getSections()
    }
    const changePage = (newPage) => {
      paramsSearch.value.page = newPage
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
      searchInput,
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