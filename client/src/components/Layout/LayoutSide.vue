<template lang="">
  <aside class="w-64 h-full fixed ">
    <nav class="divide-solid w-full p-4 ml-8 bg-blue-50 rounded-lg justify-center text-center shadow-xl">
      <LayoutSideUser />
      <div class="grid grid-cols-4">
        <LayoutSideWs />
        <LayoutSideMain />
      </div>
    </nav>
  </aside>
</template>
<script>
import LayoutSideMain from '@/components/Layout/LayoutSideMain';
import LayoutSideWs from '@/components/Layout/LayoutSideWs';
import LayoutSideUser from '@/components/Layout/LayoutSideUser';
export default {
  components: {
    LayoutSideMain,
    LayoutSideWs,
    LayoutSideUser,
  },
};
</script>
<style lang="scss"></style>
