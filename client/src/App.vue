<template>
  <section v-if="route.name === 'Main' || route.name === 'Login' || route.name === 'Register'">
    <router-view />
  </section>
  <section v-else class="h-full">
    <div>
      <Layout />
    </div>
    <div class="ml-80 h-5/6">
      <router-view />
    </div>
  </section>
</template>
<script>
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { TOKEN } from './store/GlobalVariable';
import Layout from '@/components/Layout/LayoutNav.vue';
import authStore from '@/store/AuthStore';

export default defineComponent({
  components: {
    Layout,
  },
  setup() {
    const route = useRoute();
    onMounted(() => {
      const loginResponse = JSON.parse(sessionStorage.getItem(TOKEN));
      if (!loginResponse) return;
      authStore.setAuthState(loginResponse);
    });

    return {
      route,
    };
  },
});
</script>
<style lang="scss">
html,
body,
#app {
  height: 100%;
  // overflow: hidden;
}
</style>
