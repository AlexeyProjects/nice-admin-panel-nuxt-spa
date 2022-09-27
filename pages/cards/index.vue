<template>
  <div class="">
    <div :class="$style.header">
      <div :class="$style.title">
        <!-- <div class="menu burger">
          <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"/></svg>
        </div> -->
        <div class="">
          Карточки
        </div>
      </div>
      <NuxtLink v-if="canAddCard" to="/cards/add" class="btn add" :class="$style.add">
        Добавить
      </NuxtLink>
    </div>
    <TableDefault
    title="Карточки"
    :loading="loading"
    :tableOptions="tableOptions"
    :curPage="paramsSearch.curPage"
    @rowClick="editRow"
    @changeSort="changeSort"
    @changePage="changePage"
    @searchInput="searchInput"
    />
  </div>
</template>

<script>
import { ref, useContext, onMounted, computed, useRouter } from '@nuxtjs/composition-api';


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
        field: 'section.title',
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
      perPage: 30
    })
    const paramsSearch = ref({
      section_id: null,
      searchField: '',
      author_id: null,
      tags: [],
      page: 1,
      count: 30,
      order_by_column: '',
      order_by_mode: '',
    })
    const loading = ref(false)
    const sections = ref([])
    const editRow = (params) => {
      router.push({
        path: `/cards/${params.row.id}`,
        query: { title: params.row.title }
      })
    }
    const changePage = (newPage) => {
      paramsSearch.value.page = newPage
      getSections()
    }
    const getSections = async () => {
      loading.value = true
      const data = await store.dispatch('cards/getCards', paramsSearch.value)
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
      if (params[0].field === 'section.title') {
        paramsSearch.value.order_by_column = 'section_id'
      }
      
      getSections()
    }
    const canAddCard = computed(() => {
      return store.state?.login?.ability?.find(ability => ability.id === 6)?.hasUser
    })
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
      searchInput,
      changeSort,
      canAddCard
    }
  }
}
</script>

<style lang="scss" module>
  .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    @media (max-width: 768px) {
      align-items: center;
    }
    .add {
      display: inline-flex;
    }
  }
  .title {
    font-size: 2.4rem;
    @media (max-width: 768px) {
      font-size: 1.8rem;
    }

  }
  .wrap {
    position: relative;
    flex-grow: 1;
  }
</style>