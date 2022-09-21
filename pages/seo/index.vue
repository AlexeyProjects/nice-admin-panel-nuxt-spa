<template>
  <div class="wrap wrap-loading">
    <UILoading
    v-if="loading"
    />
    <div v-show="!loading" class="">
      <div :class="$style.header" class="mb-20">
        <div :class="$style.title">
          SEO
        </div>
        <div :class="$style.panel">
          <div class="mr-10">
            <!-- Статус: Включен -->
          </div>
        </div>
      </div>
      <div :class="$style.content" class="content">
        <div class="mb-15">
          <!-- <div class="mb-15">
            {{ mode === 'add' ? 'Добавить' : 'Редактировать' }}
          </div> -->
          <div :class="$style.panelContent">
            <div class="input">
              <label for="">
                <span class="label">
                  SEO заголовок
                </span>
                <input v-model="title" type="text">
              </label>
              <!-- <div v-if="showTitleValidate" class="errors">
                {{ v$.title.$errors[0].$message }}
              </div> -->
            </div>
            <div class="input">
              <label for="">
                <span class="label">
                  SEO описание
                </span>
                <input v-model="description" type="text">
              </label>
              <!-- <div v-if="showTitleValidate" class="errors">
                {{ v$.title.$errors[0].$message }}
              </div> -->
            </div>
            <div class="input image">
              <span>Фотографии</span>
              <vue-upload-multiple-image
              :maxImage="1"
              class="mb-15"
              :showEdit="false"
              markIsPrimaryText=""
              dir="broadcast"
              dropText="Перетащите картинку сюда"
              dragText="Перетащите картинку сюда"
              browseText="Выбрать картинку"
              :showPrimary="false"
              @upload-success="uploadImageSuccess"
              @before-remove="beforeRemove"
              :data-images="imagesPreview"
              ></vue-upload-multiple-image>
            </div>
          </div>
          <button @click.prevent="submit" class="btn">
            Сохранить
          </button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { ref, reactive, useContext, onMounted, useRouter, computed } from '@nuxtjs/composition-api';
import VueUploadMultipleImage from 'vue-upload-multiple-image';
import Paginate from 'vuejs-paginate'

export default {
  name: "live",
  components: {
    VueUploadMultipleImage,
    Paginate
  },
  setup(props, ctx) {
    const { store, $axios, $toast } = useContext()
    const router = useRouter()
    const audioBasket = ref([])
    const imagesPreview = ref([])
    const paramsSearch = ref({
      page: 1,
      count: 9999
    })
    const statusLive = ref('')
    const currentEdit = ref(null)
    const mode = ref('add')
    const formData = reactive({})
    const title = ref('')
    const description = ref('')
    const columns = ref([
      {
        label: 'Название',
        field: 'name',
        type: 'text'
      },
      {
        label: 'Кол-во карт',
        field: 'cards_count',
        type: 'text'
      }
    ])
    const tableOptions = ref({
      columns: columns.value,
      dataTable: []
    })

    const loading = ref(false)
    const sections = ref([])
    const item = ref({})

    const editRow = (params) => {
      router.push({
        path: `/users/${params.row.id}`,
        query: { title: params.row.title }
      })
    }
    const uploadImageSuccess = (formData, index, fileList) => {
      imagesPreview.value = fileList 
    }
    const beforeRemove = (index, done, fileList) => {
      const item = fileList[index]
      imagesPreview.value.splice(index, 1);
    }
    const changeAudio = (fileList) => {
      audioBasket.value = fileList
    }
    const deleteAudio = (index) => {
      audioBasket.value.splice(index,1)
    }
    const getSections = async () => {
      loading.value = true
      const data = await store.dispatch('seo/getMainSeo')
      console.log(data[0])
      item.value = data[0]
      imagesLoadForPreview()
      title.value = data[0].seo_title
      description.value = data[0].seo_description
      tableOptions.value.dataTable = sections.value.data
      loading.value = false
    }
    const pageCount = computed(() => {
      // return Math.ceil(props.tableOptions.totalRows/props.tableOptions.perPage)
      return 2
    })
    const changePage = (page) => {
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
    const saveImage = async (file) => {
      var formData = new FormData();
      formData.append("file", file);
      formData.append("dir", 'broadcast');
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
    const submit = async () => {
      loading.value = true
      var basketFiles = []
      async function processArray(array) {
        for (const item of array) {
          const file = dataURLtoFile(item.path, item.name)
          const uploadedFile = await saveImage(file)
          .then((res) => {
            basketFiles.push(res.id)
          })
        }
      }
      if (imagesPreview.value.length === 0 ) {
        basketFiles = [3]
      }
      if (mode.value === 'edit' && imagesPreview.value[0].uploadedApi) {
        basketFiles = [imagesPreview.value[0].id]
      } else {
        await processArray(imagesPreview.value)
      }
      console.log(basketFiles)
      const data = {
        seo_title: title.value,
        seo_description: description.value,
        seo_file_id: basketFiles[0]
      }
      await store.dispatch(`seo/changeSeo`, data)
      getSections()
      loading.value = false
    }
    const loadingFile = (state) => {
      console.log(state)
      loading.value = state
    }
    const deleteTrack = async (item, index) => {
      loading.value = true
      await store.dispatch(`live/deleteTrack`, item)
      console.log(index)
      sections.value.splice(index, 1)
      loading.value = false
    }
    const editTrack = (item) => {
      console.log(item)
      mode.value = 'edit'
      const image = {
        caption:"caption to display. receive",
        default:1,
        highlight:1,
        id: item.wrap.id,
        path:'https://test.itisthenice.com/' + item.wrap.src,
        uploadedApi:true
      }
      title.value = item.title
      imagesPreview.value =[image]
      audioBasket.value = [item.audio]
      currentEdit.value = item.id
    }
    const rejectEdit = () => {
      mode.value = 'add'
      title.value = ''
      imagesPreview.value =[]
      audioBasket.value = []
      currentEdit.value = null
    }
    const changeStatus = async () => {
      loading.value = true
      const params = {
          signal: ""
        }
      if ( statusLive.value === 'Включен' ) {
        params.signal = 'stop'
      } else {
        params.signal = 'start'
      }
      await store.dispatch('live/changeStatus', params)
      await getStatus()
      loading.value = false
    }
    const getStatus = async () => {
      loading.value = true
      const params = {
        signal: "status"
      }
      loading.value = false
      const status = await store.dispatch('live/getStatus', params)
      console.log(status)
      if (status) {
        statusLive.value = 'Включен'
      } else {
        statusLive.value = 'Выключен'
      }
      
    }
    const imagesLoadForPreview = () => {
      let imagesArray = []
      if (item.value.seo_file_id) {
        console.log('seo')
        imagesArray.push({
          id: item.value.seo_file_id,
          path: 'https://test.itisthenice.com/'+item.value.seo_file.src,
          default: 1,
          highlight: 1,
          uploadedApi: true,
          caption: 'caption to display. receive', // Optional
        })
        imagesPreview.value = imagesArray
      }  
    }
    onMounted(() => {
      getSections()
    })

    return {
      loadingFile,
      columns,
      getSections,
      sections,
      mode,
      tableOptions,
      imagesPreview,
      formData,
      loading,
      editRow,
      paramsSearch,
      changeAudio,
      deleteAudio,
      dataURLtoFile,
      beforeRemove,
      submit,
      uploadImageSuccess,
      audioBasket,
      pageCount,
      changePage,
      title,
      deleteTrack,
      editTrack,
      rejectEdit,
      currentEdit,
      statusLive,
      changeStatus,
      getStatus,
      description,
      item,
      imagesLoadForPreview
    }
  }
}
</script>

<style lang="scss" module>
  .header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media (max-width: 768px) {
      align-items: center;
    }
  }
  .title {
    font-size: 2.4rem;
    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }
  .wrap {
    position: relative;
    flex-grow: 1;
  }
  .panel {
    display: flex;
    align-items: center;
  }
  .content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  .panelContent {
    position: relative;
    width: 35rem;
    max-width: 100%;
    @media (max-width: 768px) {
      width: 20rem;
    }
    .panelClose {
      position: absolute;
      right: 0;
      top: 0;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .wraper {
    display: flex;
    align-items: center;
  }
  .track {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 1rem;
    border-radius: 10px;
    .delete, .edit {
      position: absolute;
      width: 2rem;
      &:hover {
        cursor: pointer;
      }
    }
    .delete {
      right: 1rem;
      top: 0rem;
    }
    .edit {
      right: 4rem;
      top: 0rem;
    }
    @media (max-width: 768px) {
      width: 100%;
      flex-direction: column;
      margin-top: 2rem;
      .wraper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
        span {
          margin-bottom: 1rem;
        }
      }
      > div {
        width: 100%;
        text-align: center;
      }
      audio {
        width: 100%;
      }
    }
    span {
      width: 3rem;
      text-align: center;
    }
    p {
      text-align: center;
    }
    img {
      width: 10rem;
      border-radius: .5rem;
    }
  }

</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>