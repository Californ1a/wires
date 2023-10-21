<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23">
    <path d="M17 16H7V5.025h3L5.025 0 0 5.025h3V20h14v3l5-4.931L17 13v3z" />
  </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  rotate: {
    type: String,
    default: '0deg',
  },
});

const r = computed(() => `rotate(${props.rotate})`);
</script>

<style scoped>
svg {
  transform: v-bind('r');
}
</style>
