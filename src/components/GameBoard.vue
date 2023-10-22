<template>
  <div class="board" ref="boardRef">
    <div v-for="(row, i) in game.board" :key="i" class="row">
      <div v-for="(cell, j) in row" :key="j">
        <GameCell
          :cell="cell"
          :selectedColor="selectedColor"
          @mousedown="(game.won) ? null
            : (devMode) ? null : startPlacing($event, cell)"
          @mouseup="(game.won) ? null
            : (devMode) ? null : stopPlacing($event, cell)"
          :devMode="devMode" />
      </div>
    </div>
  </div>
  <!-- <span>Mouse position is at: {{ x }}, {{ y }}</span> -->
</template>

<script setup>
import {
  ref,
  onBeforeMount,
  computed,
  watch,
} from 'vue';
import GameCell from '@/components/GameCell.vue';
import { storeToRefs } from 'pinia';
import useStore from '@/store';
import winToast from '@/util/winToast';

const store = useStore();
const { game } = storeToRefs(store);

const cellsPlaced = ref([]);
const boardRef = ref(null);

const props = defineProps({
  selectedColor: {
    type: String,
    required: true,
  },
  devMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['changeColor']);

const x = ref(0);
const y = ref(0);
const startingCell = ref(null);
const boardSize = computed(() => `repeat(${game.value.boardSize}, 1fr)`);

function stopPlacing(event, cell) {
  // eslint-disable-next-line no-use-before-define
  window.removeEventListener('mousemove', update);
  const sameAsStarting = cell.x === startingCell.value?.x && cell.y === startingCell.value?.y;
  if (!cell.end || cell.wire?.color !== props.selectedColor || sameAsStarting) {
    for (const c of cellsPlaced.value) {
      // eslint-disable-next-line no-continue
      c.wireDirection = {
        up: false,
        down: false,
        left: false,
        right: false,
      };
      // eslint-disable-next-line no-continue
      if (c.end) continue;
      c.displayColor = null;
      c.visible = false;
    }
    startingCell.value = null;
    cellsPlaced.value = [];
    x.value = -1;
    y.value = -1;
    return;
  }
  startingCell.value = null;
  cellsPlaced.value = [];
  x.value = -1;
  y.value = -1;
  const won = store.checkForWin();
  if (won) {
    winToast();
    game.value.won = true;
  }
}

function update(event) {
  const { clientX, clientY } = event;
  const {
    top,
    left,
    width,
    height,
  } = boardRef.value.getBoundingClientRect();
  const xa = clientX - left;
  const ya = clientY - top;
  const cellWidth = width / game.value.boardSize;
  const cellHeight = height / game.value.boardSize;
  const row = Math.floor(ya / cellHeight);
  const col = Math.floor(xa / cellWidth);
  if (row < 0 || row >= game.value.boardSize || col < 0 || col >= game.value.boardSize) {
    x.value = -1;
    y.value = -1;
    return;
  }
  x.value = row;
  y.value = col;
}

function startPlacing(event, cell) {
  if (!cell.end) return;
  startingCell.value = cell;
  emit('changeColor', cell.wire.color);
  window.addEventListener('mousemove', update);
}

function updateCell() {
  const cell = store.getCellFromCoords(x.value, y.value);
  if (!cell) return;
  // if (cell.end) return;
  // if (cell.displayColor && cell.displayColor !== props.selectedColor) return;

  // const cellAlreadyPlaced = cellsPlaced.value.some((c) => c.x === cell.x && c.y === cell.y);
  // console.log(cellsPlaced.value);
  // if (cellAlreadyPlaced) {
  //   // stop placing if we're going backwards
  //   const previous = cellsPlaced.value[cellsPlaced.value.length - 2];
  //   if (cell.x === previous?.x && cell.y === previous?.y) {
  //     stopPlacing(null, cell);
  //     return;
  //   }
  //   return;
  // }

  const previousCell = cellsPlaced.value[cellsPlaced.value.length - 1] ?? startingCell.value;
  if (previousCell) {
    // set wire direction
    if (cell.x === previousCell.x) {
      if (cell.y > previousCell.y) {
        previousCell.wireDirection.right = true;
        cell.wireDirection.left = true;
      } else {
        previousCell.wireDirection.left = true;
        cell.wireDirection.right = true;
      }
    } else if (cell.y === previousCell.y) {
      if (cell.x > previousCell.x) {
        previousCell.wireDirection.down = true;
        cell.wireDirection.up = true;
      } else {
        previousCell.wireDirection.up = true;
        cell.wireDirection.down = true;
      }
    }

    // prevent diagonal placement
    const xDiff = Math.abs(cell.x - previousCell.x);
    const yDiff = Math.abs(cell.y - previousCell.y);
    if (xDiff === 1 && yDiff === 1) {
      stopPlacing(null, cell);
      return;
    }
  }

  const sameAsStarting = cell.x === startingCell.value.x && cell.y === startingCell.value.y;
  const sameColorEnds = game.value.board.flat()
    .filter((c) => c.end && c.wire?.color === props.selectedColor);
  const otherEnd = sameColorEnds
    .filter((c) => c.x !== startingCell.value.x && c.y !== startingCell.value.y)?.[0];
  const equalsOtherEnd = otherEnd?.x === cell.x && otherEnd?.y === cell.y;
  if ((cell.displayColor && !sameAsStarting && cellsPlaced.value.length > 0 && !equalsOtherEnd)
    || (sameAsStarting && cellsPlaced.value.length > 0)) {
    stopPlacing(null, cell);
    return;
  }

  if (cell.displayColor && !equalsOtherEnd) return;

  cellsPlaced.value.push(cell);
  cell.displayColor = props.selectedColor;
  cell.visible = true;
  if (equalsOtherEnd) {
    stopPlacing(null, cell);
  }
}

watch([x, y], updateCell);

onBeforeMount(async () => {
  await store.seedTestBoard();
});
</script>

<style scoped>
.board {
  display: grid;
  grid-template-rows: v-bind('boardSize');
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 500px;
  margin: 1px;
}

.row {
  display: grid;
  grid-template-columns: v-bind('boardSize');
}
</style>
