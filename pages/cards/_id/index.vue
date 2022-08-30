<template>
  <div class="wrap wrap-loading">
    <UILoading
    v-if="loading"
    />
    <div
    v-show="!loading"
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
          <div class="input checkbox">
            <label>
              <span class="label">
                Отображать на главной
              </span>
              <input v-model="formData.show_in_main" type="checkbox">
            </label>
          </div>
          <div class="input">
            <label>
              <span class="label">
                Цена
              </span>
              <input v-model="formData.price" type="text">
            </label>
          </div>

          <!-- <div class="input image">
            <label>
              <span class="label">
                
              </span>
              <input multiple @change="changeImages" type="file">
            </label>
          </div> -->
          <div class="input image">
            <span>Фотографии</span>
            <vue-upload-multiple-image
            @upload-success="uploadImageSuccess"
            @before-remove="beforeRemove"
            @edit-image="editImage"
            :data-images="images"
            ></vue-upload-multiple-image>
          </div>

          <VueEditor v-model="editorHTML" />
          <div>
          {{ editorHTML }}
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
import { ref, reactive, onMounted, useContext, computed } from '@nuxtjs/composition-api';
import VueUploadMultipleImage from 'vue-upload-multiple-image';
export default {
  name: 'section-edit',
  components: {
    VueUploadMultipleImage,
  },
  setup() {
    const { store, route, $toast } = useContext()
    const loading = ref(false)
    const formData = ref({

    })
    // const configEditor = ref({
    //   tools: {
    //     header: {
    //       class: Header,
    //       config: {
    //         placeholder: "Enter a header",
    //         levels: [2, 3, 4],
    //         defaultLevel: 3,
    //       },
    //     },
    //     list: {
    //       class: List,
    //       inlineToolbar: true,
    //     },
    //     paragraph: {
    //       class: Paragraph,
    //     },
    //     delimiter: {
    //       class: Delimiter,
    //     }
    //   },
    //   onReady: () => {
    //     this.$refs.editorjs._data.state.editor.save().then((data) => {
    //       this.config.data = JSON.stringify(data);
    //     });
    //   },
    //   onChange: (args) => {
    //     this.$refs.editorjs._data.state.editor.save().then((data) => {
    //       this.config.data = JSON.stringify(data);
    //     });
    //   },
    //   data: ""
    // })
    const item = ref({})
    const getSections = async () => {
      loading.value = true
      const data = await store.dispatch(`cards/getCard`, route.value.params.id)
      item.value = data
      console.log(item.value)
      formData.value = {
        ...item.value
      }
      loading.value = false
    }
    const editorHTML = ref('')
    const images = computed(() => {
      let imagesArray = []
      console.log(item.value)
      if (item.value.files) {
        item.value.files.forEach(image => {
          imagesArray.push({
            path: 'http://192.168.1.19/'+image.src,
            default: 1,
            highlight: 1,
            caption: 'caption to display. receive', // Optional
          })
        })
        return imagesArray
      }
      
    })

    const changeImages = (event) => {
      console.log(event.target.files)
    }
    
    const submit = async () => {
      const data = {

      }
      loading.value = true
      $toast.success('Информация сохранена', { position: 'bottom-center', icon: false, duration: 2000 })
      loading.value = false
      console.log(response)
    }

    const uploadImageSuccess = (formData, index, fileList) => {
      console.log('data', formData, index, fileList)
    }

    const beforeRemove = (index, done, fileList) => {
      console.log('index', index, fileList)
    }
    
    const editImage = (formData, index, fileList) => {
      console.log('edit data', fileList)
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
      changeImages,
      uploadImageSuccess,
      beforeRemove,
      editImage,
      images,
      editorHTML
      // configEditor
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