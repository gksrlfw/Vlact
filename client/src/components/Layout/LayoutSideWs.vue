<template lang="">
  <div>
    <div>
      <button
        class="font-bold block mt-2 rounded-lg bg-blue-100  hover:bg-blue-100 focus:bg-gray-300 focus:outline-none focus:shadow-outline"
      >
        <IconPlus class="h-10 w-10 p-1.5" @click="onClickModalOpenIn" />
      </button>
    </div>
    <div>
      <button
        v-for="data in authState.loginResponse.Workspaces"
        :key="data.id"
        class="font-bold block px-4 py-2 mt-2 rounded-lg bg-blue-100 hover:bg-blue-200 focus:bg-gray-300 focus:outline-none focus:shadow-outline"
        @click="selectWorkspace(data)"
      >
        {{ data.name[0] }}
      </button>
    </div>
  </div>
  <WorkspaceInfo
    @onClickModalCloseIn="onClickModalCloseIn"
    @onClickModalCreateIn="onClickModalCreateIn"
    v-if="showCreateWorkspace"
  />
</template>
<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { BASE_URL, axiosOptions } from '@/store/GlobalVariable';
import authStore from '@/store/AuthStore';
import IconPlus from '@/components/Icons/IconPlus';
import WorkspaceInfo from '@/components/Modal/WorkspaceInfo.vue';

export default {
  components: {
    IconPlus,
    WorkspaceInfo,
  },
  setup() {
    const router = useRouter();
    const showCreateWorkspace = ref(false);
    const authState = authStore.getAuthState();

    onMounted(async () => {
      authState.loginResponse = await authStore.getAllInfo();
    });

    async function onClickModalCreateIn({ currentValue, wName, wUrl }) {
      try {
        if (!wName.value) return;
        if (!wUrl.value) return;
        const data = {
          workspace: wName.value,
          url: wUrl.value,
        };
        const response = await axios.post(`${BASE_URL}/workspaces`, data, axiosOptions);
        if (response.status !== 200) return alert('실패');
        authState.loginResponse = await authStore.getAllInfo();
        showCreateWorkspace.value = currentValue;
      } catch (err) {
        console.error(err.response);
      }
    }

    function selectWorkspace(data) {
      router.push({ name: 'WorkspaceP', params: { workspace: data.name } });
    }

    function onClickModalOpenIn() {
      showCreateWorkspace.value = true;
    }
    function onClickModalCloseIn(currentValue) {
      showCreateWorkspace.value = currentValue;
    }
    return {
      showCreateWorkspace,
      onClickModalOpenIn,
      onClickModalCloseIn,
      onClickModalCreateIn,
      authState,
      selectWorkspace,
    };
  },
};
</script>
<style lang=""></style>
