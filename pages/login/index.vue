<template>
  <div :class="$style.auth" class="wrap">
    <UILoading
    v-if="loading"
    />
    <div v-else :class="$style.login">
      <form action="" class="">
        <div class="input">
          <label for="">
            <span class="label">
              Email
            </span>
            <input placeholder="Email" v-model="formData.email" type="text">
          </label>
        </div>
        <div class="input">
          <label for="">
            <span class="label">
              Пароль
            </span>
            <input placeholder="Пароль" v-model="formData.password" type="password">
          </label>
        </div>
        <button @click.prevent="submit" type="submit" class="btn" :class="$style.btn">
          Войти
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, useContext, useRouter } from '@nuxtjs/composition-api';
export default {
  name: 'login',
  layout: 'login',
  setup(props, ctx) {
    const { store, $toast } = useContext()
    const router = useRouter()
    console.log(router)
    const formData = ref({
      email: '',
      password: ''
    })
    console.log(router)
    const loading = ref(false)
    const submit = async () => {
      const data = formData.value
      loading.value = true
      const response = await store.dispatch('login/login', data)
      loading.value = false
      console.log(response)
    }
    return {
      formData,
      submit,
      loading
    }
  }
}
</script>

<style lang="scss" module>
  .auth {
    background-color: #f3f6fb;
    height: 100vh;
  }
  .btn {
    display: block;
    margin: 0 auto;
  }
  .login {
    position: absolute;
    padding: 2rem;
    top: 50%;
    border-radius: 10px;
    left: 50%;
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 12px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 0px 12px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 0px 12px 0px rgba(34, 60, 80, 0.2);
    color: #050505;
    transform: translate(-50%, -50%);
  }
</style>