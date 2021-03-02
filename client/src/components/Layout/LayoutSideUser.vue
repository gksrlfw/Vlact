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
  <UserInfo
    :show-user-menu="showUserMenu"
    @onClickModalCloseIn="onClickModalCloseIn"
    @logout="logout"
    v-if="showUserMenu"
  />
</template>
<script>
import { ref } from 'vue';
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
    const authState = authStore.getAuthState();

    function onClickUserProfile() {
      showUserMenu.value = !showUserMenu.value;
    }

    function onClickModalCloseIn(currentValue) {
      showUserMenu.value = currentValue;
    }

    async function logout(currentValue) {
      try {
        await authStore.logout();
        showUserMenu.value = currentValue;
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
      onClickModalCloseIn,
      logout,
    };
  },
};
</script>
<style lang=""></style>
