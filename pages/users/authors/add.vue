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
              <button @click.prevent="$router.push('/users/authors')" class="btn back">
                Назад
              </button>
              <div :class="$style.title">
                
              </div>
            </div>
            <div :class="$style.rightpanel">
              <!-- <button @click.prevent="deleteTag" class="btn red">Удалить</button>  -->
            </div>
          </div>
          <div class="input">
            <label for="">
              <span class="label">
                Название
              </span>
              <input v-model="formData.name" type="text">
            </label>
            <div v-if="showNameValidate" class="errors validation-error">
              {{ v$.name.$errors[0].$message }}
            </div>
          </div>
          <div class="input">
            <label for="">
              <span class="label">
                Описание
              </span>
              <input v-model="formData.description" type="text">
            </label>
            <div v-if="showDescValidate" class="errors validation-error">
              {{ v$.description.$errors[0].$message }}
            </div>
          </div>

          <div v-if="item.section_id !== 2" class="input image">
            <span>Фотографии</span>
            <vue-upload-multiple-image
            :maxImage="10"
            class="mb-15"
            :showEdit="false"
            markIsPrimaryText=""
            markIsPrimaryText=""
            dropText="Перетащите картинку сюда"
            dragText="Перетащите картинку сюда"
            browseText="Выбрать картинку"
            :showPrimary="false"
            @upload-success="uploadImageSuccess"
            @before-remove="beforeRemove"
            :data-images="imagesPreview"
            ></vue-upload-multiple-image>
            <div v-if="showImagesValidate" class="errors validation-error">
              {{ v$.imagesPreview.$errors[0].$message }}
            </div>
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
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { ref, reactive, onMounted, useContext, computed } from '@nuxtjs/composition-api';
import VueUploadMultipleImage from 'vue-upload-multiple-image';
export default {
  name: 'section-edit',
  components: {
    VueUploadMultipleImage
  }, 
  setup() {
    const { store, route, $toast, $axios } = useContext()
    const loading = ref(false)
    const formData = ref({
      name: '',
      description: '',
      imagesPreview: []
    })
    var v$ = ref({})
    const rules = reactive({
      name: { required: helpers.withMessage('Введите заголовок', required) },
      description: { required: helpers.withMessage('Введите описание', required) },
      imagesPreview: { 
        required: helpers.withMessage('Выберите минимум 1 картинку', required),
        minLength: minLength(1),
        $each: {
          required
        }
      }
    })
    v$.value = useVuelidate(rules, formData.value)
    const imagesPreview = ref([])
    const item = ref({})
    const submit = async () => {
      v$.value.$touch()
      if (v$.value.$invalid) {
        console.log(v$.value)
        return
      }
      console.log(v$.value)
      var basketFiles = []
      async function processArray(array) {
        for (const item of array) {
          if (item.uploadedApi) {
            basketFiles.push(item.id)
          }
          if (!item.uploadedApi) {
            const file = dataURLtoFile(item.path, item.name)
            const uploadedFile = await saveImage(file)
            .then((res) => {
              basketFiles.push(res.id)
            })
          }
        }
      }
      await processArray(imagesPreview.value)
      const data = {
        mode: 'add',
        name: formData.value.name,
        description: formData.value.description,
        avatar_id: basketFiles[0]
      }
      loading.value = true
      const response = await store.dispatch('author/addAuthor', data)
      loading.value = false
    }
    const saveImage = async (file) => {
      var formData = new FormData();
      formData.append("file", file);
      formData.append("dir", 'uploaded-files');
      const res = await $axios.post('upload-file', formData,{
        headers: { "Content-Type": "multipart/form-data" }
      })
      const newFile = {
        id: res.data.data.id,
        path: 'https://test.itisthenice.com/'+res.data.data.src,
        default: 1,
        highlight: 1,
        caption: 'caption to display. receive', // Optional
      }
      // imagesPreview.value.push(newFile)
      return newFile
    }
    const dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }
    const uploadImageSuccess = (f, index, fileList) => {
      imagesPreview.value = fileList 
      formData.value.imagesPreview = fileList
    }
    const beforeRemove = (index, done, fileList) => {
      const item = fileList[index]
      imagesPreview.value.splice(index, 1);
      formData.value.imagesPreview.splice(index, 1);
    }
    const showNameValidate = computed(() => {
      return v$.value?.name?.$errors[0]
    })
    const showDescValidate = computed(() => {
      return v$.value?.description?.$errors[0]
    })
    const showImagesValidate = computed(() => {
      return v$.value?.imagesPreview?.$errors[0]
    })
    onMounted(() => {

    })
    return {
      formData,
      item,
      loading,
      submit,
      uploadImageSuccess,
      beforeRemove,
      imagesPreview,
      dataURLtoFile,
      saveImage,
      showImagesValidate,
      rules,
      v$,
      showDescValidate,
      showNameValidate
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