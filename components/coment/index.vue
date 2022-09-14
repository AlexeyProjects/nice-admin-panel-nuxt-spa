<template>
  <div :class="$style.coment">
    <p @click="showUser" :class="$style.user" class="mb-5">
      {{ $props.coment.user.nickname }}
    </p>
    <img v-if="$props.coment.sticker" :src="`https://test.itisthenice.com/${$props.coment.sticker.file.src}`" alt="">
    <p v-else class="mb-5"> 
      {{ content }}
    </p>
    <span>{{time}}</span>
    <svg @click="deleteComent(index)" :class="$style.close" xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></svg>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, useRouter, useContext } from '@nuxtjs/composition-api';
export default {
  props: {
    coment: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: null
    }
  },
  setup(props, ctx) {
    const { emit } = ctx
    const router = useRouter()
    const time = computed(() => {
      const propsTime = new Date(props.coment.created_at)
      console.log(propsTime)
      let month = ''
      switch (propsTime.getMonth()) {
        case 0 :
          month = 'Января'
          break
        case 1 :
          month = 'Февраля'
          break
        case 2 :
          month = 'Марта'
          break
        case 3 :
          month = 'Апреля'
          break
        case 4 :
          month = 'Мая'
          break
        case 5 :
          month = 'Июня'
          break
        case 6 :
          month = 'Июля'
          break
        case 7 :
          month = 'Августа'
          break
        case 8 :
          month = 'Сентября'
          break
        case 9 :
          month = 'Октября'
          break
        case 10 :
          month = 'Ноября'
          break
        case 11 :
          month = 'Декабря'
          break

      }
      return `${propsTime.getDate()} ${month} ${propsTime.getFullYear()} ${propsTime.getHours()}:${propsTime.getMinutes()}`
    })
    const content = computed(() => {
      return decodeURIComponent(escape(props.coment.text)) 
    })
    const deleteComent = (index) => {
      console.log()
      emit('deleteComent', props.coment.id, index)
    }
    const showUser = () => {
      router.push({
        path: `/users/${props.coment.user_id}`
      })
    }
    return {
      time,
      deleteComent,
      showUser,
      content
    }
  }
}
</script>

<style module lang="scss">
  .coment {
    position: relative;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    .user {
      &:hover {
        cursor: pointer;
      }
    }
    img {
      width: 8rem;
    }
    &:hover {
      .close {
        opacity: 1;
      }
    }
    .close {
      position: absolute;
      right: .5rem;
      top: .5rem;
      opacity: 1;
      transition: .2s;
      &:hover {
        cursor: pointer;
      }
    }
  } 
</style>