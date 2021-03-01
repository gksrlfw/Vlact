<template lang="">
  <div class="md:container mx-auto pl-20 pr-32 h-full">
    <ChannelHeader />
    <ChatList class="" :chat-datas="chatDatas" :scrollbar-ref="scrollbarRef" id="scrollbarRef" />
    <ChatBox class="" @on-key-up-chat="onKeyUpChat" />
  </div>
</template>
<script>
import gravatar from 'gravatar';
import axios from 'axios';
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { axiosOptions, BASE_URL, globalChatDatas, globalRef, PAGE_SIZE } from '@/store/GlobalVariable';
import authStore from '@/store/AuthStore';
import ChatBox from '@/components/ChatBox/ChatBox';
import ChatList from '@/components/ChatList/ChatList';
import ChannelHeader from '@/views/Channel/ChannelHeader';
import socketStore from '@/store/SocketStore';
export default {
  components: { ChatBox, ChatList, ChannelHeader },
  setup() {
    const route = useRoute();
    const authState = authStore.getAuthState();
    const userData = ref(null);
    const chatDatas = ref(null);
    const page = ref(2);
    const isEmpty = ref(false);
    const isReachingEnd = ref(false);
    let scrollbarRef = null;
    let prevScroll = null;
    // let [socket, disconnect] = ['', ''];

    function sets(data) {
      isEmpty.value = !data || data.length === 0 || false;
      isReachingEnd.value = isEmpty.value || (data.length && data.length < PAGE_SIZE) || false;
    }

    async function getChatDataByScrolling() {
      try {
        const response = await axios.get(
          `${BASE_URL}/workspaces/${route.params.workspace}/channels/${route.params.channel}/chats?perPage=${PAGE_SIZE}&page=${page.value}`,
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
          `${BASE_URL}/workspaces/${route.params.workspace}/channels/${
            route.params.channel
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
            `${BASE_URL}/workspaces/${route.params.workspace}/channels/${route.params.channel}/chats`,
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
      // await getChatData();
    }

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
      scrollbarRef = document.getElementById('scrollbarRef');
      onScrollingToTop();
    });

    watch(
      () => route.params.channel,
      async () => {
        if (!route.params.channel) return;
        await getChatData();
        scrollbarRef.scrollTo(0, scrollbarRef.scrollHeight);
      },
      { immediate: true },
    );

    watch(
      () => globalChatDatas.value.content,
      async () => {
        if (globalChatDatas.value.Channel.name !== route.params.channel) return;
        chatDatas.value.unshift(globalChatDatas.value);
        console.log(chatDatas.value, route.params.channel);
        setTimeout(() => {
          scrollbarRef.scrollTo(0, scrollbarRef.scrollHeight);
        }, 0);
      },
      { deep: true },
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
