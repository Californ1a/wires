<template>
  <div
    :class="{
      cell: true,
      'cell-visible': cell.visible && !cell.wire?.end && !cell.blocked,
      'cell-invisible': !cell.visible && !cell.wire?.end && !cell.blocked,
      'cell-end': cell.end,
      'cell-blocked': cell.blocked,
    }"
    @click="(game.won) ? null
      : store.clearDisplayColor(cell)">
    <span v-if="cell.end">⭕</span>
    <CornerArrow v-else-if="cornerArrowRotation" :rotate="cornerArrowRotation" />
    <span v-else>{{ straightArrow }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import useStore from '@/store';
import CornerArrow from '@/components/CornerArrow.vue';
import { storeToRefs } from 'pinia';

const store = useStore();
const { game } = storeToRefs(store);

const props = defineProps({
  cell: {
    type: Object,
    required: true,
  },
});

const cellColor = computed(() => ((props.cell.visible && props.cell.displayColor) ? props.cell.displayColor : '#eee'));
const hueRotateMap = {
  red: '0deg',
  green: '120deg',
  blue: '240deg',
  yellow: '60deg',
  purple: '300deg',
  orange: '30deg',
  pink: '330deg',
  lightblue: '190deg',
  grey: '60deg',
};
const hueRotate = computed(() => `hue-rotate(${hueRotateMap[props.cell.wire?.color]})`);

const cornerArrowRotation = computed(() => {
  const dir = props.cell.wireDirection;
  if (dir.left && dir.up) return '270deg';
  if (dir.left && dir.down) return '180deg';
  if (dir.right && dir.up) return '0deg';
  if (dir.right && dir.down) return '90deg';
  return null;
});

const straightArrow = computed(() => {
  const dir = props.cell.wireDirection;
  if (dir.up && dir.down) return '↕';
  if (dir.left && dir.right) return '↔';
  if (dir.up) return '⬆';
  if (dir.down) return '⬇';
  if (dir.left) return '⬅';
  if (dir.right) return '➡';
  return null;
});
</script>

<style scoped>
.cell {
  width: 100%;
  height: 100%;
  flex: 1;
  border: 1px solid #555;
  background: #eee;
  margin: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.cell-visible {
  background: v-bind('cellColor');
}

.cell-invisible {
  background: #333;
}

.cell-blocked {
  background: #eee;
}

.cell-invisible:hover {
  background: #444;
  cursor: pointer;
}

.cell-visible:not(.cell-end):hover {
  filter: brightness(0.8);
  cursor: pointer;
}

.cell-end {
  background: v-bind('cellColor');
  border: 3px solid #555;
}

.cell-end span {
  filter: v-bind('hueRotate');
}

span {
  font-weight: 900;
  font-size: 2rem;
  background: #eeeeee55;
  border-radius: 20%;
  padding: 0 0.2rem;
}
</style>
