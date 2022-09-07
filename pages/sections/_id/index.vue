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
          <div class="head mb-15">
            <button @click.prevent="$router.push('/cards')" class="btn back">
              Назад
            </button>
            <div :class="$style.title">
              {{ item.title }}
            </div>
          </div>
          <div class="input">
            <label for="">
              <span class="label">
                Название
              </span>
              <input v-model="formData.title" type="text">
            </label>
            <div v-if="v$.title.$errors[0]" class="errors">
              {{ v$.title.$errors[0].$message }}
            </div>
          </div>
          <div class="input">
            <label for="">
              <span class="label">
                Сортировки
              </span>
              <input v-model="formData.sort" type="text">
            </label>
            <div v-if="v$.sort.$errors[0]" class="errors">
              {{ v$.sort.$errors[0].$message }}
            </div>
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
            <div v-if="v$.description.$errors[0]" class="errors">
              {{ v$.description.$errors[0].$message }}
            </div>
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
            <div v-if="v$.seo_title.$errors[0]" class="errors">
              {{ v$.seo_title.$errors[0].$message }}
            </div>
          </div>
          <div class="input">
            <label for="">
              <span class="label">
                Описание
              </span>
              <textarea v-model="formData.seo_description" type="text"/>
            </label>
            <div v-if="v$.seo_description.$errors[0]" class="errors">
              {{ v$.seo_description.$errors[0].$message }}
            </div>
          </div>
        </div>
        <button @click.prevent="submit" :class="!canSend ? 'disable' : ''" class="btn">
          Сохранить
        </button>
      </form>
    </div>

  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { ref, reactive, onMounted, computed, useContext } from '@nuxtjs/composition-api';
export default {
  name: 'section-edit',
  setup() {
    const { store, route, $toast } = useContext()
    
    const loading = ref(false)
    const formData = ref({

    })
    const rules = {
      title: { required: helpers.withMessage('Введите данные', required) },
      sort: { required: helpers.withMessage('Введите данные', required) },
      seo_title: { required: helpers.withMessage('Введите данные', required) },
      seo_description: { required: helpers.withMessage('Введите данные', required) },
      description: { required: helpers.withMessage('Введите данные', required) }
    }
    const v$ = useVuelidate(rules, formData)
    const item = ref({})
    const getSections = async () => {
      loading.value = true
      const data = await store.dispatch('sections/getSections')
      item.value = data.data.find(item => item.id == route.value.params.id)
      formData.value = {
        ...item.value
      }
      loading.value = false
    }
    const submit = async () => {
      v$.value.$touch()
      if (v$.value.$invalid) {
        console.log(v$.value?.title?.$errors[0]?.$message)
        console.log('error')
        return
      }
      const data = formData.value
      loading.value = true
      const response = await store.dispatch('sections/editSection', data)
      $toast.success('Информация сохранена', { position: 'bottom-center', icon: false, duration: 2000 })
      loading.value = false
    }
    const canSend = computed(() => {
      return !v$.value.$invalid
    })
    onMounted(() => {
      getSections()
    })
    return {
      rules,
      formData,
      getSections,
      item,
      loading,
      submit,
      v$,
      canSend
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
</style>