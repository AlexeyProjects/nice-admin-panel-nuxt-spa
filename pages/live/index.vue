<template>
  <div class="">
    <div :class="$style.header">
      <div :class="$style.title">
        Эфир
      </div>
      <div :class="$style.panel">

      </div>
    </div>
    <div :class="$style.content" class="content">
      <div class="mb-15">
        <div class="mb-15">Добавить</div>
        <div class="">
          <div class="input image">
            <span>Фотографии</span>
            <vue-upload-multiple-image
            :maxImage="1"
            class="mb-15"
            :showEdit="false"
            markIsPrimaryText=""
            dropText="Перетащите картинку сюда"
            dragText="Перетащите картинку сюда"
            browseText="Выбрать картинку"
            :showPrimary="false"
            @upload-success="uploadImageSuccess"
            @before-remove="beforeRemove"
            :data-images="imagesPreview"
            ></vue-upload-multiple-image>
          </div>
          <inputFile @changeFiles="changeAudio" accept="audio/*" @deleteFiles="deleteAudio" :filesInput="audioBasket" :single="false" text="Добавить аудио" class="mb-15"></inputFile>
        </div>
        <button @click.prevent="submit" class="btn">
          Добавить
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
            <p class="mb-10">{{ item.audio.title }}</p>
            <audio controls :src="`https://test.itisthenice.com/${item.audio.src}`"></audio>
          </div>
        </div>
        <paginate
        :page-count="pageCount"
        :click-handler="changePage"
        :prev-text="'Пред'"
        :next-text="'След'"
        :container-class="'pagination'"
        ></paginate>
      </div>
      
    </div>
  </div>
</template>

<script>
import { ref, useContext, onMounted, useRouter, computed } from '@nuxtjs/composition-api';
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
      console.log(tableOptions)
      loading.value = false
    }
    const pageCount = computed(() => {
      // return Math.ceil(props.tableOptions.totalRows/props.tableOptions.perPage)
      return 2
    })
    const changePage = (page) => {
      console.log(page)
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
        console.log('Done!');
      }
      await processArray(imagesPreview.value)
      audioBasket.value.forEach(item => {
        basketFiles.push(item.id)
      })
      var formData = new FormData();
      formData.append('wrap',imagesPreview.value[0])
      formData.append('file',audioBasket.value[0])
      formData.append('dir','broadcast')
      await store.dispatch(`live/loadTrack`, formData)
      loading.value = false
    }
    onMounted(() => {
      getSections()
    })

    return {
      columns,
      getSections,
      sections,
      tableOptions,
      imagesPreview,
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
      changePage
    }
  }
}
</script>

<style lang="scss" module>
  .title {
    font-size: 2.4rem;
    margin-bottom: 1rem;
  }
  .wrap {
    position: relative;
    flex-grow: 1;
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
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 1rem;
    border-radius: 10px;
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