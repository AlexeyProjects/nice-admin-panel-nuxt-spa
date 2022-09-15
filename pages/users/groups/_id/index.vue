<template>
  <div class="wrap wrap-loading">
    <UILoading
    v-if="loading"
    />
    <div
    v-else
    class="">
      <form action="">
        <div class="main">
          <div :class="$style.head" class="head mb-20">
            <div :class="$style.leftpanel">
              <button @click.prevent="$router.push('/users/groups')" class="btn back">
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
                Кол-во пользователей
              </span>
              <input v-model="formData.users_count" readonly type="text">
            </label>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import { ref, reactive, onMounted, useContext } from '@nuxtjs/composition-api';
export default {
  name: 'section-edit',
  setup() {
    const { store, route, $toast } = useContext()
    const loading = ref(false)
    const tag = ref({})
    const formData = ref({
      name: ''
    })
    const paramsSearch = ref({
      entity: 'groups',
      searchField: '',
      page: 1,
      count: 9999
    })
    const item = ref({})
    const deleteTag = async () => {
      loading.value = true
      const response = await store.dispatch('groups/deleteGroup', +route.value.params.id)
      loading.value = false
    }
    const getTag = async () => {
      loading.value = true
      const response = await store.dispatch('groups/getGroups', paramsSearch.value)
      console.log(response.data)
      console.log(route.value.params.id)
      tag.value = response.data.find(item => item.id === +route.value.params.id)
      formData.value = {
        ...tag.value
      }
      loading.value = false
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
    })
    return {
      formData,
      item,
      loading,
      submit,
      tag,
      deleteTag,
      paramsSearch,
      getTag
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
</style>