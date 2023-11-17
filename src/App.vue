<template>
  <GithubCorner />
  <main>
    <div class="header">
      <h1>Chroma Chains</h1>
      <button type="button" @click="showModal = true">Show Rules</button>
    </div>
    <GameBoard />
    <div class="controls">
      <DifficultySelector />
      <NewGameButton />
    </div>
    <RulesModal v-model:showModal="showModal" />
  </main>
</template>

<script setup>
import GameBoard from '@/components/GameBoard.vue';
import GithubCorner from '@/components/GithubCorner.vue';
import DifficultySelector from '@/components/DifficultySelector.vue';
import NewGameButton from '@/components/NewGameButton.vue';
import RulesModal from '@/components/RulesModal.vue';
import { ref } from 'vue';

const showModal = ref(false);
</script>

<style scoped>
.header {
  width: 26vw;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.padder {
  width: 123px;
}

.header button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background: #eee;
  color: #333;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-bottom: 0.5rem;
}

.header button:hover {
  background: #ddd;
}

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

h1 {
  margin-bottom: 1rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}
</style>
