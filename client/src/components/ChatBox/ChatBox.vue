<template lang="">
  <div class="">
    <div class="grid border-8 rounded-2xl border-blue-50 shadow-lg">
      <textarea
        ref="textareaRef"
        class="p-2 bg-blue-50 rounded font-bold text-xl focus:outline-none focus:bg-blue-100"
        placeholder="MESSAGE"
        v-model="currentValue"
        @keyup.enter="onKeyUpChat"
      />
      <div class="p-2 rounded-lg flex justify-end ">
        <ModalButton class="font-bold" content="SEND" />
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import autosize from 'autosize';
import ModalButton from '@/components/Button/ModalButton';
export default {
  components: {
    ModalButton,
  },
  emits: ['onKeyUpChat'],
  setup(props, { emit }) {
    const currentValue = ref('');
    const textareaRef = ref('');
    onMounted(() => {
      if (textareaRef.value) {
        autosize(textareaRef.value);
      }
    });
    function onKeyUpChat(e) {
      if (e.shiftKey) {
        window.scrollTo({ left: 0, top: document.body.scrollHeight + 20, behavior: 'smooth' });
        return;
      }
      emit('onKeyUpChat', { currentValue: currentValue.value });
      currentValue.value = '';
    }
    return { currentValue, onKeyUpChat, textareaRef };
  },
};
</script>
<style lang=""></style>
