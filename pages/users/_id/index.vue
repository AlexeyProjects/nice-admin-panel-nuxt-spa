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
              <button @click.prevent="$router.push('/users')" class="btn back">
                Назад
              </button>
              <div :class="$style.title">
                {{ item.nickname }}
              </div>
            </div>
            <div :class="$style.rightpanel">
              <button @click.prevent="deleteCard" class="btn red">Удалить</button>
            </div>
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

        <div class="abilities mb-20">
          <label v-for="(ability, index) in abilities">
            <span>
              {{ ability.ability_name }}
            </span>
            <input @change="changeAbility(ability)" type="checkbox" v-model="ability.hasUser">
          </label>
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
    const abilities = ref({})
    const item = ref({})
    const getSections = async () => {
      loading.value = true
      const data = await store.dispatch('users/getUsers')
      item.value = data.data.find(item => item.id == route.value.params.id)
      const abilitiesData = await store.dispatch('users/getAbilities', item.value.id )
      abilities.value = abilitiesData.data
      formData.value = {
        ...item.value
      }
      loading.value = false
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
    const changeAbility = async (ability) => {
      const data = {
        user_id: formData.value.id,
        ability_id: ability.id
      }
      if (ability.hasUser) {
        store.dispatch('users/addAbility', data)
      }
      else {
        store.dispatch('users/deleteAbility', data)
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
      abilities,
      changeAbility
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
  .head {
    display: flex;
    justify-content: space-between;
    .leftpanel {
      display: flex;
    }
  }
</style>