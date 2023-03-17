<script setup>
import { LeftOutlined } from '@ant-design/icons-vue'
import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const state = reactive({
  isShowIconBack: false
})

const goBack = () => {
  router.go(-1)
}

watch(() => route.path, () => {
  if (route.name != 'home') {
    state.isShowIconBack = true
  } else {
    state.isShowIconBack = false
  }
})

</script>

<template>
  <header class="header">
    <div class="header__icon-back" @click="goBack" v-if="state.isShowIconBack">
      <left-outlined style="font-size: 24px; color: #ffffff;" />
    </div>
    <router-link class="header__logo" :to="{ name: 'home' }">
      <img src="@/assets/img/logo.png" alt="">
    </router-link>
  </header>
</template>


<style lang="scss" scoped>
.header {
  padding: 8px 16px;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  z-index: 100;
  background-color: #3E4042;
}

.header__icon-back {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  cursor: pointer;
}

.header__logo {
  img {
    width: 36px;
    height: 36px;
  }
}
</style>
