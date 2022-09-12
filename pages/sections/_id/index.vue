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
            <button @click.prevent="$router.push('/sections')" class="btn back">
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
          <div class="quotes mb-10">
            <span class="">
              Цитаты
            </span>
            <div class="input list mt-5">
              <label v-for="(item, index) of quotes" :key="index" for="">
                <div class="fill">
                  <input v-model="quotes[index].quote_text" placeholder="Цитата" type="text">
                  <input v-model="quotes[index].author" placeholder="Автор" type="text">
                </div>
                
                <svg @click="removeQuote(index, item)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 310.285 310.285" style="enable-background:new 0 0 310.285 310.285;" xml:space="preserve"><path d="M155.143,0.001C69.597,0.001,0,69.597,0,155.143c0,85.545,69.597,155.142,155.143,155.142s155.143-69.597,155.143-155.142  C310.285,69.597,240.689,0.001,155.143,0.001z M244.143,171.498c0,4.411-3.589,8-8,8h-163c-4.411,0-8-3.589-8-8v-32  c0-4.411,3.589-8,8-8h163c4.411,0,8,3.589,8,8V171.498z"/><g> </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                <svg @click="saveQuote(index, item)" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g>
                  <g>
                    <path d="M439.965,0H1.108v512h509.784V72.407L439.965,0z M74.251,73.143H293.68v110.823H74.251V73.143z M437.749,441.074H72.035
                      V257.108h365.714V441.074z M437.749,183.965h-70.926V73.143h42.625l28.302,29.339V183.965z"/>
                  </g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                </svg>
              </label>
              <svg class="add" @click="addQuote" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 52 52" style="enable-background:new 0 0 52 52;" xml:space="preserve"><path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2  s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2  S39.604,28,38.5,28z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
            </div>
            <div v-if="v$.sort.$errors[0]" class="errors">
              {{ v$.sort.$errors[0].$message }}
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
    const quotes = ref([
      ''
    ])
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
      item.value = await store.dispatch('sections/getSection', route.value.params.id)
      quotes.value = [
        ...item.value.quotes
      ]
      formData.value = {
        ...item.value.section
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
    const addQuote = () => {
      quotes.value.push({
        quote_text: '',
        author: ''
      })
    }
    const removeQuote = async (index,item) => {
      if (item.id) {
        loading.value = true
        const response = await store.dispatch('sections/deleteQuote', item.id)
        quotes.value.splice(index,1)
        loading.value = false
      }
      else {
        quotes.value.splice(index,1)
      }
    }
    const saveQuote = async (index,item) => {
      console.log(index, item)
      loading.value = true
      let params = {
        mode: '',
        section_id: +route.value.params.id,
        quote_text: item.quote_text,
        author: item.author
      }
      if (item.id) {
        params.mode = 'edit',
        params.id = item.id
      }
      else {
        params.mode = 'add'
      }
      const response = await store.dispatch('sections/saveQuote', params)
      loading.value = false
    }
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
      canSend,
      quotes,
      addQuote,
      removeQuote,
      saveQuote
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