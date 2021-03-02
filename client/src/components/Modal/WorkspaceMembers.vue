<template lang="">
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75" @click="onClickModalClose"></div>
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
            <div class="mb-10">
              <h3 class="mb-4 text-2xl text-center font-bold">INVITE MEMBER IN WORKSPACE</h3>
              <div class="">
                <h5 class="mr-4 font-semibold">CURRENT MEMBERS</h5>
                <span v-for="member in currentMembers" :key="member.id" class="ml-2 font-semibold">
                  {{ member.nickname }}
                </span>
              </div>
            </div>
            <input
              type="text"
              class="border border-gray-300 w-full p-3 rounded mb-6"
              placeholder="WORKSPACE NAME"
              v-model="wName"
            />
          </div>
        </div>
        <div class=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <ModalButton content="CREATE" @click="onClickModalCreate" />
          <ModalButton content="CLOSE" @click="onClickModalClose" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { BaseModal } from '@/components/Modal/BaseModal';
import ModalButton from '@/components/Button/ModalButton';

export default {
  components: {
    ModalButton,
  },
  props: {
    currentMembers: {
      type: Array,
    },
  },
  emits: ['onClickModalCloseIn', 'onClickModalCreateIn'],
  setup(_, { emit }) {
    const baseModal = new BaseModal(emit);
    const wName = ref('');

    onMounted(() => {
      baseModal.onPressEsc();
    });

    function onClickModalClose() {
      baseModal.onClickModalClose();
    }

    function onClickModalCreate() {
      baseModal.onClickModalCreate({ currentValue: false, wName });
    }

    return {
      onClickModalCreate,
      onClickModalClose,
      wName,
    };
  },
};
</script>
<style lang=""></style>
