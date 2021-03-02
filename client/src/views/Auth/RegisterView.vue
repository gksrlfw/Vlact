<template>
  <IconArrowdown class="h-8 w-8" />
  <!-- min-h-screen: 100vh => 스크린 전체 -->
  <div class="bg-gray-200 min-h-screen flex flex-col">
    <div class="container max-w-sm mx-auto flex-1 flex flex-col justify-center">
      <!-- 부모에서 padding을 줘서 내부 input이 w-full이 되어도 끝까지 오지 않도록 한다! -->
      <div class="bg-white px-6 py-8 rounded shadow-md text-black">
        <h1 class="mb-8 text-3xl text-center font-bold">SIGN UP</h1>
        <input
          type="email"
          class="border border-gray-300 w-full p-3 rounded mb-4"
          name="email"
          placeholder="EMAIL"
          v-model="email"
        />
        <input
          type="text"
          class="border border-gray-300 w-full p-3 rounded mb-4"
          name="NICKNAME"
          placeholder="nickname"
          v-model="nickname"
        />
        <input
          type="password"
          class="border border-gray-300 w-full p-3 rounded mb-4"
          name="password"
          placeholder="PASSWORD"
          v-model="password"
        />
        <input
          type="password"
          class="border border-gray-300 w-full p-3 rounded mb-4"
          name="confirm_password"
          placeholder="CONFIRM PASSWORD"
          v-model="confirmPassword"
        />
        <div class="mb-2 text-red-500 font-bold" v-if="isEmptyValue">FILL IN ALL VALUE!</div>
        <div class="mb-2 text-red-500 font-bold" v-if="isMatchedPassword">CHECK YOUR PASSWORD!</div>
        <div class="mb-2 text-red-500 font-bold" v-if="authState.registerError">{{ authState.registerError }}</div>
        <!-- outline 없애기 (어디서 들어오는거지??)-->
        <button
          class="w-full py-3 rounded bg-gray-500 text-white hover:bg-gray-800 focus:outline-none my-1"
          @click="register"
        >
          CREATE ACCOUNT
        </button>
        <div class="text-center text-sm text-gray-800 mt-4">
          By signing up, you agree to the
          <router-link to="/" class="border-b border-gray-500">Terms of Service</router-link>
          and
          <router-link to="/" class="border-b border-gray-500">Privacy Policy</router-link>
        </div>
      </div>
      <div class="text-gray-500 text-center mt-6">
        Already have an account?
        <router-link to="/login" class="border-b border-blue-500 text-blue">LOGIN</router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';
import IconArrowdown from '@/components/Icons/IconArrowdown.vue';
import authStore from '@/store/AuthStore';
export default {
  components: {
    IconArrowdown,
  },
  setup() {
    const email = ref('');
    const nickname = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const isEmptyValue = ref(false);
    const isMatchedPassword = ref(false);
    const authState = authStore.getAuthState();

    function checkValidation() {
      authStore.clearError();
      isMatchedPassword.value = false;
      isEmptyValue.value = false;
      if (!email.value || !nickname.value || !password.value || !confirmPassword.value) {
        isEmptyValue.value = true;
        return false;
      }

      if (password.value !== confirmPassword.value) {
        isMatchedPassword.value = true;
        return false;
      }
      return true;
    }

    async function register() {
      try {
        if (!checkValidation()) return;
        const data = { email: email.value, nickname: nickname.value, password: password.value };
        await authStore.register(data);
      } catch (err) {
        console.error(err.response);
      }
    }

    return {
      email,
      nickname,
      password,
      confirmPassword,
      register,
      isEmptyValue,
      isMatchedPassword,
      authState,
    };
  },
};
</script>
<style lang=""></style>
