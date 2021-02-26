<template lang="">
  <div class="px-1 py-2 mt-2 rounded-lg grid grid-cols-4 border-b-4">
    <button class="focus:outline-none">
      <img
        class="ml-0.5 rounded-xl"
        :src="gravatar.url(authState.nickname, { s: '28px', d: 'retro' })"
        @click="onClickUserProfile"
      />
    </button>
    <div class="col-span-3 mt-1 font-black text-2xl" v-if="authState.isLogin">
      {{ authState.loginResponse.nickname }}
    </div>
    <div class="col-span-3 mt-1" v-else>비로그인!!!!!</div>
  </div>
  <UserInfo :show-user-menu="showUserMenu" @onClickClose="onClickClose" @logout="logout" v-if="showUserMenu" />
</template>
<script>
import { onMounted, ref } from 'vue';
import gravatar from 'gravatar';
import authStore from '@/store/AuthStore';
import UserInfo from '@/components/Modal/UserInfo.vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    UserInfo,
  },
  setup() {
    const router = useRouter();
    const showUserMenu = ref(false);
    let authState = authStore.getAuthState();
    onMounted(() => {
      authState = authStore.getAuthState();
    });

    function onClickUserProfile() {
      showUserMenu.value = !showUserMenu.value;
      console.log(showUserMenu.value);
    }

    function onClickClose(currentValue) {
      showUserMenu.value = currentValue.value;
    }

    async function logout(currentValue) {
      try {
        await authStore.logout();
        showUserMenu.value = currentValue.value;
        return router.push({ name: 'Login' });
      } catch (err) {
        console.error(err);
      }
    }

    return {
      gravatar,
      authState,
      showUserMenu,
      onClickUserProfile,
      onClickClose,
      logout,
    };
  },
};
</script>
<style lang=""></style>
