<template lang="">
  <div class="flex items-center justify-between border-b-4">
    <div class="font-bold px-3 py-2 mt-2">
      W MEMBERS
    </div>
    <div class="flex">
      <IconUserAdd
        class="float-right w-5 h-5 mt-2 cursor-pointer font-bold rounded-md hover:bg-blue-100 focus:bg-gray-300 focus:outline-none focus:shadow-outline"
        @click="onClickWsMembersOpen"
      />
    </div>
  </div>
  <WorkspaceMembers
    :current-members="currentMembers"
    @onClickModalCloseIn="onClickModalCloseIn"
    @onClickModalCreateIn="onClickModalCreateIn"
    v-if="showWsMembersModal"
  />
</template>
<script>
import axios from 'axios';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { axiosOptions, BASE_URL } from '@/store/GlobalVariable';
import WorkspaceMembers from '@/components/Modal/WorkspaceMembers';
import IconUserAdd from '@/components/Icons/IconUserAdd';

export default {
  components: {
    WorkspaceMembers,
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
    function onClickWsMembersOpen() {
      showWsMembersModal.value = true;
    }

    function onClickModalCloseIn(isOpen) {
      showWsMembersModal.value = isOpen;
    }

    async function onClickModalCreateIn({ currentValue, wName }) {
      try {
        if (!wName.value) return;
        await axios.post(
          `${BASE_URL}/workspaces/${route.params.workspace}/members`,
          {
            email: wName.value,
          },
          axiosOptions,
        );
        await getWsMembers();
        showWsMembersModal.value = currentValue;
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

    return {
      onClickWsMembersOpen,
      showWsMembersModal,
      onClickModalCloseIn,
      onClickModalCreateIn,
      route,
      currentMembers,
      toggleAccordion,
    };
  },
};
</script>
<style lang=""></style>
