<template>
  <GithubCorner />
  <main>
    <h1>Chroma Chains</h1>
    <GameBoard />
    <div class="controls">
      <DifficultySelector />
      <NewGameButton />
    </div>
  </main>
</template>

<script setup>
import GameBoard from '@/components/GameBoard.vue';
import GithubCorner from '@/components/GithubCorner.vue';
import DifficultySelector from '@/components/DifficultySelector.vue';
import NewGameButton from '@/components/NewGameButton.vue';
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
