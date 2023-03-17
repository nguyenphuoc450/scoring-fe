<script setup>
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import uniquid from 'uniqid'
import { Modal } from 'ant-design-vue';

const route = useRoute()
const store = useStore()

const state = reactive({
  isVisibleCreate: false,
  isVisibleEdit: false,
  players: [],
})

// Create
const openModalCreate = () => {
  state.isVisibleCreate = true
}

const closeModalCreate = () => {
  state.isVisibleCreate = false
  state.players = state.players.map(player => {
    return {
      ...player,
      score: null
    }
  })
}

const createRound = () => {
  const newRound = state.players.map(player => {
    return {
      ...player,
      score: player.score || 0,
      id: uniquid(),
      player_id: player.id
    }
  })


  const newData = {
    ...match.value,
    rounds: [...match.value.rounds, newRound]
  }

  store.dispatch('updateMatchById', newData)
  closeModalCreate()
}

// Edit
const openModalEdit = () => {
  state.isVisibleEdit = true
}

const closeModalEdit = () => {
  state.isVisibleEdit = false
  state.players = state.players.map(player => {
    return {
      ...player,
      score: null
    }
  })
}

const editRound = (index) => {
  state.players = state.players.map(player => {
    const score = match.value.rounds[index].find(item => item.player_id === player.id).score || 0
    return {
      ...player,
      score
    }
  })
  openModalCreate()
  state.isEdit = true
}

const removeRound = (index) => {
  Modal.confirm({
    title: 'Xóa ván ' + index + 1,
    content: 'Bạn có muốn xóa không?',
    okText: 'Ok',
    cancelText: 'Không',
    onOk () {
      // Delete by index
      const newRounds = [...match.value.rounds]
      newRounds.splice(index, 1)

      const newData = {
        ...match.value,
        rounds: [...newRounds]
      }

      store.dispatch('updateMatchById', newData)
    },
    onCancel () { },
  });
}

const match = computed(() => {
  const id = route.params.id
  return store.getters.getMatchById(id)
})

onMounted(() => {
  state.players = JSON.parse(JSON.stringify(match.value.players))
})

</script>

<template>
  <div class="page">
    <a-button style="display: block; margin: 0 auto;" type="primary" size="large" @click="openModalCreate">
      Ghi điểm
    </a-button>

    <!-- Modal create -->
    <a-modal :visible="state.isVisibleCreate" title="Ghi điểm" okText="Tạo" cancelText="Hủy" @ok="createRound"
      @cancel="closeModalCreate">
      <div class="form-players">
        <div class="input-group" v-for="item in state.players" :key="item.id">
          <label for="">{{ item.name }}</label>
          <div class="input-group__control">
            <a-input-number v-model:value="item.score" placeholder="Nhập" />
          </div>
        </div>
      </div>
    </a-modal>

    <!-- Modal edit -->
    <a-modal :visible="state.isVisibleEdit" title="Sửa điểm" okText="Lưu" cancelText="Hủy" @ok="editRound"
      @cancel="closeModalCreate">
      <div class="form-players">
        <div class="input-group" v-for="item in state.players" :key="item.id">
          <label for="">{{ item.name }}</label>
          <div class="input-group__control">
            <a-input-number v-model:value="item.score" placeholder="Nhập" />
          </div>
        </div>
      </div>
    </a-modal>

    <!-- Table -->
    <table class="table">
      <thead>
        <tr>
          <th>
            #
          </th>
          <th v-for="player in state.players" :key="player.id">
            {{ player.name }}
          </th>
          <th>
            Hành động
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(round, index) in match.rounds" :key="round.id">
          <td>
            {{ index + 1 }}
          </td>
          <td v-for="child in round" :key="child.id">
            {{ child.score }}
          </td>
          <td>
            <div style="display: flex; grid-gap: 16px; justify-content: center;">
              <a-button type="primary" @click="editRound(index)">
                Sửa
              </a-button>
              <a-button type="danger" @click="removeRound(index)">
                Xóa
              </a-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>


<style lang="scss" scoped>
.ant-input-number {
  width: 100%;
}

.table {
  margin-top: 16px;
  width: 100%;

  th {
    padding: 6px;
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    color: #000000d9;
    border: 1px solid #f0f0f0;
    background-color: #fafafa;
  }

  td {
    padding: 6px;
    text-align: center;
    background: #ffffff;
    color: #000000d9;
    border: 1px solid #f0f0f0;
  }
}
</style>
