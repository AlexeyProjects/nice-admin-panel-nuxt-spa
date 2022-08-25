<template>
  <div :class="$style.table">
    <div class="wrap-loading" :class="$style.wrap">
      <UILoading
      v-if="$props.loading"
      />
      <vue-good-table
      v-if="!$props.loading"
      @on-row-click="onRowClick"
      :columns="$props.tableOptions.columns"
      :rows="$props.tableOptions.dataTable"/>
    </div>

  </div>
</template>

<script>
import { ref, useContext, onMounted } from '@nuxtjs/composition-api';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';

export default {
  name: "TableDefault",
  components: {
    VueGoodTable
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
    }
  },
  setup(props, ctx) {
    const { emit } = ctx
    const onRowClick = (params) => {
      console.log(params)
      emit('rowClick', params)
    }
    return {
      onRowClick
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