<template lang="">
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75" @click="onClickWsMembersClose"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-blue-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="mt-3 text-center sm:mt-0 sm:text-left px-10 py-6">
            <h3 class="mb-10 text-2xl text-center font-bold">CREATE WORKSPACE</h3>
            <input
              type="text"
              class="border border-gray-300 w-full p-3 rounded mb-6"
              placeholder="WORKSPACE NAME"
              v-model="wName"
            />
          </div>
        </div>
        <div class=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <ModalButton content="CREATE" @click="onClickWsMembersCreate" />
          <ModalButton content="CLOSE" @click="onClickWsMembersClose" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { toRefs, ref, onMounted } from 'vue';
import ModalButton from '@/components/Button/ModalButton';
export default {
  components: {
    ModalButton,
  },
  props: {
    showWsMembersModal: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['onClickWsMembersClose', 'onClickWsMembersCreate'],
  setup(props, { emit }) {
    const { showWsMembersModal } = toRefs(props);
    const currentValue = ref('');
    const wName = ref('');
    function onClickWsMembersClose() {
      currentValue.value = !showWsMembersModal.value;
      window.onkeydown = null;
      emit('onClickWsMembersClose', currentValue);
    }

    function onClickWsMembersCreate() {
      currentValue.value = !showWsMembersModal.value;
      console.log(currentValue, wName);
      emit('onClickWsMembersCreate', { currentValue, wName });
    }
    onMounted(() => {
      window.onkeydown = e => {
        if (e.key === 'Escape') onClickWsMembersClose();
      };
    });
    return {
      onClickWsMembersCreate,
      onClickWsMembersClose,
      wName,
    };
  },
};
</script>
<style lang=""></style>
