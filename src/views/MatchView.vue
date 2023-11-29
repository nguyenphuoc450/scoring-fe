<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import uniquid from 'uniqid'
import { Modal } from 'ant-design-vue';

const route = useRoute()
const store = useStore()

const isVisibleCreate = ref(false)
const isVisibleEdit = ref(false)
const players = ref([])
const currentRoundId = ref(null)
const totalList = ref([])

const match = computed(() => {
  const id = route.params.id
  return store.getters.getMatchById(id)
})

const resetScorePlayers = () => {
  players.value = players.value.map(player => {
    return {
      ...player,
      score: null
    }
  })
}

// Create
const openModalCreate = () => {
  isVisibleCreate.value = true
}

const closeModalCreate = () => {
  isVisibleCreate.value = false
  resetScorePlayers()
}

const createRound = () => {
  const newRound = {
    id: uniquid(),
    info: players.value.map(player => {
      return {
        ...player,
        score: player.score || 0,
        player_id: player.id
      }
    })
  }

  const newData = {
    ...match.value,
    rounds: [...match.value.rounds, newRound]
  }

  store.dispatch('updateMatchById', newData)
  closeModalCreate()
}

// Edit
const openModalEdit = (id) => {
  isVisibleEdit.value = true
  players.value = players.value.map(player => {
    const round = match.value.rounds.find(item => item.id === id)
    const score = round.info.find(item => item.player_id === player.id).score || 0

    return {
      ...player,
      score
    }
  })
  currentRoundId.value = id
}

const closeModalEdit = () => {
  isVisibleEdit.value = false
  resetScorePlayers()
  currentRoundId.value = null
}

const editRoundById = () => {
  const cloneData = [...match.value.rounds]
  const indexRound = cloneData.findIndex(item => item.id === currentRoundId.value)

  if (indexRound !== -1) {

    const newInfo = cloneData[indexRound].info.map(item => {
      const score = players.value.find(player => player.id === item.player_id).score || 0
      return {
        ...item,
        score
      }
    })

    const dataRound = {
      ...cloneData[indexRound],
      info: [...newInfo]
    }
    cloneData.splice(indexRound, 1, dataRound)

    const newData = {
      ...match.value,
      rounds: [...cloneData]
    }

    store.dispatch('updateMatchById', newData)
    closeModalEdit()
  }
}

// Remove
const removeRoundById = (id, index) => {
  Modal.confirm({
    title: 'Xóa ván ' + (index + 1),
    content: 'Bạn có muốn xóa không?',
    okText: 'Ok',
    cancelText: 'Không',
    onOk () {
      // Delete by id
      const cloneData = match.value.rounds.filter(item => item.id !== id)

      const newData = {
        ...match.value,
        rounds: [...cloneData]
      }

      store.dispatch('updateMatchById', newData)
    },
    onCancel () { },
  });
}

watch(() => match.value, (currentValue) => {
  if (currentValue) {
    const cloneDataMatch = JSON.parse(JSON.stringify(match.value))
    // Set players in match
    players.value = [...cloneDataMatch.players] || []

    const dataRounds = [...cloneDataMatch.rounds] || []

    const newDataPlayers = players.value.map(player => {
      const dataListOfPlayer = []
      // Find Player by id
      dataRounds.forEach(itemOfClone => {
        const infoByPlayer = itemOfClone.info.find(itemOfInfo => itemOfInfo.player_id === player.id)
        dataListOfPlayer.push(infoByPlayer)
      })

      const totalScore = dataListOfPlayer.reduce((prev, current) => {
        return prev += current.score
      }, 0)

      return {
        ...player,
        totalScore
      }
    })

    players.value = newDataPlayers
  }

}, { immediate: true, deep: true })

</script>

<template>
  <div class="page">
    <a-button style="display: block; margin: 0 auto;" type="primary" size="large" @click="openModalCreate">
      Ghi điểm
    </a-button>

    <!-- Modal create -->
    <a-modal :visible="isVisibleCreate" title="Ghi điểm" okText="Tạo" cancelText="Hủy" @ok="createRound"
      @cancel="closeModalCreate">
      <div class="form-players">
        <div class="input-group" v-for="item in players" :key="item.id">
          <label for="">{{ item.name }}</label>
          <div class="input-group__control">
            <a-input-number v-model:value="item.score" placeholder="Nhập" />
          </div>
        </div>
      </div>
    </a-modal>

    <!-- Modal edit -->
    <a-modal :visible="isVisibleEdit" title="Sửa điểm" okText="Lưu" cancelText="Hủy" @ok="editRoundById"
      @cancel="closeModalEdit">
      <div class="form-players">
        <div class="input-group" v-for="item in players" :key="item.id">
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
          <th v-for="player in players" :key="player.id">
            <div style="display: flex; flex-direction: column; grid-gap: 4px;">
              <span>{{ player.name }}</span>
              <span
                :style="{ color: player.totalScore < 0 ? '#ff4d4f' : player.totalScore > 0 ? '#52c41a' : '#000000d9' }">
                ({{ (player.totalScore) }})
              </span>
            </div>
          </th>
          <th>
            Nút
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(round, index) in match.rounds" :key="round.id">
          <td>
            {{ index + 1 }}
          </td>

          <td v-for="itemInfo in round.info" :key="itemInfo.id">
            {{ itemInfo.score }}
          </td>

          <td>
            <div style="display: flex; grid-gap: 16px; justify-content: center;">
              <a-button type="primary" @click="openModalEdit(round.id)">
                Sửa
              </a-button>
              <a-button type="danger" @click="removeRoundById(round.id, index)">
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
.page {
  overflow: auto;
}

.ant-input-number {
  width: 100%;
}

.table {
  margin-top: 16px;
  min-width: 100%;

  th {
    min-width: 120px;
    padding: 6px 12px;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #000000d9;
    border: 1px solid #f0f0f0;
    background-color: #fafafa;
    word-break: break-word;

    &:first-child {
      min-width: unset;
    }
  }

  td {
    padding: 6px 12px;
    background: #ffffff;
    color: #000000d9;
    text-align: center;
    border: 1px solid #f0f0f0;
  }
}
</style>
