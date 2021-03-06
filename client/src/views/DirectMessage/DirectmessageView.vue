<template lang="">
  <div class="md:container mx-auto pl-20 pr-32 h-full">
    <DirectmessageHeader :user-data="userData" :auth-state="authState" v-if="userData" />
    <ChatList class="" :chat-datas="chatDatas" id="scrollbarRef" />
    <ChatInput class="" @on-key-up-chat="onKeyUpChat" />
  </div>
</template>
<script>
import gravatar from 'gravatar';
import axios from 'axios';
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { axiosOptions, BASE_URL, PAGE_SIZE } from '@/store/GlobalVariable';
import authStore from '@/store/AuthStore';
import ChatInput from '@/components/ChatInput/ChatInput';
import ChatList from '@/components/ChatList/ChatList';
import DirectmessageHeader from '@/views/DirectMessage/DirectmessageHeader';
import socketStore from '@/store/SocketStore';
export default {
  components: { ChatInput, ChatList, DirectmessageHeader },
  setup() {
    const route = useRoute();
    const authState = authStore.getAuthState();
    const userData = ref(null);
    const chatDatas = ref(null);
    const page = ref(2);
    const isEmpty = ref(false);
    const isReachingEnd = ref(false);
    const offMessage = ref(null);
    let scrollbarRef = null;
    let prevScroll = null;
    let [socket, disconnect] = ['', ''];

    function sets(data) {
      isEmpty.value = !data || data.length === 0 || false;
      isReachingEnd.value = isEmpty.value || (data.length && data.length < PAGE_SIZE) || false;
    }

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

    async function getChatDataByScrolling() {
      try {
        const response = await axios.get(
          `${BASE_URL}/workspaces/${route.params.workspace}/dms/${route.params.id}/chats?perPage=${PAGE_SIZE}&page=${page.value}`,
          axiosOptions,
        );
        page.value += 1;
        sets(response.data);
        if (!chatDatas.value) chatDatas.value = response.data;
        else chatDatas.value = [...chatDatas.value, ...response.data];
        if (!prevScroll) prevScroll = scrollbarRef.scrollHeight;
        else {
          scrollbarRef.scrollTo(0, scrollbarRef.scrollHeight - prevScroll);
          prevScroll = scrollbarRef.scrollHeight;
        }
      } catch (err) {
        console.error(err.response);
      }
    }

    async function getChatData() {
      try {
        const response = await axios.get(
          `${BASE_URL}/workspaces/${route.params.workspace}/dms/${
            route.params.id
          }/chats?perPage=${PAGE_SIZE}&page=${1}`,
          axiosOptions,
        );
        chatDatas.value = response.data;
        scrollbarRef.scrollTo(0, scrollbarRef.scrollHeight);
      } catch (err) {
        console.error(err.response);
      }
    }

    async function pushChatData(currentValue) {
      try {
        if (currentValue?.trim()) {
          const data = { content: currentValue };
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

    // scrollTop: 현재 높이, scrollHeight: 전체 높이
    // curPercent = a/b * 100 -> nextLoc 구할 수 있다
    // 15% 이내로되면 요청 ->
    function onScrollingToTop() {
      let currentLoc = null;
      let nextLoc = null;
      scrollbarRef?.addEventListener('scroll', async e => {
        currentLoc = (scrollbarRef.scrollTop / scrollbarRef.scrollHeight) * 100;
        if (currentLoc > 20 || isReachingEnd.value) return;
        nextLoc = (currentLoc / 100) * scrollbarRef.scrollHeight;
        scrollbarRef.scrollTo(0, nextLoc);
        await getChatDataByScrolling();
      });
    }

    onMounted(async () => {
      if (!route.params.id) return;
      scrollbarRef = document.getElementById('scrollbarRef');
      onScrollingToTop();
      await getUserData();
      await getChatData();
    });

    watch(
      () => route.params.id,
      async () => {
        if (!route.params.id) return;
        await getUserData();
        await getChatData();
        // if (offMessage.value) offMessage.value();
        [socket, disconnect] = socketStore.useSocket(route.params.workspace);
        socketStore.onM();
        socketStore.onMessage(socket);
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
