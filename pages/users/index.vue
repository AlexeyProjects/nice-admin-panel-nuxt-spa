<template>
  <div class="">
    <div :class="$style.header">
      <div :class="$style.title">
        Пользователи
      </div>
      <div :class="$style.panel">
        <button @click.prevent="openGroups" class="btn">
          Группы
        </button>
        <button @click.prevent="openAuthors" class="btn">
          Авторы
        </button>
      </div>
    </div>
    <div class="filter-input">
      <div class="mb-15 fill">
        <multiselect 
        class="mt-15 mb-5"
        v-model="paramsSearch.group_id" 
        :options="groups"
        noOptions="Список пустой"
        label="name"
        @select="filterGroup"
        placeholder="Фильтрация по группам"
        track-by="id"/>
        <svg v-if="paramsSearch.group_id !== null" @click="removeFilter" xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></svg>
      </div>
    </div>
    <TableDefault
    title="Разделы"
    :loading="loading"
    :tableOptions="tableOptions"
    @rowClick="editRow"
    @changePage="changePage"
    @searchInput="searchInput"
    @changeSort="changeSort"
    />
  </div>
</template>

<script>
import { ref, useContext, onMounted, useRouter } from '@nuxtjs/composition-api';
import Multiselect from 'vue-multiselect'

export default {
  name: "Users",
  components: {
    Multiselect
  },
  setup() {
    const { store } = useContext()
    const router = useRouter()
    const groups = ref([])
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
      },
      {
        label: 'Группа',
        field: 'group.name',
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
      group_id: null,
      searchField: '',
      page: 1,
      count: 10,
      order_by_column: '',
      order_by_mode: '',
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
    const getGroups = async () => {
      loading.value = true
      const paramsSearchGroups = {
      entity: 'groups',
      searchField: '',
      page: 1,
      count: 9999
    }
      const data = await store.dispatch('tags/getTags', paramsSearchGroups)
      groups.value = data.data
      loading.value = false
    }
    const openAuthors = () => {
      router.push({
        path: `/users/authors`
      })
    }
    const openGroups = () => {
      router.push({
        path: `/users/groups`
      })
    }
    const filterGroup = async (selectedOption, id) => {
      paramsSearch.value.group_id = selectedOption.id
      getSections()
    }
    const removeFilter = () => {
      paramsSearch.value.group_id = null
      getSections()
    }
    onMounted(() => {
      getSections()
      getGroups()
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
      openAuthors,
      openGroups,
      getGroups,
      groups,
      filterGroup,
      removeFilter
    }
  }
}
</script>

<style lang="scss" module>
  .header {
    display: flex;
    justify-content: space-between;
  }
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>