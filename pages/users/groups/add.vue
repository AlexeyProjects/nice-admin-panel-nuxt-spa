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
              <button @click.prevent="$router.push('/tags')" class="btn back">
                Назад
              </button>
              <div :class="$style.title">
                Добавить группу
              </div>
            </div>
            <div :class="$style.rightpanel">
              <!-- <button @click.prevent="deleteTag" class="btn red">Удалить</button>  -->
            </div>
          </div>
          <div class="input">
            <label for="">
              <span class="label">
                Название
              </span>
              <input v-model="formData.name" type="text">
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
      name: ''
    })
    const item = ref({})
    const deleteTag = async () => {
      loading.value = true
      const response = await store.dispatch('groups/deleteGroup', data)
      formData.value = response.data
      $toast.success('Информация сохранена', { position: 'bottom-center', icon: false, duration: 2000 })
      loading.value = false
    }
    const submit = async () => {
      const data = {
        name: formData.value.name
      }
      loading.value = true
      const response = await store.dispatch('groups/addGroup', data)
      loading.value = false
    }
    onMounted(() => {

    })
    return {
      formData,
      item,
      loading,
      submit,
      deleteTag
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