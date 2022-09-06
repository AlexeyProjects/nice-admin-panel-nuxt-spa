<template>
  <div class="wrap wrap-loading">
    <UILoading
    v-if="loading"
    />
    <div
    v-show="!loading"
    class="">
      <form action="">
        <div class="main">
          <div :class="$style.head" class="head mb-20">
            <div :class="$style.leftpanel">
              <button @click.prevent="$router.push('/orders')" class="btn back">
                Назад
              </button>
              <div :class="$style.title">
               Заказ №{{ order.id }}
              </div>
            </div>
            <div :class="$style.rightpanel">
              <button @click.prevent="changeStatusOrder(item)" v-for="(item, index) in panelStatuses" class="btn">{{item.status_name}}</button> 
              <!-- <button class="btn red">Отменить</button> -->
              <!-- <button class="btn green">В обработку</button> -->
            </div>
          </div>
          <div :class="$style.content">
            <div class="mr-5" :class="$style.orderInfo">
              <div class="row mb-15">
                <div class="">
                  Статус
                </div>
                <div class="">
                  {{ statusName }}
                </div>
              </div>
              <div class="row mb-15">
                <div class="">
                  Пользователь
                </div>
                <NuxtLink :to="`/users/}`" class="default-link">
                  {{ user.nickname }}
                </NuxtLink>
              </div>
              <div class="row mb-15">
                <div class="">
                  Сумма заказа
                </div>
                <div class="">
                  {{ basketSumm }}
                </div>
              </div>
            </div>
            <div :class="$style.table">
              <TableDefault
              title="Карточки"
              :loading="loading"
              :tableOptions="tableOptions"
              :curPage="paramsSearchUsers.curPage"
              @rowClick="editRow"
              @changePage="changePage"
              />
            </div>
          </div>
          
        </div>
        <!-- <button @click.prevent="submit" class="btn">
          Сохранить
        </button> -->
      </form>
    </div>

  </div>
</template>

<script>
import { ref, reactive, onMounted, useContext, useRouter, computed } from '@nuxtjs/composition-api';
export default {
  name: 'section-edit',
  setup() {
    const { store, route, $toast } = useContext()
    const router = useRouter()
    const loading = ref(false)
    const formData = ref({

    })
    const order = ref({})
    const user = ref([])
    const paramsSearchUsers = ({
      searchField: '',
      page: 1,
      count: 10,
      curPage: 1
    })
    const columns = ref([
      {
        label: 'ID',
        field: 'id',
        type: 'text'
      },
      {
        label: 'Название',
        field: 'title',
        type: 'text'
      },
      {
        label: 'Раздел',
        field: 'section_id',
        type: 'text'
      },
      {
        label: 'Кол-во',
        field: 'count',
        type: 'text'
      },
      {
        label: 'Сумма',
        field: 'price',
        type: 'text'
      },
    ])
    const statuses = ref([])
    const tableOptions = ref({
      columns: columns.value,
      dataTable: [],
      paginationOptions: {
        enable: true
      },
      totalRows: null,
      perPage: 30
    })
    const editRow = (item) => {
      console.log(router)
      router.push({
        path: `/cards/${item.row.id}`
      })
    }
    const changePage = () => {

    }
    const panelStatuses = computed(() => {
      return statuses.value.filter(item => item.id !== order.value.status_id)
    })
    const getSections = async () => {
      loading.value = true
      const data = await store.dispatch('orders/getOrder', route.value.params.id)
      const userData = await store.dispatch('users/getUsers', paramsSearchUsers.value)
      const resStatuses = await store.dispatch('statuses/getStatuses')
      user.value = userData.data.find(item => item.id == data.user_id)
      tableOptions.value.dataTable = data.basket.cards
      // statuses.value = Object.assign({}, resStatuses);
      console.log(statuses.value)
      statuses.value = [
        ...resStatuses
      ]
      switch (data.status.status_name) {
        case 'new' :
          data.status.status_name = 'Новый'
          break
        case 'unpaid' :
          data.status.status_name = 'Не оплачен' 
          break
        case 'sborka' :
          data.status.status_name = 'Собирается'
          break
        case 'delivery' :
          data.status.status_name = 'Доставляется'
          break
        case 'delivered' :
          data.status.status_name = 'Доставлено'
          break
        case 'ready to give' :
          data.status.status_name = 'Готово к выдаче'
          break
        case 'rejected' :
          data.status.status_name = 'Отменено'
          break
      }
      statuses.value.forEach(item => {
        switch (item.status_name) {
          case 'new' :
            item.status_name = 'Новый'
            break
          case 'unpaid' :
            item.status_name = 'Не оплачен'
            break 
          case 'sborka' :
            item.status_name = 'Собирается'
            break
          case 'delivery' :
            item.status_name = 'Доставляется'
            break
          case 'delivered' :
            item.status_name = 'Доставлено'
            break
          case 'ready to give' :
            item.status_name = 'Готово к выдаче'
            break
          case 'rejected' :
            item.status_name = 'Отменено'
            break
        }
      })
      order.value = data
      formData.value = {
        ...order.value
      }
      loading.value = false
    }
    const statusName = computed(() => {
      return order.value?.status?.status_name
    })
    const basketSumm = computed(() => {
      return order.value?.basket?.cards_sum
    })
    const getUser = async (id) => {
      
    }
    const changeStatusOrder = async (status) => {
      loading.value = true
      const params = {
        order_id: order.value.id,
        status_id: status.id
      }
      await store.dispatch('orders/changeStatus', params)
      const newOrder =  statuses.value.find(item => item.id === status.id)
      order.value.status = newOrder
      $toast.success(`Статус заказа №${order.value.id} изменен на "${order.value.status.status_name}"`, { position: 'bottom-center', icon: false, duration: 2000 })
      loading.value = false
    }
    onMounted(() => {
      loading.value = true
      getSections()
    })
    return {
      formData,
      getSections,
      order,
      loading,
      statusName,
      getUser,
      user,
      statuses,
      paramsSearchUsers,
      basketSumm,
      columns,
      tableOptions,
      editRow,
      changePage,
      panelStatuses,
      changeStatusOrder
    }
  }
}
</script>

<style module lang="scss">
  .title {
    font-size: 2.4rem;
  }
  .seotitle {
    margin-bottom: 1rem;
  }
  .orderInfo {
    width: 30%;
    @media (max-width: 768px) {
      width: 30rem;
    }
  }
  .leftpanel {
    display: flex;
    margin-right: 2rem;
  }
  .rightpanel {
    display: flex;
    width: -webkit-fill-available;
    overflow: auto;
    justify-content: flex-end;
    white-space: nowrap;
    @media (max-width: 768px) {
      font-size: 1.4rem;
      justify-content: flex-start;
      button {
        
      }
    }
  }
  .head {
    display: flex;
    justify-content: space-between;
  }
  .content {
    display: flex;
    justify-content: space-between;
    .table {
      width: 60%;
    }
    @media (max-width: 768px) {
      flex-direction: column;
      .table {
        width: 100%
      }
    }
    
  }
</style>