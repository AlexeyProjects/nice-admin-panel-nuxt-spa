<template>
  <div class="wrap wrap-loading">
    <!-- <UILoading
    v-if="loading"
    /> -->
    <div
    :class="$style.table">
      <form action="">
        <div class="main">
          <div :class="$style.head" class="head mb-20">
            <div :class="$style.leftpanel">
              <button @click.prevent="$router.push('/tags')" class="btn back">
                Назад
              </button>
            </div>
            <div :class="$style.rightpanel">
              <button @click.prevent="deleteTag" class="btn red">Удалить</button> 
            </div>
          </div>
          <div class="input">
            <label for="">
              <span class="label">
                Название
              </span>
              <input v-model="formData.name" readonly type="text">
            </label>
          </div>
          <div class="input">
            <label for="">
              <span class="label">
                Кол-во карточек
              </span>
              <input v-model="formData.cards_count" readonly type="text">
            </label>
          </div>
        </div>
      </form>
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

  </div>
</template>

<script>
import { ref, reactive, onMounted, useContext, useRouter } from '@nuxtjs/composition-api';
export default {
  name: 'section-edit',
  setup() {
    const { store, route, $toast } = useContext()
    const loading = ref(false)
    const router = useRouter()
    const tag = ref({})
    const sections = ref([])
    const columns = ref([
      {
        label: 'id',
        field: 'id',
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
    const formData = ref({
      name: ''
    })
    const paramsSearch = ref({
      entity: 'tags',
      searchField: '',
      page: 1,
      count: 9999
    })
    const paramsSearchCards = ref({
      section_id: null,
      searchField: '',
      author_id: null,
      tags: [Number(route.value.params.id)],
      page: 1,
      count: 30,
      order_by_column: '',
      order_by_mode: '',
    })
    const item = ref({})
    const deleteTag = async () => {
      loading.value = true
      const response = await store.dispatch('tags/deleteTag', +route.value.params.id)
      loading.value = false
    }
    const getTag = async () => {
      loading.value = true
      const response = await store.dispatch('tags/getTags', paramsSearch.value)
      console.log('gettag', response.data)
      console.log(route.value.params.id)
      tag.value = response.data.find(item => item.id === +route.value.params.id)
      formData.value = {
        ...tag.value
      }
      loading.value = false
    }
    const getCards = async () => {
      loading.value = true
      const params = {
        page: 1,
        count: 9999,
        tags: [Number(route.value.params.id)]
      }
      const data = await store.dispatch('tags/getTagCards', params)
      sections.value = data
      tableOptions.value.dataTable = sections.value.data
      loading.value = false
    }
    const editRow = (params) => {
      router.push({
        path: `/cards/${params.row.id}`,
        query: { title: params.row.title }
      })
    }
    const changePage = (newPage) => {
      paramsSearchCards.value.page = newPage
      getSections()
    }
    const changeSort = async (params) => {
      console.log(params)
      paramsSearchCards.value.order_by_column = params[0].field
      if (paramsSearchCards.value.order_by_mode === '') {
        paramsSearchCards.value.order_by_mode = params[0].type
      } else if (paramsSearchCards.value.order_by_mode === 'asc') {
        paramsSearchCards.value.order_by_mode = 'desc'
      } else if (paramsSearchCards.value.order_by_mode === 'desc') {
        paramsSearchCards.value.order_by_mode = 'asc'
      }
      if (params[0].field === 'section.title') {
        paramsSearchCards.value.order_by_column = 'section_id'
      }
      
      getSections()
    }
    const getSections = async () => {
      loading.value = true
      const data = await store.dispatch('cards/getCards', paramsSearchCards.value)
      sections.value = data
      tableOptions.value.dataTable = sections.value.data
      tableOptions.value.totalRows = sections.value.total
      loading.value = false
    }
    const searchInput = async (searchParams) => {
      // loading.value = true
      paramsSearchCards.value.searchField = searchParams
      getSections()
    }
    const submit = async () => {
      const data = {
        name: formData.value.name
      }
      loading.value = true
      
      $toast.success('Информация сохранена', { position: 'bottom-center', icon: false, duration: 2000 })
      loading.value = false
    }
    onMounted(() => {
      getTag()
      getCards()
    })
    return {
      formData,
      item,
      loading,
      submit,
      tag,
      deleteTag,
      paramsSearch,
      paramsSearchCards,
      getTag,
      getCards,
      tableOptions,
      sections,
      columns,
      editRow,
      changePage,
      changeSort,
      searchInput,
      getSections
    }
  }
}
</script>

<style module lang="scss">
  .title {
    font-size: 2.4rem;
    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }
  .seotitle {
    margin-bottom: 1rem;
  }
  .head {
    display: flex;
    justify-content: space-between;
    .leftpanel {
      align-items: center;
      display: flex;
    }
  }
  .table {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
</style>