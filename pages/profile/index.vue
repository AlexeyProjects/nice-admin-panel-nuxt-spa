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
            Профиль
          </div>
          <div v-if="formData.nickname" class="input">
            <label for="">
              <span class="label">
                Имя
              </span>
              <input v-model="formData.user.nickname" readonly type="text">
            </label>
          </div>
          <div v-if="formData.user" class="input">
            <label>
              <span class="label">
                Телефон
              </span>
              <input v-model="formData.user.phone" readonly type="text">
            </label>
          </div>
          <div v-if="formData.user" class="input">
            <label for="">
              <span class="label">
                Email
              </span>
              <input v-model="formData.user.email" readonly type="text"/>
            </label>
          </div>
          <div v-if="false" class="input">
            <label for="">
              <span class="label">
                Заметка
              </span>
              <input v-model="formData.user.note" type="text"/>
            </label>
          </div>
          
        </div>
        <div class="abilities mb-20">
          <label v-for="(item, index) in abilities" :key="index">
            <span>
              {{ item.ability_name }}
            </span>
            <input @change="changeAbility(item)" type="checkbox" v-model="item.hasUser">
          </label>
        </div>
        <!-- <div class="input checkbox">
          <label>
            <span class="label">
              Является автором
            </span>
            <input @change="stateAuthor()" v-model="isAuthor" type="checkbox">
          </label>
        </div> -->
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
    const isAuthor = ref(false)
    const abilities = ref({})
    const item = ref({})
    const userAbilities = ref({})
    const allAbilities = ref({})
    const getSections = async () => {
      loading.value = true
      const data = await store.dispatch('login/checkVerify')
      const author = data.data.data.author
      isAuthor.value = author
      const abilitiesData = await store.dispatch('users/getAbilities', data.data.data.user.id )
      abilities.value = abilitiesData.data
      item.value = Object.assign({}, data.data.data);
      formData.value = {
        ...item.value
      }
      formData.value = Object.assign({}, data.data.data);
      loading.value = false
    }
    const changeAbility = async (item) => {
      const data = {
        user_id: formData.value.user.id,
        ability_id: item.id
      }
      if (item.hasUser) {
        store.dispatch('users/addAbility', data)
      }
      else {
        store.dispatch('users/deleteAbility', data)
      } 
    }
    const makeAuthor = async () => {
      
    }
    const submit = async () => {
      const data = {
        user_id: formData.value.id,
        note: formData.value.note
      }
      loading.value = true
      const response = await store.dispatch('users/changeNote', data)
      $toast.success('Информация сохранена', { position: 'bottom-center', icon: false, duration: 2000 })
      loading.value = false
    }
    const stateAuthor = async () => {
      if (isAuthor.value) {
        await store.dispatch('users/makeAuthor', formData.value.user.id)
      } else {
        await store.dispatch('users/deleteAuthor', formData.value.author.id)
      }
    }
    onMounted(() => {
      getSections()
    })
    return {
      formData,
      getSections,
      item,
      loading,
      submit,
      userAbilities,
      abilities,
      changeAbility,
      isAuthor,
      stateAuthor
    }
  }
}
</script>

<style module lang="scss">
  .title {
    font-size: 2.4rem;
    margin-bottom: 1rem;
    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }
  .seotitle {
    margin-bottom: 1rem;
  }
</style>