<template>
  <div class="radio-btns">
    <RadioButton
      v-for="difficulty in difficulties"
      :key="difficulty"
      :id="difficulty"
      :value="difficulty"
      :label="capitalize(difficulty)"
      @click="store.setDifficulty" />
  </div>
</template>

<script setup>
import useStore from '@/store';
import RadioButton from '@/components/RadioButton.vue';

const store = useStore();
const difficulties = ['easy', 'medium', 'hard'];

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
</script>

<style scoped>
.radio-btns {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
</style>
