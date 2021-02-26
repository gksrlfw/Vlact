<template lang="">
  <div class="col-span-3">
    <LayoutSideChannel />
    <LayoutSideDM />
  </div>
</template>
<script>
import LayoutSideChannel from '@/components/Layout/LayoutSideChannel';
import LayoutSideDM from '@/components/Layout/LayoutSideDM';

export default {
  components: {
    LayoutSideChannel,
    LayoutSideDM,
  },
};
</script>
