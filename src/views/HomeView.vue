<script setup>
import MatchList from '@/components/Match/MatchList.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import uniqid from 'uniqid'
import { DeleteOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useStore()

const isVisible = ref(false)
const players = ref([])

const openModal = () => {
  isVisible.value = true
}

const closeModal = () => {
  isVisible.value = false
  players.value = [
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
  players.value = [...players.value, newPlayer]
}


const removePlayer = (id) => {
  players.value = players.value.filter(player => player.id !== id)
}
const createMatch = () => {
  const newMatch = {
    id: uniqid(),
    players: players.value,
    rounds: [],
    created_at: Date.now()
  }
  store.dispatch('addNewMatch', newMatch)
  closeModal()
  router.push({ name: 'match', params: { id: newMatch.id } })
}

</script>

<template>
  <div class="page">
    <a-button style="display: block; margin: 0 auto;" type="primary" size="large" @click="openModal">
      Tạo trận đấu
    </a-button>

    <!-- Modal -->
    <a-modal :visible="isVisible" title="Tạo trận đấu" okText="Tạo" cancelText="Hủy" @ok="createMatch"
      @cancel="closeModal">
      <div class="form-players">
        <div class="input-group" v-for="(item, index) in players" :key="item.id">
          <label for="">Người chơi {{ index + 1 }}</label>
          <div class="input-group__control">
            <a-input v-model:value="item.name" placeholder="Nhập" />
            <a-button style="height: 48px" type="danger" @click="removePlayer(item.id)">
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