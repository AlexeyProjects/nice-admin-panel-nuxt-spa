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
              <!-- <button @click.prevent="deleteCard" class="btn red">Удалить</button> -->
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
          <div class="">
            <div class="mb-15">
              <multiselect 
              class="mt-15 mb-5"
              v-model="formData.group" 
              :options="groups"
              noOptions="Список пустой"
              label="name"
              @select="changeGroup"
              placeholder="Фильтрация по группам"
              track-by="id"/>
            </div>
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

        <div v-if="canChangeStatus" class="abilities mb-20">
          <label v-for="(ability, index) in abilities">
            <span>
              {{ ability.ability_name }}
            </span>
            <input @change="changeAbility(ability)" type="checkbox" v-model="ability.hasUser">
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
import { ref, reactive, onMounted, computed, useContext } from '@nuxtjs/composition-api';
import Multiselect from 'vue-multiselect'

export default {
  name: 'section-edit',
  components: {
    Multiselect
  },
  setup() {
    const { store, route, $toast } = useContext()
    const loading = ref(false)
    const formData = ref({

    })
    const groups = ref([])
    const isAuthor = ref(false)
    const abilities = ref({})
    const item = ref({})
    const getSections = async () => {
      loading.value = true
      const data = await store.dispatch('users/getUsers')
      console.log(data.data)
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
    const canChangeStatus = computed(() => {
      return store.state?.login?.ability?.find(ability => ability.id === 8)?.hasUser
    })
    const getGroups = async () => {
      loading.value = true
      const paramsSearchGroups = {
      entity: 'groups',
      searchField: '',
      page: 1,
      count: 9999
    }
      const data = await store.dispatch('tags/getTags', paramsSearchGroups)
      groups.value = data.data
      loading.value = false
    }
    const changeGroup = async (selectedOption, id) => {
      console.log(selectedOption, id)
      const data = {
        user_id: +route.value.params.id,
        group_id: selectedOption.id
      }
      await store.dispatch('groups/changeGroup', data)
    }
    onMounted(() => {
      getSections()
      getGroups()
    })
    return {
      formData,
      getSections,
      item,
      loading,
      submit,
      abilities,
      changeAbility,
      canChangeStatus,
      getGroups,
      groups,
      changeGroup
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