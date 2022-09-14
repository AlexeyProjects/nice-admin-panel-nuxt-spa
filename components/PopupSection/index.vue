<template>
  <div v-if="isShow" class="popup">
    <div class="popup-wrap">
      <div class="popup-header">
        <div class="popup-header__title">
          Выберите тип
        </div>
        <div v-show="true" @click="closePopup" class="popup-header__close">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></svg>
        </div>
      </div>
      <div class="popup-body wrap">
        <UILoading v-if="loading"></UILoading>
        <div v-else class="">
          <button @click.prevent="chooseSection(item)" v-for="(item, index) in viewingSections" :class="$style.section" class="btn">
            {{ item.title }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, useContext, onMounted, useRouter, computed } from '@nuxtjs/composition-api';

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },  
  setup(props, ctx) {
    const { emit } = ctx
    const router = useRouter()
    const loading = ref(false)
    const { store } = useContext()
    const sections = ref([])
    const paramsSearch = ref({
      section_id: null,
      searchField: '',
      author_id: null,
      tags: [],
      page: 1,
      count: 10
    })
    const getSections = async () => {
      loading.value = true
      const data = await store.dispatch('sections/getSections', paramsSearch.value)
      sections.value = data.data
      loading.value = false
    }
    const viewingSections = computed(() => {
      return sections.value.filter(item => item.can_has_cards)
    })
    const chooseSection = (item) => {
      emit('chooseSection',item)
    }
    const closePopup = () => {
      router.push({
        path: `/cards`
      })
      // emit('closePopup')
    }
    onMounted(() => {
      getSections()
    })
    return {
      sections,
      loading,
      getSections,
      paramsSearch,
      closePopup,
      chooseSection,
      viewingSections
    }
  }
  
}
</script>

<style module lang="scss">
  .section {
    margin-right: 1rem;
    margin-bottom: 1rem;
    border-radius: 5px;
  }
  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
  }
</style>