<template>
  <div class="wrap wrap-loading">
    <UILoading
    v-if="loading"
    />
    <div v-show="!loading" class="">
      <div :class="$style.header" class="mb-20">
        <div :class="$style.title">
          Эфир
        </div>
        <div :class="$style.panel">
          <div class="mr-10">
            Статус: {{ statusLive }}
            <!-- Статус: Включен -->
          </div>
          <button @click.prevent="changeStatus" class="btn">
            {{ statusLive === 'Включен' ? 'Выключить' : 'Включить' }}
          </button>
        </div>
      </div>
      <div :class="$style.content" class="content">
        <div class="mb-15">
          <div class="mb-15">
            {{ mode === 'add' ? 'Добавить' : 'Редактировать' }}
          </div>
          <div :class="$style.panelContent">
            <div class="input">
              <label for="">
                <span class="label">
                  Название
                </span>
                <input v-model="title" type="text">
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
            <inputFile dir="broadcast" @loading="loadingFile" @changeFiles="changeAudio" accept="audio/*" @deleteFiles="deleteAudio" :filesInput="audioBasket" :single="false" text="Добавить аудио" class="mb-15"></inputFile>
            <svg v-if="mode === 'edit'" @click="rejectEdit" :class="$style.panelClose" xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></svg>
          </div>
          <button @click.prevent="submit" class="btn">
            {{ mode === 'add' ? 'Добавить' : 'Редактировать' }}
          </button>
        </div>
        <div :class="$style.list">
          <div :class="$style.track" class="mb-15" :key="index" v-for="(item, index) in sections">
            <div :class="$style.wraper">
              <span class="mr-15">
                ID:{{ item.id }}
              </span>    
              <img class="mr-15" :src="`https://test.itisthenice.com/${item.wrap.src}`" alt="">
            </div>
            <div :class="$style.audio">
              <p class="mb-10">{{ item.title }}</p>
              <audio controls :src="`https://test.itisthenice.com/${item.audio.src}`"></audio>
            </div>
            <svg @click="deleteTrack(item, index)" :class="$style.delete" xmlns="http://www.w3.org/2000/svg" fill="#D91414" viewBox="0 0 30 30" width="30px" height="30px">    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/></svg>
            <svg @click="editTrack(item)" :class="$style.edit" fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"/></svg>
          </div>
          <paginate
          v-if="sections.length > 10"
          :page-count="pageCount"
          :click-handler="changePage"
          :prev-text="'Пред'"
          :next-text="'След'"
          :container-class="'pagination'"
          ></paginate>
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
      const data = await store.dispatch('live/getMusic', paramsSearch.value)
      sections.value = data
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
        basketFiles = [474]
      }
      if (mode.value === 'edit' && imagesPreview.value[0].uploadedApi) {
        basketFiles = [imagesPreview.value[0].id]
      } else {
        await processArray(imagesPreview.value)
      }
      console.log(basketFiles)
      const data = {
        mode: mode.value,
        wrap_id: basketFiles[0],
        audio_id: audioBasket.value[0].id,
        title: title.value,
      }
      if (mode.value === 'edit') {
        data.id = currentEdit.value
      }
      console.log(data)
      await store.dispatch(`live/loadTrack`, data)
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
    onMounted(() => {
      getSections()
      getStatus()
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
      getStatus
    }
  }
}
</script>

<style lang="scss" module>
  .header {
    display: flex;
    justify-content: space-between;
  }
  .title {
    font-size: 2.4rem;
    margin-bottom: 1rem;
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