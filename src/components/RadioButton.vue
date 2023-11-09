<template>
  <div class="radio">
    <input type="radio" :id="id" :value="value" v-model="store.difficulty" @click="emitClick" />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script setup>
import useStore from '@/store';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(['click']);
const store = useStore();

const emitClick = () => {
  emit('click', props.value);
};
</script>

<style scoped>
.radio {
  position: relative;
  padding: 10px;
  margin: 10px;
}

.radio input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio label {
  padding: 10px 20px;
  background-color: #f0f0f0;
  color: black;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.radio input[type="radio"]:checked+label {
  background-color: #007BFF;
  color: white;
}

.radio label:hover {
  background-color: #ccc;
}
</style>
