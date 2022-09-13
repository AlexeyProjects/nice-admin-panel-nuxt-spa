<template>
  <div :class="$style.table">
    <div class="wrap-loading" :class="$style.wrap">
      <UILoading
      v-if="$props.loading"
      />
      <div  class="">
        <div :class="$style.search">
          <div class="">
            <input @input="searchInput" v-model="searchTerm" placeholder="Поиск" type="text">
          </div>
        </div>
        <vue-good-table
        v-if="!$props.loading"
        @on-row-click="onRowClick"
        :columns="$props.tableOptions.columns"
        :rows="$props.tableOptions.dataTable"
        :pagination-options="$props.tableOptions.paginationOptions"
        :totalRows="$props.tableOptions.totalRows"
        @on-sort-change="onSortChange"
        mode="remote"
        />
        <paginate
        v-show="!$props.loading && $props.tableOptions.totalRows >= $props.tableOptions.perPage"
        :page-count="pageCount"
        :click-handler="changePage"
        :prev-text="'Пред'"
        :next-text="'След'"
        :container-class="'pagination'"
        ></paginate>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, useContext, onMounted, computed } from '@nuxtjs/composition-api';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Paginate from 'vuejs-paginate'

export default {
  name: "TableDefault",
  components: {
    VueGoodTable,
    Paginate
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    tableOptions: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    curPage: {
      type: Number,
      default: 1
    }
  },
  setup(props, ctx) {
    const { emit } = ctx
    const currentPage = ref(1)
    const searchTerm = ref('')
    const onRowClick = (params) => {
      emit('rowClick', params)
    }
    const changePage = (numPage) => {
      emit('changePage', numPage)
    }
    const onSortChange = (params) => {
      emit('changeSort', params)
    }
    onMounted(() => {
      currentPage.value = props.curPage
    })
    const pageCount = computed(() => {
      return Math.ceil(props.tableOptions.totalRows/props.tableOptions.perPage)
    })
    const searchInput = () => {
      emit('searchInput', searchTerm.value)
    }
    return {
      onRowClick,
      currentPage,
      changePage,
      pageCount,
      searchTerm,
      searchInput,
      onSortChange
    }

  }
}
</script>

<style lang="scss" module>
  .title {
    font-size: 2.4rem;
    margin-bottom: 1rem;
  }
  .table {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .search {
    width: 100%;
    margin-bottom: 1rem;
    input {
      width: 100%;
      font-size: 1.6rem;
      background-color: transparent;
      border: 0;
      border-bottom: 2px solid #ccc;
      padding: 1rem;
      outline: none;
    }
  }
  .wrap {
    position: relative;
    flex-grow: 1;
  }
</style>