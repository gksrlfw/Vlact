<template lang="">
  <header class="flex justify-between p-4 bg-blue-50 mb-2 rounded-lg shadow-lg px-10">
    <div class="">
      <img :src="gravatar.url(userData.email, { s: '24px', d: 'retro' })" :alt="userData.nickname" />
      <span>{{ userData.nickname }}</span>
    </div>
    <div class="">
      <img
        :src="gravatar.url(authState.loginResponse.email, { s: '24px', d: 'retro' })"
        :alt="authState.loginResponse.nickname"
      />
      <span>{{ authState.loginResponse.nickname }}</span>
    </div>
  </header>
</template>
<script>
import gravatar from 'gravatar';
export default {
  props: {
    userData: {
      type: Object,
    },
    authState: {
      type: Object,
    },
  },
  setup() {
    return {
      gravatar,
    };
  },
};
</script>
<style lang=""></style>
