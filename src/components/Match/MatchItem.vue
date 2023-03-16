<script setup>
import moment from 'moment'
import { DeleteOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { Modal } from 'ant-design-vue';

const props = defineProps({
  data: {
    required: true,
    type: Object,
    default: () => ({})
  }
})

const store = useStore()

const removeMatch = () => {
  Modal.confirm({
    title: 'Xóa trận ' + props.data.id,
    content: 'Bạn có muốn xóa không?',
    okText: 'Ok',
    cancelText: 'Không',
    onOk () {
      store.dispatch('removeMatchById', props.data.id)
    },
    onCancel () { },
  });
}

</script>

<template>
  <a-card class="match-item">
    <h3 class="name">Id: {{ data.id }}</h3>
    <p class="created">Ngày tạo: {{ moment(data.created_at).format('DD/MM/YYYY HH:mm:ss') }}</p>
    <div class="actions">
      <a-button type="primary">
        <router-link :to="{ name: 'match', params: { id: data.id } }">
          Vào
        </router-link>
      </a-button>
      <a-button type="danger" @click="removeMatch">
        Xóa
      </a-button>
    </div>
  </a-card>
</template>

<style lang="scss" scoped>
.match-item {
  flex: 1;
}

.name {}

.created {
  font-style: italic;
}

.actions {
  display: flex;
  grid-gap: 16px;

  button {
    flex: 1;
    padding: 6px 12px;
    height: auto;
  }
}
</style>
