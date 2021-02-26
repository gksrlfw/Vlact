<template lang="">
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75" @click="onClickClose"></div>
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-blue-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="font-bold text-lg leading-6 text-gray-900" id="modal-headline">
                nickname: {{ authState.loginResponse.nickname }}
              </h3>
              <h3 class="font-bold text-lg leading-6  text-gray-900" id="modal-headline">
                email: {{ authState.loginResponse.email }}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  굉장히 환영합니다!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <ModalButton content="LOGOUT" @click="logout" />
          <ModalButton content="CLOSE" @click="onClickClose" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { toRefs, ref, onMounted } from 'vue';
import authStore from '@/store/AuthStore';
import ModalButton from '@/components/Button/ModalButton';

export default {
  components: {
    ModalButton,
  },
  props: {
    showUserMenu: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['onClickClose', 'logout'],
  setup(props, { emit }) {
    const { showUserMenu } = toRefs(props);
    let authState = authStore.getAuthState();

    const currentValue = ref('');
    function onClickClose() {
      console.log(showUserMenu.value);
      currentValue.value = !showUserMenu.value;
      window.onkeydown = null;
      emit('onClickClose', currentValue);
    }
    async function logout() {
      currentValue.value = !showUserMenu.value;
      emit('logout', currentValue);
    }

    onMounted(() => {
      authState = authStore.getAuthState();
      window.onkeydown = e => {
        if (e.key === 'Escape') onClickClose();
      };
    });

    return {
      onClickClose,
      authState,
      logout,
    };
  },
};
</script>
<style lang=""></style>
