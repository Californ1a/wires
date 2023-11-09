<template>
  <button type="button" class="new-game-btn" @click="store.seedRandomBoard()">New Game</button>
</template>

<script setup>
import useStore from '@/store';

const store = useStore();
</script>

<style scoped>
.new-game-btn {
  padding: 5px 20px;
  background-color: black;
  border: 1px solid #CC6600;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.new-game-btn:hover {
  background-color: #222;
}

.new-game-btn:active {
  background-color: #333;
}
</style>
