<template lang="">
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75" @click="feature"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <!--  -->
        <ChannelInfo v-if="content === 'ChannelInfo'" />
        <CreateWorkspace v-if="content === 'CreateWorkspace'" />
        <UserInfo v-if="content === 'UserInfo'" />
      </div>
    </div>
  </div>
</template>
<script>
import ChannelInfo from '@/components/Modal/ChannelInfo';
import CreateWorkspace from '@/components/Modal/CreateWorkspace';
import UserInfo from '@/components/Modal/UserInfo';

export default {
  props: {
    content: {
      type: String,
      default: '',
    },
    feature: {
      type: Function,
      default: () => {
        return;
      },
    },
  },
  components: {
    ChannelInfo,
    CreateWorkspace,
    UserInfo,
  },
};
</script>
<style lang=""></style>
