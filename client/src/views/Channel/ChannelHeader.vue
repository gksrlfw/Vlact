<template lang="">
  <header class="flex justify-between p-4 bg-blue-50 mb-2 rounded-lg shadow-lg px-10">
    <div class="font-bold text-xl">
      {{ route.params.channel }}
    </div>
  </header>
</template>
<script>
import { useRoute } from 'vue-router';
import { globalMembers } from '@/store/GlobalVariable';
export default {
  setup() {
    const route = useRoute();
    return {
      route,
      globalMembers,
    };
  },
};
</script>
<style lang=""></style>
