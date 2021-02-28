<template lang="">
  <div class="md:container mx-auto pl-20 pr-32 h-full">
    <DirectmessageHeader :user-data="userData" :auth-state="authState" />
    <ChatList class="" />
    <ChatBox class="" @on-key-up-chat="onKeyUpChat" />
  </div>
</template>
<script>
import gravatar from 'gravatar';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { axiosOptions, BASE_URL } from '@/store/GlobalVariable';
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
    onMounted(async () => {
      if (route.params.id) await getUserData();
    });
    watch(
      () => route.params.id,
      async () => {
        if (route.params.id) await getUserData();
      },
    );
    async function getChatData() {
      try {
        const response = await axios.post(
          `${BASE_URL}/workspaces/${route.params.workspace}/dms/${route.params.id}/chats?perPage=20=&page=1`,
          axiosOptions,
        );
        console.log(response.data);
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
            `${BASE_URL}/workspaces/${route.params.workspace}/dms/${route.params.id}/chat`,
            data,
            axiosOptions,
          );
        }
      } catch (err) {
        console.error(err.response);
      }
    }

    async function onKeyUpChat({ currentValue }) {
      console.log('submit!', currentValue);
      await pushChatData(currentValue);
      await getChatData();
    }

    return {
      userData,
      gravatar,
      authState,
      onKeyUpChat,
    };
  },
};
</script>
<style lang=""></style>
