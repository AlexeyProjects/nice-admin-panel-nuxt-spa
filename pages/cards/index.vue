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
      <NuxtLink to="/cards/add" class="btn add" :class="$style.add">
        Добавить
      </NuxtLink>
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
        field: 'section.slug',
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
      count: 30
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
  .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 1rem;
    .add {
      display: inline-flex;
    }
  }
  .title {
    font-size: 2.4rem;

  }
  .wrap {
    position: relative;
    flex-grow: 1;
  }
</style>