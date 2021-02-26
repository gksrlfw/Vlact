<template lang="">
  <div>
    <button @click="logout">ChannelView</button>
    <!-- <div>hello</div> -->
  </div>
</template>
<script>
import authStore from '@/store/AuthStore';
import { useRouter } from 'vue-router';
export default {
  setup() {
    // const authStore = new AuthStore();
    const router = useRouter();
    async function logout() {
      await authStore.logout();
      return router.push({ name: 'Login' });
    }
    return {
      logout,
    };
  },
};
</script>
<style lang=""></style>
