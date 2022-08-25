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
          <div :class="$style.title">
            {{ item.nickname }}
          </div>
          <div class="input">
            <label for="">
              <span class="label">
                Имя
              </span>
              <input v-model="formData.nickname" readonly type="text">
            </label>
          </div>
          <div class="input">
            <label>
              <span class="label">
                Телефон
              </span>
              <input v-model="formData.phone" readonly type="text">
            </label>
          </div>
          <div class="input">
            <label for="">
              <span class="label">
                Email
              </span>
              <input v-model="formData.email" readonly type="text"/>
            </label>
          </div>
          <div class="input">
            <label for="">
              <span class="label">
                Заметка
              </span>
              <input v-model="formData.note" type="text"/>
            </label>
          </div>
        </div>

        <button @click.prevent="submit" class="btn">
          Сохранить
        </button>
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
    const formData = ref({

    })
    const item = ref({})
    const getSections = async () => {
      loading.value = true
      const data = await store.dispatch('users/getUsers')
      console.log(data.data)
      console.log(route.value.params.id)
      console.log(data.data[0])
      console.log(data.data[0].id == +route.value.params.id)
      item.value = data.data.find(item => item.id == route.value.params.id)
      formData.value = {
        ...item.value
      }
      loading.value = false
    }
    console.log('s')
    console.log(useContext())
    const submit = async () => {
      const data = {
        user_id: formData.value.id,
        note: formData.value.note
      }
      loading.value = true
      const response = await store.dispatch('users/changeNote', data)
      $toast.success('Информация сохранена', { position: 'bottom-center', icon: false, duration: 2000 })
      loading.value = false
      console.log(response)
    }
    onMounted(() => {
      getSections()
    })
    return {
      formData,
      getSections,
      item,
      loading,
      submit
    }
  }
}
</script>

<style module lang="scss">
  .title {
    font-size: 2.4rem;
    margin-bottom: 1rem;
  }
  .seotitle {
    margin-bottom: 1rem;
  }
</style>