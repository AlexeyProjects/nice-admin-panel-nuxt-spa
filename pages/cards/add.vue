<template>
  <div class="wrap wrap-loading">
    <UILoading
    v-if="loading && !sectionChoosed"
    />
    <div
    v-if="!loading && sectionChoosed"
    class="">
      <form action="">
        <div class="main">
          <div class="head mb-15">
            <button @click.prevent="$router.push('/cards')" class="btn back">
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
            <div class="">
            </div>
            <div v-if="v$.title.$errors[0] && v$.title" class="errors">
              {{ v$.title.$errors[0].$message }}
            </div>
          </div>
          <div v-click-outside="closeAuthorList" class="input search">
            <label for="">
              <span class="label">
                Автор
              </span>
              <input @input="searchAuthor" @focus="focusInput" v-model="searchAuthorTerm"  type="text">
            </label>
            <svg class="removeAuthor" @click="removeChoosedAuthor" xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></svg>
            <div v-if="showAuthorSearch" class="list">
              <div v-if="!authorSearchItems.length" class="list-item">
                Ничего не найдено
              </div>
              <div @click="chooseAuthor(item)" v-for="(item, index) in authorSearchItems" :key="index" class="list-item">
                {{ item.name }}
              </div>
            </div>
            <div v-if="v$.title.$errors[0] && v$.title" class="errors">
              {{ v$.title.$errors[0].$message }}
            </div>
          </div>
          <div class="input checkbox">
            <label>
              <span class="label">
                Отображать на главной
              </span>
              <input v-model="formData.show_in_main" type="checkbox">
            </label>
          </div>
          
          <div v-if="showDate" class="input datepicker">
            <label>
              <span class="label">
                Дата и время
              </span>
              <date-picker v-model="formData.date_event" format="YYYY-MM-DD hh:mm" valueType="format" type="datetime"></date-picker>
              <!-- <input type="datetime-local" placeholder="ДД.ММ.ГГГГ, ЧЧ:ММ" :min="new Date().toLocaleDateString('en-ca')+'T08:00'" ref="datePicker" class="date-picker-mm form-control" v-model="formData.date_event" id="date_event" name="date_event" value=""> -->
            </label>
            <div v-if="v$.date_event.$errors[0]" class="errors validation-error">
              {{ v$.date_event.$errors[0].$message }}
            </div>
          </div>
          
          <div class="input checkbox">
            <label>
              <span class="label">
                Является товаром
              </span>
              <input v-model="isProduct" type="checkbox">
            </label>
          </div>
          <div v-if="isProduct" class="input">
            <label>
              <span class="label">
                Количество
              </span>
              <input v-model="formData.count" type="text">
            </label>
          </div>
          <div v-if="isProduct" class="input">
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
          <div v-if="item.section_id !== 2" class="input image">
            <span>Фотографии</span>
            <vue-upload-multiple-image
            :maxImage="10"
            class="mb-15"
            :showEdit="false"
            markIsPrimaryText=""
            dropText="Перетащите картинку сюда"
            dragText="Перетащите картинку сюда"
            idUpload="photos"
            browseText="Выбрать картинку"
            :showPrimary="false"
            @upload-success="uploadImageSuccess"
            @before-remove="beforeRemove"
            :data-images="imagesPreview"
            ></vue-upload-multiple-image>
            <div v-if="showImageValidate" class="errors validation-error">
              {{ v$.imagesPreview.$errors[0].$message }}
            </div>
          </div>
          <div class="mb-15">
            <span class="mb-15">
              Теги
            </span>
            <multiselect 
            class="mt-15 mb-5"
            v-model="formData.tags" 
            :options="tags" 
            label="name"
            track-by="id"
            :multiple="true"/>
            <div v-if="v$.tags.$errors[0]" class="errors validation-error">
              {{ v$.tags.$errors[0].$message }}
            </div>
          </div>
          <!-- <div class="input">
            <label for="">
              <span class="label">
                SEO заголовок
              </span>
              <input v-model="formData.seo_title" type="text">
            </label>
            <div class="">
            </div>
          </div>
          <div class="input">
            <label for="">
              <span class="label">
                SEO описание
              </span>
              <input v-model="formData.seo_description" type="text">
            </label>
            <div class="">
            </div>
          </div> -->
          <!-- <div class="input image">
            <span>SEO image</span>
            <vue-upload-multiple-image
            :maxImage="1"
            class="mb-15"
            :showEdit="false"
            markIsPrimaryText=""
            dir="seos"
            idUpload="seos"
            dropText="Перетащите картинку сюда"
            dragText="Перетащите картинку сюда"
            browseText="Выбрать картинку"
            :showPrimary="false"
            @upload-success="uploadImageSuccessSEO"
            @before-remove="beforeRemoveSEO"
            :data-images="imagesPreviewSEO"
            ></vue-upload-multiple-image>
          </div> -->
          
          
          <div class="mb-15" v-if="showMusic" >
            <inputFile dir="uploaded-files"  @changeFiles="changeAudio" accept="audio/*" @deleteFiles="deleteAudio" :filesInput="audioBasket" :single="false" text="Добавить аудио" class="mb-5"></inputFile>
          </div>
          <div class="mb-15" v-if="showVideo" >
            <inputFile dir="uploaded-files"  @changeFiles="changeVideo" accept="video/*"  @deleteFiles="deleteVideo" :filesInput="videoBasket" :single="false" text="Добавить видео" class="mb-5"></inputFile>
            <div v-if="showVideoValidate" class="errors validation-error">
              {{ v$.videoBasket.$errors[0].$message }}
            </div>
          </div>
          <div v-if="showVideo" class="input image">
            <span>Preview к видео</span>
            <vue-upload-multiple-image
            :maxImage="1"
            class="mb-15"
            :showEdit="false"
            markIsPrimaryText=""
            dropText="Перетащите картинку сюда"
            dragText="Перетащите картинку сюда"
            idUpload="photos"
            browseText="Выбрать картинку"
            :showPrimary="false"
            @upload-success="uploadImageSuccess"
            @before-remove="beforeRemove"
            :data-images="imagesPreview"
            ></vue-upload-multiple-image>
            <div v-if="showImageValidate" class="errors validation-error">
              {{ v$.imagesPreview.$errors[0].$message }}
            </div>
          </div>
          
          <!-- <editor/> -->
          <div class="editor mb-15">
            <span class="mb-10">Краткое описание</span>
            <VueEditor class="editor-container" :editorToolbar="editorToolbar" v-model="formData.text" />
            <!-- <div class="editor-preview" v-html="formData.text">
          </div> -->
          
          </div>

          <div class="editor">
            <span class="mb-10">Описание</span>
            <VueEditor class="editor-container" :editorToolbar="editorToolbar" v-model="formData.subtitle" />
            <!-- <div class="editor-preview" v-html="formData.text">
          </div> -->
          
          </div>
        </div>

        <button @click.prevent="submit" :class="$style.btn_submit" class="submit btn">
          Сохранить
        </button>
      </form>
    </div>
    <transition name="fade">
      <PopupSection 
      @closePopup="closingChooseSection"
      @chooseSection="showAddCard"
      :isShow="showChooseSection"></PopupSection>
    </transition>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { ref, reactive, onMounted, useContext, useRouter, computed, nextTick } from '@nuxtjs/composition-api';
import VueUploadMultipleImage from 'vue-upload-multiple-image';
import Multiselect from 'vue-multiselect'
import PopupSection from '~/components/PopupSection/index.vue';
import vClickOutside from 'v-click-outside'
// import Editor from 'vue-editor-js/src/Editor.vue'
export default {
  name: 'section-edit',
  components: {
    VueUploadMultipleImage,
    Multiselect,
    DatePicker,
    vClickOutside
    // Editor
    ,
    PopupSection
  },
  directives: {
      clickOutside: vClickOutside.directive
  },
  setup() {
    const { store, route, $toast, $axios } = useContext()
    const router = useRouter()
    const loading = ref(false)
    const formData = ref({

    })
    const showChooseSection = ref(false)
    const isProduct = ref(false)
    const sectionChoosed = ref(false)
    const tags = ref([])
    const valueMultiSelect = ref([])
    const optionsMultiselect = ref([])
    const searchAuthorTerm = ref('')
    const authorSearchItems = ref('')
    const imagesPreviewSEO = ref([])
    const showAuthorSearch = ref(false)
    const item = ref(
        {
            title: '',
            text: '',
            fileIds: [],
            item_type_id: 1,
            price: 0,
            count: 0,
            imagesPreview: [],
            subtitle: '',
            audioBasket: [],
            videoBasket: [],
            date_event: null,
            section_id: null,
            tags: [],
            show_in_main: false
        }
    )
    const imagesPreview = ref([])
    const rules = reactive({
      title: { required: helpers.withMessage('Введите заголовок', required) },
      tags: { 
        required: helpers.withMessage('Выберите минимум 1 тег', required),
        minLength: minLength(1),
        $each: {
          required
        }
      },
      imagesPreview: { 
        required: helpers.withMessage('Выберите минимум 1 картинку', required),
        minLength: minLength(1),
        $each: {
          required
        }
      }
    })
    const changedFIle = ref({})
    const imageUploaded = ref([])
    const uploadedFiles = ref([])
    const videoBasket = ref([])
    const audioBasket = ref([])
    const datePicker = ref(null)
    const choosedAuthor = ref({})
    var v$ = ref({})
    const getSections = async () => {
      loading.value = true
      // const data = await store.dispatch(`cards/getCard`, route.value.params.id)
      // item.value = data
      optionsMultiselect.value = item.value.tags
      formData.value = {
        ...item.value
      }
      loading.value = false
    }
    const editorToolbar = ref(
      [["bold", "italic", "underline"], ['link'], [{ list: "ordered" }, { list: "bullet" }],
      [{ align: "left" }, { align: "center" }, { align: "right"}, { align: "justify"}],
      [{ color: "color-picker" }]],
    )
    const editorHTML = ref('')
    const imagesLoadForPreview = () => {
      let imagesArray = []
      if (item.value.files) {
        const onlyImage = item.value.files.filter(file => file.file_type_id === 1);
        onlyImage.forEach(image => {
          imagesArray.push({
            id: image.id,
            path: 'https://test.itisthenice.com/'+image.src,
            default: 1,
            highlight: 1,
            uploadedApi: true,
            caption: 'caption to display. receive', // Optional
          })
        })
        imagesPreview.value = imagesArray
      }  
    }
    const audioLoadForPreview = () => {
      
    }
    const changeImages = (event) => {

    }
    const getTags = async () => {
      loading.value = true
      const data = await store.dispatch('tags/getTags', {
        entity: 'tags',
        searchField: '',
        page: 1,
        count: 9999
      })
      tags.value = data.data
      loading.value = false
    }
    const formatedImage = async (file) => {
     imagesPreview.value.forEach( async (item) => {
      if (!item.uploadedApi) {
        const file = dataURLtoFile(item.path, item.name)
        const uploadedFile = await saveImage(file)
        basketFiles.push(uploadedFile.id)
        return basketFiles
      }
     })
    }
    const submit = async () => {
      v$.value.$touch()
      console.log(v$.value)
      if (v$.value.$invalid) {
        console.log(v$.value?.title?.$errors[0]?.$message)
        console.log('error')
        return
      }
      loading.value = true
      var basketFiles = []
      var basketFilesSEO = []
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
      async function processArraySEO(array) {
        for (const item of array) {
          if (item.uploadedApi) {
            basketFilesSEO.push(item.id)
          }
          if (!item.uploadedApi) {
            const file = dataURLtoFile(item.path, item.name)
            const uploadedFile = await saveImage(file)
            .then((res) => {
              basketFilesSEO.push(res.id)
            })
          }
        }
      }
      await processArray(imagesPreview.value)
      await processArraySEO(imagesPreviewSEO.value)
      audioBasket.value.forEach(item => {
        basketFiles.push(item.id)
      })
      videoBasket.value.forEach(item => {
        basketFiles.push(item.id)
      })
      var basketTags = []
      formData.value.tags.forEach(item => {
        basketTags.push(item.id)
      })
      if (!isProduct.value) {
        formData.price = 0
        formData.count = 0
      }
      const data = {
        mode: "add",
        data: {
          id: formData.value.id,
          title: formData.value.title,
          text: formData.value.text,
          fileIds: basketFiles,
          author_id: choosedAuthor.value.id,
          subtitle: formData.value.subtitle,
          item_type_id: 1,
          seo_title: formData.value.title,
          seo_description: formData.value.subtitle,
          seo_file_id: basketFilesSEO[0],
          price: +formData.value.price,
          count: +formData.value.count,
          date_event: null,
          section_id: formData.value.section_id,
          tags: basketTags,
          show_in_main: formData.value.show_in_main
        }
      }
      if (formData.value.date_event !== null) {
        console.log(formData.value.date_event)
        formData.value.date_event = Math.floor(new Date(formData.value.date_event).getTime())
        console.log(formData.value.date_event)
        data.data.date_event = formData.value.date_event
      }
      const response = await store.dispatch(`cards/saveCard`, data)
      console.log(response)
      const newId = response.id
      router.push({
        path: `/cards/${newId}`
      })
      loading.value = false
      // $toast.success('Информация сохранена', { position: 'bottom-center', icon: false, duration: 2000 })
    }
    const uploadImageSuccess = (formDataFrom, index, fileList) => {
      console.log('default')
      formData.value.imagesPreview = fileList
      imagesPreview.value = fileList 
    }

    const uploadImageSuccessSEO = (formData, index, fileList) => {
      imagesPreviewSEO.value = fileList 
    }

    const beforeRemove = (index, done, fileList) => {
      const item = fileList[index]
      imagesPreview.value.splice(index, 1);
      formData.value.imagesPreview.splice(index, 1);
    }

    const beforeRemoveSEO = (index, done, fileList) => {
      const item = fileList[index]
      imagesPreviewSEO.value.splice(index, 1);
      formData.value.imagesPreviewSEO.splice(index, 1);
    }
    
    const deleteImage = async (id) => {
      const res = await $axios.get(`delete-file/${id}`)
    }

    const changeImage = async (file, index) => {
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
      imagesPreview[index] = newFile
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
    const filterVideo = () => {
      videoBasket.value = item.value.files.filter(file => file.file_type_id === 2);
    }
    const filterAudio = () => {
      formData.value.audioBasket.value = item.value.files.filter(file => file.file_type_id === 3);
      audioBasket.value = item.value.files.filter(file => file.file_type_id === 3);
    }
    const deleteAudio = (index) => {
      formData.value.audioBasket.splice(index,1)
      audioBasket.value.splice(index,1)
    }
    const deleteVideo = (index) => {
      formData.value.videoBasket.splice(index,1)
      videoBasket.value.splice(index,1)
    }
    const changeAudio = (fileList) => {
      formData.value.audioBasket = fileList
      audioBasket.value = fileList
    }
    const changeVideo = (fileList) => {
      formData.value.videoBasket = fileList
      videoBasket.value = fileList
    }

    const showVideo = computed(() => {
      return item.value.section_id === 2
    })

    const showMusic = computed(() => {
      return item.value.section_id === 1 || item.value.section_id === 9
    })

    const showDate = computed(() => {
      return item.value.section_id === 9
    })

    const showingChooseSection = () => {
      showChooseSection.value = true
    }
    const closingChooseSection = () => {
      showChooseSection.value = false
    }
    const loadingFile = (state) => {
      console.log(state)
      loading.value = state 
    }
    const showAddCard = (choosedSection) => {
      showChooseSection.value = false
      item.value.section = {
        id: choosedSection.id,
        slug: choosedSection.slug
      }
      item.value.section_id = choosedSection.id
      getTags()
      getSections()
      initRules()
      v$.value = useVuelidate(rules, formData.value)
      console.log(v$.value)
      sectionChoosed.value = true
      const inputDate = datePicker
      console.log(inputDate.value)
      if ( inputDate ) {
        console.log(inputDate.value)
      }
      console.log(v$.value)
      console.log(rules)
    }
    const searchAuthor = async () => {
      const paramsAuthorSearch = {
        searchField: searchAuthorTerm.value,
        page: 1,
        count: 10,
        order_by_column: '',
        order_by_mode: '',
      }
      const res = await store.dispatch('author/getAuthors', paramsAuthorSearch)
      console.log(res.data)
      
      if (res.data) {
        showAuthorSearch.value = true
      } else {
        // showAuthorSearch.value = false
      }
      // if (searchAuthorTerm.value === '') {
      //   showAuthorSearch.value = false
      // }
      authorSearchItems.value = res.data
    }
    const initRules = () => {
      console.log(item.value.section_id)
      if (showMusic.value) {
        console.log('is music')
      } 
      if ( showVideo.value ) {
        rules.videoBasket = {
          required: helpers.withMessage('Выберите минимум 1 видео', required),
          minLength: minLength(1),
          $each: {
            required
          }
        }
        // delete rules.imagesPreview
      } 
      if (showDate.value) {
        console.log('is date')
        rules.date_event = {
          required: helpers.withMessage('Выберите дату', required)
        }
        console.log(rules)
      }
      
    }
    const todayDate = ref(new Date().toISOString().split("T")[0])
    const closeAuthorList = () => {
      console.log('close')
      showAuthorSearch.value = false
    }
    const chooseAuthor = (item) => {
      choosedAuthor.value = item
      searchAuthorTerm.value = item.name
      closeAuthorList()
    }
    const removeChoosedAuthor = (item) => {
      console.log('remoe')
      searchAuthorTerm.value = ''
      choosedAuthor.value = {}
      showAuthorSearch.value = false
    }
    const focusInput = () => {
      console.log('focus')
      searchAuthor()
    }
    const showVideoValidate = computed(() => {
      return v$.value?.videoBasket?.$errors[0]
    })
    const showImageValidate = computed(() => {
      return v$.value?.imagesPreview?.$errors[0]
    })
    onMounted(() => {
      // getSections()
      showingChooseSection()
    })
    return {
      loadingFile,
      formData,
      getSections,
      item,
      loading,
      submit,
      changeImages,
      uploadImageSuccess,
      beforeRemove,
      imagesLoadForPreview,
      editorHTML,
      editorToolbar,
      valueMultiSelect,
      optionsMultiselect,
      getTags,
      tags,
      showVideo,
      showMusic,
      imageUploaded,
      dataURLtoFile,
      imagesPreview,
      changedFIle,
      uploadedFiles,
      isProduct,
      changeAudio,
      changeVideo,
      sectionChoosed,
      audioBasket,
      videoBasket,
      deleteAudio,
      deleteVideo,
      showChooseSection,
      showingChooseSection,
      closingChooseSection,
      showAddCard,
      showDate,
      initRules,
      rules,
      v$,
      datePicker,
      todayDate,
      searchAuthor,
      searchAuthorTerm,
      authorSearchItems,
      closeAuthorList,
      showAuthorSearch,
      chooseAuthor,
      choosedAuthor,
      removeChoosedAuthor,
      imagesPreviewSEO,
      beforeRemoveSEO,
      uploadImageSuccessSEO,
      focusInput,
      showVideoValidate,
      showImageValidate
      // configEditor
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
  .btn_submit {
    margin-top: 5rem;
  }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>