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
            {{ item.title }}
          </div>
          <div class="input">
            <label for="">
              <span class="label">
                Название
              </span>
              <input v-model="formData.title" type="text">
            </label>
          </div>
          <div class="input">
            <label for="">
              <span class="label">
                Сортировки
              </span>
              <input v-model="formData.sort" type="text">
            </label>
          </div>
          <div class="input checkbox">
            <label>
              <span class="label">
                Наличие картинок
              </span>
              <input v-model="formData.can_has_cards" type="checkbox">
            </label>
          </div>
          <div class="input">
            <label for="">
              <span class="label">
                Описание
              </span>
              <textarea v-model="formData.description" type="text"/>
            </label>
          </div>
        </div>
        <div class="">
          <div :class="$style.seotitle">Seo</div>
          <div class="input">
            <label for="">
              <span class="label">
                Название
              </span>
              <input v-model="formData.seo_title" type="text">
            </label>
          </div>
          <div class="input">
            <label for="">
              <span class="label">
                Описание
              </span>
              <textarea v-model="formData.seo_description" type="text"/>
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
      const data = await store.dispatch('sections/getSections')
      console.log(data)
      console.log(route.value.params.id)
      item.value = data.data.find(item => item.id == route.value.params.id)
      formData.value = {
        ...item.value
      }
      loading.value = false
    }
    const submit = async () => {
      const data = formData.value
      loading.value = true
      const response = await store.dispatch('sections/editSection', data)
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