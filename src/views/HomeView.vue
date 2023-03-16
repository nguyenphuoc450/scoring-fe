<script setup>
import MatchList from '@/components/Match/MatchList.vue';
import { reactive } from 'vue';
import { useStore } from 'vuex';
import uniqid from 'uniqid'
import { DeleteOutlined } from '@ant-design/icons-vue';

const store = useStore()

const state = reactive({
  isVisible: false,
  players: [
    {
      id: uniqid(),
      name: ''
    }
  ]
})

const openModal = () => {
  state.isVisible = true
}

const closeModal = () => {
  state.isVisible = false
  state.players = [
    {
      id: uniqid(),
      name: ''
    }
  ]
}

const addNewPlayer = () => {
  const newPlayer = {
    id: uniqid(),
    name: ''
  }
  state.players = [...state.players, newPlayer]
}


const removePlayer = (id) => {
  state.players = state.players.filter(player => player.id !== id)
}
const createMatch = () => {
  const newMatch = {
    id: uniqid(),
    players: state.players,
    created_at: Date.now()
  }
  store.dispatch('addNewMatch', newMatch)
  closeModal()
}

</script>

<template>
  <div class="page">
    <a-button style="display: block; margin: 0 auto;" type="primary" size="large" @click="openModal">
      Tạo trận đấu
    </a-button>

    <a-modal :visible="state.isVisible" title="Tạo trận đấu" @ok="createMatch" @cancel="closeModal">
      <div class="form-players">
        <div class="input-group" v-for="(item, index) in state.players" :key="item.id">
          <label for="">Player {{ index + 1 }}</label>
          <div class="input-group__control">
            <a-input v-model:value="item.name" placeholder="Enter" />
            <a-button style="height: 48px" type="danger" @click="removePlayer(item.id)">
              <!-- <delete-outlined /> -->
              Xóa
            </a-button>
          </div>
        </div>

        <a-button @click="addNewPlayer">
          Thêm người chơi
        </a-button>
      </div>
    </a-modal>

    <MatchList />
  </div>
</template>


<style lang="scss" scoped>
.input-group__control {
  display: flex;
  align-items: center;
  grid-gap: 16px;

  input {
    flex: 1;
  }
}
</style>