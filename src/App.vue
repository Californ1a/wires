<template>
  <GithubCorner />
  <main>
    <GameBoard :selectedColor="color" @changeColor="setColor" :devMode="devMode" />
    <div class="buttons" v-if="devMode">
      <div v-for="c in colors" :key="c">
        <input type="radio" :id="c" :value="c" v-model="color" @change="setColor" />
        <label :for="c"><span :class="c" /></label>
      </div>
    </div>
    <div class="controls">
      <div class="radio-btns">
        <div class="radio">
          <input type="radio" id="easy" value="easy" v-model="store.difficulty" @click="store.setDifficulty" />
          <label for="easy">Easy</label>
        </div>
        <div class="radio">
          <input type="radio" id="medium" value="medium" v-model="store.difficulty" @click="store.setDifficulty" />
          <label for="medium">Medium</label>
        </div>
        <div class="radio">
          <input type="radio" id="hard" value="hard" v-model="store.difficulty" @click="store.setDifficulty" />
          <label for="hard">Hard</label>
        </div>
      </div>
      <button type="button" @click="store.seedRandomBoard()">New Game</button>
    </div>
  </main>
  <div class="dev-mode" v-if="isDev">
    <input type="checkbox" id="dev-mode" v-model="devMode" />
    <label for="dev-mode">Old Version</label>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import useStore from '@/store';
import { storeToRefs } from 'pinia';
import GameBoard from '@/components/GameBoard.vue';
import GithubCorner from '@/components/GithubCorner.vue';
import { isDev } from '@/util/env';

const store = useStore();
const { game } = storeToRefs(store);

const colors = ref([]);
const color = ref('');
const devMode = ref(false);

watch(devMode, () => {
  store.setDev(devMode.value);
});

function setColor(event) {
  color.value = event?.target?.value ?? event;
}
onMounted(() => {
  colors.value = game.value.wireColors;
  // eslint-disable-next-line prefer-destructuring
  color.value = game.value.wireColors[0];
});
</script>

<style scoped>
main {
  background: #333;
  height: 100%;
  color: #eee;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.buttons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}

.buttons input[type="radio"] {
  display: none;
}

.buttons input[type="radio"]:checked+label span {
  transform: scale(1.5);
  border: 2px solid #888;
}

.buttons label:hover span {
  transform: scale(1.5);
}

.buttons label span {
  display: block;
  width: 100%;
  height: 100%;
  transition: transform .2s ease-in-out;
}

.buttons label span.red {
  background: red;
}

.buttons label span.orange {
  background: orange;
}

.buttons label span.yellow {
  background: yellow;
}

.buttons label span.olive {
  background: olive;
}

.buttons label span.green {
  background: green;
}

.buttons label span.teal {
  background: teal;
}

.buttons label span.blue {
  background: blue;
}

.buttons label span.violet {
  background: violet;
}

.buttons label span.purple {
  background: purple;
}

.buttons label span.pink {
  background: pink;
}

.buttons label span.brown {
  background: brown;
}

.buttons label span.grey {
  background: grey;
}

.buttons label span.black {
  background: black;
}

.buttons label span.white {
  background: white;
}

.buttons label span.lightblue {
  background: lightblue;
}

.buttons label {
  display: inline-block;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  cursor: pointer;
}

.dev-mode {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 1rem;
  background: #333;
  color: #eee;
  font-family: sans-serif;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}

.controls .radio-btns {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
</style>
