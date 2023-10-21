<template>
  <GithubCorner />
  <main>
    <GameBoard :selectedColor="color" @changeColor="setColor" />
    <!-- <div class="buttons">
      <div v-for="c in colors" :key="c">
        <input type="radio" :id="c" :value="c" v-model="color" @change="setColor" />
        <label :for="c"><span :class="c" /></label>
      </div>
    </div> -->
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useStore from '@/store';
import { storeToRefs } from 'pinia';
import GameBoard from '@/components/GameBoard.vue';
import GithubCorner from '@/components/GithubCorner.vue';

const store = useStore();
const { game } = storeToRefs(store);

const colors = ref([]);
const color = ref('');

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

input[type="radio"] {
  display: none;
}

input[type="radio"]:checked+label span {
  transform: scale(1.5);
  border: 2px solid #888;
}

label:hover span {
  transform: scale(1.5);
}

label span {
  display: block;
  width: 100%;
  height: 100%;
  transition: transform .2s ease-in-out;
}

label span.red {
  background: red;
}

label span.orange {
  background: orange;
}

label span.yellow {
  background: yellow;
}

label span.olive {
  background: olive;
}

label span.green {
  background: green;
}

label span.teal {
  background: teal;
}

label span.blue {
  background: blue;
}

label span.violet {
  background: violet;
}

label span.purple {
  background: purple;
}

label span.pink {
  background: pink;
}

label span.brown {
  background: brown;
}

label span.grey {
  background: grey;
}

label span.black {
  background: black;
}

label span.white {
  background: white;
}

label span.lightblue {
  background: lightblue;
}

label {
  display: inline-block;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  cursor: pointer;
}
</style>
