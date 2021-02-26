<template lang="">
  <div class="flex items-center justify-between border-b-4">
    <div class="font-bold px-4 py-2 mt-2">
      DM
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
      v-for="data in currentMembers"
      :key="data.id"
      class="flex justify-between ml-3 text-left font-semibold px-4 py-2 mt-2 rounded-lg hover:bg-blue-100 focus:bg-gray-300 focus:outline-none focus:shadow-outline"
      @click="onClickUser(route.params.channel + data.id)"
    >
      <!-- <router-link :to="`/workspace/${route.params.workspace}/${route.params.channel}/${data.nickname}`">{{ -->
      <router-link
        :to="{
          name: 'DM',
          params: { workspace: route.params.workspace, channel: route.params.channel, id: data.id },
        }"
        class="w-full"
        >{{ data.nickname }}</router-link
      >
      <IconUser :id="route.params.channel + data.id" class="w-4 h-4 mt-1" />
    </div>
  </div>
  <DMInfo
    :show-d-m-modal="showDMModal"
    @onClickDMInfoClose="onClickDMInfoClose"
    @onClickDMCreate="onClickDMCreate"
    v-if="showDMModal"
  />
</template>
<script>
import axios from 'axios';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { axiosOptions, BASE_URL } from '@/store/GlobalVariable';
import DMInfo from '@/components/Modal/DMInfo';
import AccodionButton from '@/components/Button/AccodionButton';
import IconUserAdd from '@/components/Icons/IconUserAdd';
import IconUser from '@/components/Icons/IconUser';

export default {
  components: {
    DMInfo,
    AccodionButton,
    IconUserAdd,
    IconUser,
  },
  setup() {
    const showDMModal = ref(false);
    const route = useRoute();
    const currentMembers = ref([]);
    const toggleAccordion = ref(false);
    const currentUser = ref('');

    async function getMembers() {
      try {
        const response = await axios.get(
          `${BASE_URL}/workspaces/${route.params.workspace}/channels/${route.params.channel}/members`,
          axiosOptions,
        );
        currentMembers.value = response.data;
      } catch (err) {
        console.error(err.response);
      }
    }

    // url이 바뀌면 getMembers!
    watch(
      () => route.params.channel,
      async () => {
        if (!route.params.channel) currentMembers.value = [];
        else await getMembers();
      },
    );

    function onClickDMOpen() {
      showDMModal.value = true;
    }

    function onClickDMInfoClose(currentValue) {
      showDMModal.value = currentValue.value;
    }

    async function onClickDMCreate({ currentValue, user }) {
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
        showDMModal.value = currentValue.value;
      } catch (err) {
        console.error(err.response);
      }
    }

    function onClickUser(id) {
      const el = document.getElementById(id);
      el.classList.add('text-red-500');
      if (currentUser.value && currentUser.value !== id) {
        const curEl = document.getElementById(currentUser.value);
        curEl?.classList.remove('text-red-500');
      }
      currentUser.value = id;
    }

    return {
      onClickDMOpen,
      showDMModal,
      onClickDMInfoClose,
      onClickDMCreate,
      route,
      currentMembers,
      toggleAccordion,
      onClickUser,
    };
  },
};
</script>
<style lang=""></style>
