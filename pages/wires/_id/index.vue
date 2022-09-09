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
          <div :class="$style.head" class="head mb-20">
            <div :class="$style.leftpanel">
              <button @click.prevent="$router.push('/wires')" class="btn back">
                Назад
              </button>
              <div :class="$style.title">
              </div>
            </div>
            <div :class="$style.rightpanel">
              <!-- <button @click.prevent="delletePairs()" class="btn red">Удалить</button>  -->
              <!-- <button class="btn red">Отменить</button> -->
              <!-- <button class="btn green">В обработку</button> -->
            </div>
          </div>

          <div class="mb-15" :class="$style.content">
            <div >
              <div class="subtitle mb-15">
                Входное соединение
              </div>
              <div :class="$style.wires">
                <div :class="[$style.row, item.disable ? $style.disable : '']" v-for="(item, index) in dataTableLeft">
                  <label>
                    <input readonly @click="chooseWire(item)" v-model="item.choosed" type="checkbox" name="" id="">
                    <div class="">
                      <div class="">
                        {{ item.name }}
                      </div>
                    </div>
                    <div class="">
                      <div class="">
                        {{ item.size }}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            
            <div >
              <div class="subtitle mb-15">
                Выходное соединение
              </div>
              <div :class="$style.wires">
                <div :class="[$style.row, item.disable ? $style.disable : '']" v-for="(item, index) in dataTableRight">
                  <label>
                    <input @click="chooseSecondWire(item)" v-model="item.choosed" type="checkbox" name="" id="">
                    <div class="">
                      <div class="">
                        {{ item.name }}
                      </div>
                    </div>
                    <div class="">
                      <div class="">
                        {{ item.size }}
                      </div>
                    </div>
                  </label>
                </div>
              </div>    
            </div>
          </div>
          <!-- <div :class="$style.rules">
            <div @click="openWire(rule.id)" :class="$style.rule" v-for="(rule, index) in rules">
              <p> Входное соединение: {{ rule.name }} Выходное соединение: <span v-for="(item, index) in rule.pairs"> {{item.name}},</span></p>
            </div>
          </div> -->
          
        </div>
        <!-- <button @click.prevent="submit" class="btn">
          Сохранить
        </button> -->
      </form>
    </div>

  </div>
</template>

<script>
import { ref, reactive, onMounted, useContext, useRouter, computed, set } from '@nuxtjs/composition-api';
export default {
  name: 'section-edit',
  setup() {
    const { store, route, $toast } = useContext()
    const router = useRouter()
    const loading = ref(false)
    const formData = ref({

    })
    const paramsSearch = ref({
      searchField: '',
      id: +route.value.params.id,
      page: 1,
      count: 10,
    })
    const rules = ref([])
    const dataTableLeft = ref([])
    const dataTableRight = ref([])
    const getSections = async () => {
      loading.value = true
      const data = await store.dispatch('wires/getWires', paramsSearch.value)
      const rulesData = await store.dispatch('wires/getWiresRules', paramsSearch.value)
      dataTableLeft.value = [
        ...data.data
      ]
      rules.value = [
        ...rulesData.data
      ]
      dataTableLeft.value.forEach((item,index) => {
        set(dataTableLeft.value[index], 'choosed', false)
        set(dataTableLeft.value[index], 'disable', false)
      })
      dataTableRight.value = JSON.parse(JSON.stringify(dataTableLeft.value))
      initRules()
      loading.value = false
    }
    const initRules = () => {
      dataTableLeft.value.forEach(item => {
        if (item.id === +route.value.params.id){
          item.choosed = true
        } else {
          item.disable = true
        }
      })
      dataTableRight.value.forEach(item => {
        rules.value.forEach(itemRule => {
          if (item.id === itemRule.id) {
            item.choosed = true
          }
          
        })
      })
      

      // const resultArray = leastArr.filter((item) => {
      //   return biggestArr.some((item2) => item2.id === item.id)
      // });
      // dataTableLeft.value.forEach(item => {
      //   if (item.id === +route.value.params.id){
      //     console.log(item)
      //     item.choosed = true
      //   } else {
      //     item.disable = true
      //   }
      // })
    }
    const choosedStartWire = computed(() => {
      return dataTableLeft.value.find(wire => wire.choosed)
    })
    const choosedEndWire = computed(() => {
      return dataTableRight.value.find(wire => wire.choosed)
    })
    const chooseWire = (clicked) => {
      router.push({
        path: `/wires/${clicked.id}`
      })
      if (!clicked.choosed) {
        dataTableLeft.value.forEach((wire, index) => {
          if (clicked !== wire) {
            wire.disable = true
            wire.choosed = false
          }
          else {
            clicked.disable = false
          }
        })
        if (clicked.name === 'MIDI') {
          // turnOnOnluMidi()
        }
      }
      else {
        dataTableLeft.value.forEach((wire, index) => {
          wire.disable = false
        })
      }
    }
    const turnOnOnluMidi = () => {
      dataTableRight.value.forEach(item => {
        if (item.name != 'MIDI') {
          item.disable = true
        }
      })
    }
    const chooseSecondWire = (clicked) => {
      console.log(clicked)
      if (clicked.choosed) {
        deletePairs(clicked)
      }
      else {
        addPair(clicked)
      }
      // if (!clicked.choosed) {
      //   dataTableRight.value.forEach((wire, index) => {
      //     if (clicked !== wire) {
      //       // wire.disable = true
      //       // wire.choosed = false
      //     }
      //     else {
      //       clicked.disable = false
      //     }
      //   })
      // }
      // else {
      //   dataTableRight.value.forEach((wire, index) => {
      //     wire.disable = false
      //   })
      // }
    }
    const submit = async () => {
      await store.dispatch('')
    }
    const addPair = async (item) => {
      loading.value = true
      const params = {
        start: +route.value.params.id,
        end: item.id
      }
      await store.dispatch('wires/addPair', params)
      loading.value = false
    }
    const deletePairs = async (item) => {
      console.log(item)
      loading.value = true
      const params = {
        entity: 'pair',
        start: +route.value.params.id,
        end: item.id
      }
      const res = await store.dispatch('wires/deletePairs', params)
      console.log(res)
      loading.value = false
    }
    const openWire = (id) => {
      router.push({
        path: `wires/${id}`
      })
    }
    onMounted(() => {
      getSections()
    })
    return {
      getSections,
      loading,
      chooseWire,
      dataTableLeft,
      dataTableRight,
      chooseSecondWire,
      choosedStartWire,
      choosedEndWire,
      submit,
      turnOnOnluMidi,
      openWire,
      rules,
      paramsSearch,
      initRules,
      deletePairs,
      addPair
    }
  }
}
</script>

<style module lang="scss">
  .title {
    font-size: 2.4rem;
  }
  .seotitle {
    margin-bottom: 1rem;
  }
  .orderInfo {
    width: 30%;
    @media (max-width: 768px) {
      width: 30rem;
    }
  }
  .leftpanel {
    display: flex;
    margin-right: 2rem;
  }
  .rightpanel {
    display: flex;
    width: -webkit-fill-available;
    overflow: auto;
    justify-content: flex-end;
    white-space: nowrap;
    @media (max-width: 768px) {
      font-size: 1.4rem;
      justify-content: flex-start;
      button {
        
      }
    }
  }
  .head {
    display: flex;
    justify-content: space-between;
  }
  .wires {
    width: 30rem;
    .row {
      padding: 1rem;
      
      border-radius: 5px;
      margin-bottom: 0.3rem;
      background-color: #fff;
      &.disable {
        background-color: rgba(0,0,0,.2);
        
      }
      &:hover{
        cursor: pointer;
      }
      input:not(:checked) {
        ~ label {
          display: none;
        }
      }
      label {
        display: flex;
        justify-content: space-between;
        &:hover{
          cursor: pointer;
        }
        input {
          &:hover{
            cursor: pointer;
          }
        }
      }
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    .table {
      width: 48%;
    }
    @media (max-width: 768px) {
      flex-direction: column;
      .table {
        width: 100%
      }
    }
    
  }
  .rules {
    border-radius: 10px;
    overflow: hidden;
    .rule {
      display: flex;
      background-color: #fff;
      padding: 1rem;
      transition: .2s;
      border-bottom: 1px solid #ccc;
      &:hover {
        cursor: pointer;
        background-color: #ccc;
      }
    }
  }
</style>