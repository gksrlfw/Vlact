<template lang="">
  <div class="h-2/3 bg-blue-50 p-10 rounded-xl mb-10 overflow-auto">
    <div v-for="[date, data] in Object.entries(chatSections)" :key="date">
      <div class="flex justify-center">
        <div class="bg-gray-300 text-sm rounded-full py-2 px-4 font-semibold">{{ date }}</div>
      </div>
      <div v-for="chat in data" :key="chat.id" class="mb-2 flex">
        <div class="mr-3">
          <img
            :src="gravatar.url(chat.User.email, { s: '24px', d: 'retro' })"
            :alt="chat.User.nickname"
            class="rounded-full"
          />
        </div>
        <div class="">
          <div class="font-bold px-2">{{ chat.User.nickname }}</div>
          <div class="flex">
            <div v-html="chat.content" class="bg-blue-100 rounded-lg px-5 py-3 mr-3 font-bold hover:bg-blue-200"></div>
            <div class="absolute bottom-0 left-full text-sm w-24 text-gray-700 font-semibold mb-1">
              {{ dayjs(chat.createdAt).format('h:mm A') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 왜 안되냐... props를 어케 받아야될까??..
import { toRefs, watch, ref } from 'vue';
import authStore from '@/store/AuthStore';
import gravatar from 'gravatar';
import dayjs from 'dayjs';
import divideSection from '@/components/ChatList/daySection';
export default {
  props: ['chatDatas'],

  setup(props) {
    const { chatDatas } = toRefs(props);
    const displayChats = ref([]);
    const chatSections = ref([]);
    const authState = authStore.getAuthState();

    watch(
      () => chatDatas.value,
      () => {
        if (!chatDatas.value) return;
        displayChats.value = [...chatDatas.value].reverse();
        chatSections.value = divideSection(displayChats.value);
      },
      { deep: true },
    );

    return {
      authState,
      displayChats,
      chatSections,
      gravatar,
      dayjs,
    };
  },
};
</script>
<style lang="css">
.z-ten {
  z-index: -1;
}
</style>
