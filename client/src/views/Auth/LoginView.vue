<template>
  <div class="bg-gray-200 min-h-screen flex flex-col">
    <div class="container max-w-sm mx-auto flex-1 flex flex-col justify-center">
      <div class="bg-white px-6 py-8 rounded shadow-md text-black">
        <h1 class="mb-8 text-3xl text-center font-bold">LOGIN</h1>
        <input
          type="email"
          class="border border-gray-300 w-full p-3 rounded mb-4"
          name="email"
          placeholder="EMAIL"
          v-model="email"
        />
        <input
          type="password"
          class="border border-gray-300 w-full p-3 rounded mb-4"
          name="password"
          placeholder="PASSWORD"
          v-model="password"
        />
        <div class="mb-2 text-red-500 font-bold" v-if="isEmptyValue">FILL IN ALL VALUE!</div>
        <div class="mb-2 text-red-500 font-bold" v-if="authState.loginError">{{ authState.loginError }}</div>

        <button
          class="w-full py-3 rounded bg-gray-500 text-white hover:bg-gray-800 focus:outline-none my-1"
          @click="login"
        >
          LOGIN
        </button>
      </div>
      <div class="text-gray-500 text-center mt-6">
        Need to register?
        <router-link to="/register" class="border-b border-blue-500 text-blue">REGISTER</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import authStore from '@/store/AuthStore';

export default {
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const isEmptyValue = ref(false);
    const authState = authStore.getAuthState();

    function checkValidation() {
      authStore.clearError();
      isEmptyValue.value = false;
      if (!email.value || !password.value) {
        isEmptyValue.value = true;
        return false;
      }
      return true;
    }

    async function login() {
      try {
        if (!checkValidation()) return;
        const data = { email: email.value, password: password.value };
        await authStore.login(data);
        if (authState.loginError) return;
        return router.push({ name: 'Workspace' });
      } catch (err) {
        console.error(err.response);
      }
    }

    return {
      email,
      password,
      login,
      isEmptyValue,
      authState,
    };
  },
};
</script>
<style lang=""></style>
