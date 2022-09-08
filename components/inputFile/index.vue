<template>
  <div>
    <div class="mt-2">
      <div
        class="d-flex mt-1 img-wrap"
        v-for="(file, index) in fileList"
        :key="file.id"
      >
        <input
          v-if="onlyShow == false"
          type="hidden"
          :name="inputName != undefined ? inputName + '[' + index + '][src]' : 'files[' + index + '][src]'"
          :value="file.src"
        />
        <input
          v-if="onlyShow == false"
          type="hidden"
          :name="inputName != undefined ? inputName + '[' + index + '][title]' : 'files[' + index + '][title]'"
          :value="file.title"
        />
        <div class="mx-2">
          <a :href="file.src" target="_blank">{{ file.title }}</a>
        </div>
        <div v-if="onlyShow == false">
          <button
            type="button"
            class="btn-delete ml-5"
            @click="deleteFile(file,index)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></svg>
          </button>
        </div>
      </div>
    </div>
    <div
      class=""
      v-if="
        (onlyShow == false && !single) ||
        (onlyShow == false && single && files.length == 0)
      "
    >
      <label class="select-file-label btn btn-sm btn-info my-1">{{
        textShow
        
      }}
      <input
        type="file"
        class="select-file-input"
        id="addFile"
        :accept="accept"
        multiple
        @change="selectFile"
      />
      </label>
      
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filesInput: Array,
    onlyShow: Boolean,
    text: String,
    single: Boolean,
    inputName: String,
    accept: String
  },
  data() {
    return {
      files: [],
    };
  },
  computed: {
    textShow() {
      return this.text ?? "Добавить файл";
    },
    fileList() {
      return this.filesInput
    }
    
  },
  methods: {
    async deleteFile(file, index) {
      if (confirm("Удалить файл?")) {
        this.$emit('loading', true)
        await this.$axios.get(`https://test.itisthenice.com/api/v1/delete-file/${file.id}`)
        .then(() => {
            this.files.splice(index, 1);
            // this.$emit('deleteFiles', index)
            this.$emit('changeFiles', this.files)
            this.$emit('loading', false)
        })
        
      }
    },
    selectFile(event) {
      if (event.target.files.length == 0) {
        return;
      }
      for (var i = 0; i < event.target.files.length; i++) {
        var formData = new FormData();
        formData.append("file", event.target.files[i]);
        formData.append("dir", 'uploaded-files');
        this.sendFile(formData)
        
      }
      document.getElementById("addFile").value = "";
      
    },
    async sendFile(formData) {
        this.$emit('loading', true)
        const response = await this.$axios
        .post("https://test.itisthenice.com/api/v1/upload-file", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          this.files.push({ id: response.data.data.id, src: response.data.data.src, title: response.data.data.title, type: response.data.data.type });
          this.$emit('changeFiles', this.files)
          console.log('1')
          this.$emit('loading', false)
        })
        
    },
  },
  // mounted() {
  //   this.filesInput.forEach((file) => {
  //     console.log(file)
  //     this.files.push(file);
  //   });
  // },
  beforeMount() {
    if (this.filesInput != undefined && this.filesInput != null) {
      this.filesInput.forEach((file) => {
        this.files.push(file);
      });
    }
  },
};
</script>

<style scoped lang="scss">
img {
  max-height: 150px;
}
.select-file-label {
  border-radius: 4px;
  text-align: center;
  height: 30px;
  padding: 3px;
  margin: 0;
  width: 150px;
}
.select-file-input {
  opacity: 0;
  position: absolute;
  width: 150px;
  display: none;
}
.img-wrap {
    display: flex;
    a {
        color: #000;
    }
}
</style>