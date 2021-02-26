<template lang="">
  <div>
    <div>
      <button
        class="font-bold block mt-2 rounded-lg bg-blue-100  hover:bg-blue-100 focus:bg-gray-300 focus:outline-none focus:shadow-outline"
      >
        <IconPlus class="h-10 w-10 p-1.5" @click="onClickCreateWorkspaceOpen" />
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
    :show-create-workspace="showCreateWorkspace"
    @onClickCreateWorkspaceClose="onClickCreateWorkspaceClose"
    @onClickCreateWorkspace="onClickCreateWorkspace"
    v-if="showCreateWorkspace"
  />
</template>
<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
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
      console.log(authState.loginResponse);
    });

    function onClickCreateWorkspaceOpen() {
      showCreateWorkspace.value = true;
    }

    function onClickCreateWorkspaceClose(currentValue) {
      showCreateWorkspace.value = currentValue.value;
    }

    async function onClickCreateWorkspace({ currentValue, wName, wUrl }) {
      try {
        if (!wName.value) return;
        if (!wUrl.value) return;
        // TODO
        const response = await axios.post(
          `${BASE_URL}/workspaces`,
          {
            workspace: wName.value,
            url: wUrl.value,
          },
          axiosOptions,
        );
        if (response.status !== 200) return alert('실패');
        authState.loginResponse = await authStore.getAllInfo();
        showCreateWorkspace.value = currentValue.value;
      } catch (err) {
        console.error(err.response);
      }
    }

    async function selectWorkspace(data) {
      try {
        console.log(`${BASE_URL}/${data.name}/channels`);
        const response = await axios.get(`${BASE_URL}/workspaces/${data.name}/channels`, axiosOptions);
        console.log(response.data);
        router.push({ name: 'WorkspaceP', params: { workspace: data.name } });
      } catch (err) {
        console.error(err.response);
      }
    }
    return {
      showCreateWorkspace,
      onClickCreateWorkspaceOpen,
      onClickCreateWorkspaceClose,
      onClickCreateWorkspace,
      authState,
      selectWorkspace,
    };
  },
};
</script>
<style lang=""></style>
