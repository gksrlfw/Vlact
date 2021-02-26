<template lang="">
  <div>
    <IconChevronL v-if="!toggleAccordion" />
    <IconChevronD v-else />
  </div>
</template>
<script>
import IconChevronD from '@/components/Icons/IconChevronD';
import IconChevronL from '@/components/Icons/IconChevronL';
export default {
  components: {
    IconChevronD,
    IconChevronL,
  },
  props: {
    toggleAccordion: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang=""></style>
