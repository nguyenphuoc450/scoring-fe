<script setup>
import { LeftOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

</script>

<template>
  <header class="header">
    <div class="header__icon-back" @click="goBack" v-if="$route.name != 'home'">
      <left-outlined style="font-size: 24px;" />
    </div>
    <div class="header__logo">
      Ghi điểm
    </div>
  </header>
</template>


<style lang="scss" scoped>
.header {
  padding: 8px 0;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  z-index: 100;
  background-color: rgba($color: #000000, $alpha: 0.1);
}

.header__icon-back {
  position: absolute;
  top: 50%;
  left: 24px;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.header__logo {
  font-size: 24px;
  line-height: 36px;
  color: #343434;
}
</style>
