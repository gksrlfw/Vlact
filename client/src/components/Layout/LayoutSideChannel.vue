<template lang="">
  <div class="flex items-center justify-between border-b-4">
    <div class="font-bold px-4 py-2 mt-2">
      CHANNELS
    </div>
    <div class="flex">
      <IconPlus
        class="float-right w-5 h-5 mt-2 cursor-pointer font-bold rounded-md hover:bg-blue-100 focus:bg-gray-300 focus:outline-none focus:shadow-outline"
        @click="onClickChannelOpen"
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
      v-for="data in currentChannels"
      :key="data.id"
      class="flex justify-between ml-3 text-left font-semibold px-4 py-2 mt-2 rounded-lg hover:bg-blue-100 focus:bg-gray-300 focus:outline-none focus:shadow-outline"
      @click="onSelectChannel(route.params.workspace + data.id)"
    >
      <!--:to="`/workspace/${route.params.workspace}/${data.name}`"  -->
      <router-link
        :to="{
          name: 'Channel',
          params: { workspace: route.params.workspace, channel: data.name },
        }"
        class="w-full"
        >{{ data.name }}</router-link
      >
      <IconCheckCircle :id="route.params.workspace + data.id" class="w-4 h-4 mt-1 hidden text-red-500" />
    </div>
  </div>
  <ChannelInfo
    :show-channel-modal="showChannelModal"
    @onClickChannelInfoClose="onClickChannelInfoClose"
    @onClickChannelCreate="onClickChannelCreate"
    v-if="showChannelModal"
  />
</template>
<script>
import axios from 'axios';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { axiosOptions, BASE_URL, globalChannels } from '@/store/GlobalVariable';
import ChannelInfo from '@/components/Modal/ChannelInfo';
import AccodionButton from '@/components/Button/AccodionButton';
import IconPlus from '@/components/Icons/IconPlus';
import IconCheckCircle from '@/components/Icons/IconCheckCircle';
import authStore from '@/store/AuthStore';

export default {
  components: {
    ChannelInfo,
    AccodionButton,
    IconPlus,
    IconCheckCircle,
  },
  setup() {
    const showChannelModal = ref(false);
    const route = useRoute();
    const currentChannels = ref([]);
    const toggleAccordion = ref(false);
    const currentChannel = ref('');
    
    async function getChannels() {
      try {
        const response = await axios.get(`${BASE_URL}/workspaces/${route.params.workspace}/channels`, axiosOptions);
        currentChannels.value = response.data;
        globalChannels.value = response.data;
      } catch (err) {
        console.error(err.response);
      }
    }

    // url이 바뀌면 getChannels!
    watch(
      () => route.params.workspace,
      async () => {
        if (!route.params.workspace) return;
        await getChannels();
      },
    );

    function onClickChannelOpen() {
      showChannelModal.value = true;
    }

    function onClickChannelInfoClose(currentValue) {
      showChannelModal.value = currentValue.value;
    }

    async function onClickChannelCreate({ currentValue, cName }) {
      try {
        if (!cName.value) return;
        await axios.post(
          `${BASE_URL}/workspaces/${route.params.workspace}/channels`,
          {
            name: cName.value,
          },
          axiosOptions,
        );
        await getChannels();
        showChannelModal.value = currentValue.value;
      } catch (err) {
        console.error(err.response);
      }
    }

    function onSelectChannel(id) {
      const el = document.getElementById(id);
      el.classList.remove('hidden');
      console.log(id, currentChannel.value);
      if (currentChannel.value && currentChannel.value !== id) {
        const curEl = document.getElementById(currentChannel.value);
        curEl?.classList.add('hidden');
      }
      currentChannel.value = id;
    }

    return {
      onClickChannelOpen,
      showChannelModal,
      onClickChannelInfoClose,
      onClickChannelCreate,
      route,
      currentChannels,
      toggleAccordion,
      onSelectChannel,
    };
  },
};
</script>
<style lang=""></style>
