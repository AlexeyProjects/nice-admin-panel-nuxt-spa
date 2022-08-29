<template>
  <div :class="$style.table">
    <div class="wrap-loading" :class="$style.wrap">
      <UILoading
      v-if="$props.loading"
      />
      <div  class="">
        <vue-good-table
        v-if="!$props.loading"
        @on-row-click="onRowClick"
        :columns="$props.tableOptions.columns"
        :rows="$props.tableOptions.dataTable"
        :pagination-options="$props.tableOptions.paginationOptions"
        :totalRows="$props.tableOptions.totalRows"
        mode="remote"
        />
        <paginate
        v-show="!$props.loading && $props.tableOptions.totalRows >= 10"
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
    const onRowClick = (params) => {
      console.log(params)
      emit('rowClick', params)
    }
    const changePage = (numPage) => {
      console.log(numPage)
      emit('changePage', numPage)
    }
    onMounted(() => {
      currentPage.value = props.curPage
    })
    const pageCount = computed(() => {
      return Math.ceil(props.tableOptions.totalRows/props.tableOptions.perPage)
    })
    return {
      onRowClick,
      currentPage,
      changePage,
      pageCount
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
  .wrap {
    position: relative;
    flex-grow: 1;
  }
</style>