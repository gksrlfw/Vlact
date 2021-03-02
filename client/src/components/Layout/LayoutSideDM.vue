<template lang="">
  <div class="flex items-center justify-between border-b-4">
    <div class="font-bold px-3 py-2 mt-2">
      C MEMBERS
    </div>
    <div class="flex">
      <IconUserAdd
        class="float-right w-5 h-5 mt-2 cursor-pointer font-bold rounded-md hover:bg-blue-100 focus:bg-gray-300 focus:outline-none focus:shadow-outline"
        @click="onClickDMOpen"
      />
      <AccodionButton
        class="w-5 h-5 mt-2 cursor-pointer font-bold rounded-md hover:bg-blue-100 focus:bg-gray-300 focus:outline-none focus:shadow-outline"
        :toggle-accordion="toggleAccordion"
        @click="toggleAccordion = !toggleAccordion"
      />
    </div>
  </div>
  <div v-if="toggleAccordion">
    <div
      v-for="data in globalMembers"
      :key="data.id"
      class="flex justify-between ml-3 text-left font-semibold px-4 py-2 mt-2 rounded-lg hover:bg-blue-100 focus:bg-gray-300 focus:outline-none focus:shadow-outline"
      @click="onClickUser(route.params.channel + data.id)"
    >
      <div class="w-full">{{ data.nickname }}</div>
      <IconUser
        :id="route.params.channel + data.id"
        class="w-4 h-4 mt-1 text-green-300"
        v-if="checkOnlineList(data.id)"
      />
      <IconUser :id="route.params.channel + data.id" class="w-4 h-4 mt-1" v-else />
    </div>
  </div>
  <DMInfo @onClickModalCloseIn="onClickModalCloseIn" @onClickModalCreateIn="onClickModalCreateIn" v-if="showDMModal" />
</template>
<script>
import axios from 'axios';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { axiosOptions, BASE_URL, globalChannels } from '@/store/GlobalVariable';
import DMInfo from '@/components/Modal/DMInfo';
import AccodionButton from '@/components/Button/AccodionButton';
import IconUserAdd from '@/components/Icons/IconUserAdd';
import IconUser from '@/components/Icons/IconUser';
import socketStore from '@/store/SocketStore';
import authStore from '@/store/AuthStore';

export default {
  components: {
    DMInfo,
    AccodionButton,
    IconUserAdd,
    IconUser,
  },
  setup() {
    const route = useRoute();
    const showDMModal = ref(false);
    const globalMembers = ref([]);
    const toggleAccordion = ref(false);
    const currentUser = ref('');
    const onlineList = socketStore.getOnlineList();
    const authState = authStore.getAuthState();
    const offOnlineList = ref('');

    async function getMembers() {
      try {
        const response = await axios.get(
          `${BASE_URL}/workspaces/${route.params.workspace}/channels/${route.params.channel}/members`,
          axiosOptions,
        );
        globalMembers.value = response.data;
      } catch (err) {
        console.error(err.response);
      }
    }

    function checkOnlineList(curId) {
      let ok = false;
      if (!onlineList.value) return;
      onlineList.value.map(user => {
        if (Number(user) === Number(curId)) ok = true;
      });
      return ok;
    }

    function onClickUser(id) {
      const el = document.getElementById(id);
      el.classList.add('text-gray-500');
      if (currentUser.value && currentUser.value !== id) {
        const curEl = document.getElementById(currentUser.value);
        curEl?.classList.remove('text-gray-500');
      }
      currentUser.value = id;
    }

    function onClickDMOpen() {
      showDMModal.value = true;
    }

    function onClickModalCloseIn(currentValue) {
      showDMModal.value = currentValue.value;
    }

    async function onClickModalCreateIn({ currentValue, user }) {
      try {
        if (!user.value) return;
        await axios.post(
          `${BASE_URL}/workspaces/${route.params.workspace}/channels/${route.params.channel}/members`,
          {
            email: user.value,
          },
          axiosOptions,
        );
        await getMembers();
        showDMModal.value = currentValue;
      } catch (err) {
        console.error(err.response);
      }
    }

    // url이 바뀌면 getMembers!
    watch(
      () => route.params.channel,
      async () => {
        if (!route.params.channel) {
          globalMembers.value = [];
          return;
        }
        await getMembers();
      },
    );
    // socket
    watch(
      () => route.params.channel,
      () => {
        if (!route.params.workspace) return;
        const [socket, disconnect] = socketStore.useSocket(route.params.workspace);
        if (!route.params.channel || !socket || !globalChannels.value) return;
        socketStore.emitLoginUser(socket, {
          id: authState.loginResponse.id,
          channels: globalChannels.value.map(v => v.id),
        });
        socketStore.onMessageChannel(socket);
        offOnlineList.value = socketStore.onOnlineList(socket);
      },
    );
    return {
      onClickDMOpen,
      showDMModal,
      onClickModalCloseIn,
      onClickModalCreateIn,
      route,
      globalMembers,
      toggleAccordion,
      onClickUser,
      onlineList,
      checkOnlineList,
    };
  },
};
</script>
<style lang=""></style>
