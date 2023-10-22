<template>
  <div
    :class="{
      cell: true,
      'cell-visible': cell.visible && !cell.wire?.end,
      'cell-invisible': !cell.visible && !cell.wire?.end,
      'cell-end': cell.end,
    }"
    @click="(game.won) ? null : (devMode) ? setDisplayColor(cell, selectedColor) : store.clearDisplayColor(cell)">
    <span v-if="cell.end">⭕</span>
    <span v-else-if="cell.wireDirection.up && cell.wireDirection.down">↕</span>
    <span v-else-if="cell.wireDirection.left && cell.wireDirection.right">↔</span>
    <span v-else-if="cell.wireDirection.left && cell.wireDirection.up">
      <!-- ↰↖ -->
      <CornerArrow rotate="270deg" />
    </span>
    <span v-else-if="cell.wireDirection.left && cell.wireDirection.down">
      <!-- ↲↙ -->
      <CornerArrow rotate="180deg" />
    </span>
    <span v-else-if="cell.wireDirection.right && cell.wireDirection.up">
      <!-- ↱↗ -->
      <CornerArrow />
    </span>
    <span v-else-if="cell.wireDirection.right && cell.wireDirection.down">
      <!-- ↳↘ -->
      <CornerArrow rotate="90deg" />
    </span>
    <span v-else-if="cell.wireDirection.up">⬆</span>
    <span v-else-if="cell.wireDirection.down">⬇</span>
    <span v-else-if="cell.wireDirection.left">⬅</span>
    <span v-else-if="cell.wireDirection.right">➡</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import useStore from '@/store';
import CornerArrow from '@/components/CornerArrow.vue';
import winToast from '@/util/winToast';
import { storeToRefs } from 'pinia';

const store = useStore();
const { game } = storeToRefs(store);

const props = defineProps({
  cell: {
    type: Object,
    required: true,
  },
  selectedColor: {
    type: String,
    required: true,
  },
  devMode: {
    type: Boolean,
    default: false,
  },
});

function setDisplayColor(cell, color) {
  store.setDisplayColor(cell, color);
  const won = store.checkForWin();
  if (won) {
    winToast();
    game.value.won = true;
  }
}

const cellColor = computed(() => ((props.cell.visible && props.cell.displayColor) ? props.cell.displayColor : '#eee'));
const hueRotateMap = {
  red: '0deg',
  green: '120deg',
  blue: '240deg',
  yellow: '60deg',
  purple: '300deg',
  orange: '30deg',
  pink: '330deg',
};
const hueRotate = computed(() => `hue-rotate(${hueRotateMap[props.cell.wire?.color]})`);
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
