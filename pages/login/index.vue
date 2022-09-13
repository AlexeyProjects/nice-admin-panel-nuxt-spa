<template>
  <div :class="$style.auth" class="wrap">
    <Background></Background>
    <UILoading
    v-if="loading"
    />
    <div v-else :class="$style.login">
      <logotype class="logotype-login"/>
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
import Background from '~/components/Background/index.vue';
export default {
    name: "login",
    layout: "login",
    setup(props, ctx) {
        const { store, $toast } = useContext();
        const router = useRouter();
        const formData = ref({
            email: "",
            password: ""
        });
        const loading = ref(false);
        const submit = async () => {
            const data = formData.value;
            loading.value = true;
            const response = await store.dispatch("login/login", data);
            loading.value = false;
        };
        return {
            formData,
            submit,
            loading
        };
    },
    components: { Background }
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
    
    top: 50%;
    
    left: 50%;
    
    color: #050505;
    transform: translate(-50%, -50%);
    z-index: 10;
    form {
      border-radius: 10px;
      padding: 2rem;
      background-color: #fff;
      -webkit-box-shadow: 0px 0px 12px 0px rgba(34, 60, 80, 0.2);
      -moz-box-shadow: 0px 0px 12px 0px rgba(34, 60, 80, 0.2);
      box-shadow: 0px 0px 12px 0px rgba(34, 60, 80, 0.2);
    }
  }
</style>