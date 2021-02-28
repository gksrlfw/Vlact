<template lang="">
  <div class="flex items-center justify-between border-b-4">
    <div class="font-bold px-4 py-2 mt-2">
      MEMBERS
    </div>
    <div class="flex">
      <IconUserAdd
        class="float-right w-5 h-5 mt-2 cursor-pointer font-bold rounded-md hover:bg-blue-100 focus:bg-gray-300 focus:outline-none focus:shadow-outline"
        @click="onClickWsMembersOpen"
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
    >
      <div class="w-full">{{ data.nickname }}</div>
    </div>
  </div>
  <WorkspaceMembers
    :show-ws-members-modal="showWsMembersModal"
    @onClickWsMembersClose="onClickWsMembersClose"
    @onClickWsMembersCreate="onClickWsMembersCreate"
    v-if="showWsMembersModal"
  />
</template>
<script>
import axios from 'axios';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { axiosOptions, BASE_URL } from '@/store/GlobalVariable';
import WorkspaceMembers from '@/components/Modal/WorkspaceMembers';
import AccodionButton from '@/components/Button/AccodionButton';
import IconUserAdd from '@/components/Icons/IconUserAdd';

export default {
  components: {
    WorkspaceMembers,
    AccodionButton,
    IconUserAdd,
  },
  setup() {
    const showWsMembersModal = ref(false);
    const route = useRoute();
    const currentMembers = ref([]);
    const toggleAccordion = ref(false);

    async function getWsMembers() {
      try {
        const response = await axios.get(`${BASE_URL}/workspaces/${route.params.workspace}/members`, axiosOptions);
        currentMembers.value = response.data;
      } catch (err) {
        console.error(err.response);
      }
    }

    // url이 바뀌면 getWsMembers!
    watch(
      () => route.params.workspace,
      async () => {
        if (!route.params.workspace) return;
        await getWsMembers();
      },
    );

    function onClickWsMembersOpen() {
      showWsMembersModal.value = true;
    }

    function onClickWsMembersClose(currentValue) {
      showWsMembersModal.value = currentValue.value;
    }

    async function onClickWsMembersCreate({ currentValue, wName }) {
      try {
        if (!wName.value) return;
        console.log('done');
        await axios.post(
          `${BASE_URL}/workspaces/${route.params.workspace}/members`,
          {
            email: wName.value,
          },
          axiosOptions,
        );
        console.log('done');
        await getWsMembers();
        showWsMembersModal.value = currentValue.value;
      } catch (err) {
        console.error(err.response);
      }
    }

    return {
      onClickWsMembersOpen,
      showWsMembersModal,
      onClickWsMembersClose,
      onClickWsMembersCreate,
      route,
      currentMembers,
      toggleAccordion,
    };
  },
};
</script>
<style lang=""></style>
