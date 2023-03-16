<script setup>
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute()
const store = useStore()

const state = reactive({
  isVisible: false,
  players: []
})

const openModal = () => {
  state.isVisible = true
}

const closeModal = () => {
  state.isVisible = false
}

const createRound = () => {

}

const match = computed(() => {
  const id = route.params.id
  return store.getters.getMatchById(id)
})

onMounted(() => {
  state.players = Object.assign({}, match.value.players)
})

</script>

<template>
  <div class="page">
    <a-button style="display: block; margin: 0 auto;" type="primary" size="large" @click="openModal">
      Ghi điểm
    </a-button>
    <a-modal :visible="state.isVisible" title="Ghi điểm" @ok="createRound" @cancel="closeModal">
      <div class="form-players">
        <div class="input-group" v-for="(item, index) in state.players" :key="item.id">
          <label for="">{{ item.name }}</label>
          <div class="input-group__control">
            <a-input-number v-model:value="item.score" placeholder="Enter" />
          </div>
        </div>

      </div>
    </a-modal>
    {{ $route.params.id }} id
    {{ match }}
  </div>
</template>


<style lang="scss" scoped>
.ant-input-number {
  width: 100%;
}
</style>
