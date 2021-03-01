<template lang="">
  <div class="md:container mx-auto pl-20 pr-32 h-full">
    <DirectmessageHeader :user-data="userData" :auth-state="authState" />
    <ChatList class="" :chat-datas="chatDatas" :scrollbar-ref="scrollbarRef" id="scrollbarRef" />
    <ChatBox class="" @on-key-up-chat="onKeyUpChat" />
  </div>
</template>
<script>
import gravatar from 'gravatar';
import axios from 'axios';
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { axiosOptions, BASE_URL, PAGE_SIZE } from '@/store/GlobalVariable';
import authStore from '@/store/AuthStore';
import ChatBox from '@/components/ChatBox/ChatBox';
import ChatList from '@/components/ChatList/ChatList';
import DirectmessageHeader from '@/views/DirectMessage/DirectmessageHeader';
export default {
  components: { ChatBox, ChatList, DirectmessageHeader },
  setup() {
    const route = useRoute();
    const authState = authStore.getAuthState();
    const userData = ref('');
    const chatDatas = ref('');
    const page = ref(1);
    const isEmpty = computed(() => {
      return chatDatas?.value?.[0]?.length === 0 || false;
    });
    const isReachingEnd = computed(() => {
      return (
        isEmpty.value || (chatDatas.value && chatDatas.value[chatDatas.value.length - 1]?.length < PAGE_SIZE) || false
      );
    });

    async function getUserData() {
      try {
        const response = await axios.get(
          `${BASE_URL}/workspaces/${route.params.workspace}/users/${route.params.id}`,
          axiosOptions,
        );
        userData.value = response.data;
      } catch (err) {
        console.error(err);
      }
    }
    async function getChatData() {
      try {
        const response = await axios.get(
          `${BASE_URL}/workspaces/${route.params.workspace}/dms/${route.params.id}/chats?perPage=${PAGE_SIZE}&page=${page.value}`,
          axiosOptions,
        );
        page.value += 1;
        chatDatas.value = response.data;
      } catch (err) {
        console.error(err.response);
      }
    }

    async function pushChatData(currentValue) {
      try {
        if (currentValue?.trim()) {
          const data = { content: currentValue };
          console.log('curV', data);
          await axios.post(
            `${BASE_URL}/workspaces/${route.params.workspace}/dms/${route.params.id}/chats`,
            data,
            axiosOptions,
          );
        }
      } catch (err) {
        console.error(err.response);
      }
    }

    async function onKeyUpChat({ currentValue }) {
      await pushChatData(currentValue);
      await getChatData();
    }

    function onScrollTop() {
      const scrollbarRef = document.getElementById('scrollbarRef');
      scrollbarRef.addEventListener('scroll', async e => {
        console.log(scrollbarRef.scrollTop, isReachingEnd.value);
        if (scrollbarRef.scrollTop !== 0 || isReachingEnd.value) return;
        console.log('???');
        await getChatData();
      });
    }

    onMounted(async () => {
      if (!route.params.id) return;
      onScrollTop();
      await getUserData();
      await getChatData();
    });

    watch(
      () => route.params.id,
      async () => {
        if (!route.params.id) return;
        await getUserData();
        await getChatData();
      },
    );

    return {
      userData,
      gravatar,
      authState,
      onKeyUpChat,
      chatDatas,
    };
  },
};
</script>
<style lang=""></style>
