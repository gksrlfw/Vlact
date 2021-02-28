<template lang="">
  <div class="col-span-3">
    <LayoutSideWsMembers />
    <LayoutSideChannel />
    <LayoutSideDM />
  </div>
</template>
<script>
import LayoutSideWsMembers from '@/components/Layout/LayoutSideWsMembers';
import LayoutSideChannel from '@/components/Layout/LayoutSideChannel';
import LayoutSideDM from '@/components/Layout/LayoutSideDM';

export default {
  components: {
    LayoutSideWsMembers,
    LayoutSideChannel,
    LayoutSideDM,
  },
};
</script>
