<template lang="">
  <div class="h-32">
    <div class="flex ml-80 items-center text-bolder text-3xl">
      <h3 v-if="route.params.workspace">{{ route.params.workspace }}</h3>
      <h3 v-if="route.params.channel">>> {{ route.params.channel }}</h3>
      <h3 v-if="route.params.email">>> {{ route.params.email }}</h3>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    return {
      route,
    };
  },
};
</script>
<style lang=""></style>
