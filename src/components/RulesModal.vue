<template>
  <div class="modal" v-if="showModal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h2>Game Rules</h2>
      <p>Each color on the game board has two nodes: a start and an end. Your task is to connect each pair of same-color nodes.</p>

      <h2>Game Goal</h2>
      <p>The goal of the game is to fill the entire board with wires. Each pair of same-color nodes must be connected with a wire, and all the cells on the board must be filled.</p>

      <h2>Controls</h2>
      <p>Click on a node and drag along the board until you reach another node of the same color to create a wire. If you want to remove a wire, simply click on it and it will be removed, allowing you to re-place the wire.</p>

      <h2>Other Game Info</h2>
      <p>Remember, wires of different colors can't cross each other. Plan your moves carefully to avoid getting stuck!</p>

      <button type="button" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  showModal: Boolean,
});

const emit = defineEmits(['update:showModal']);

const closeModal = () => {
  emit('update:showModal', false);
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #000;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

button {
  color: white;
  padding: 10px 20px;
  background-color: #4CAF50;
  border: none;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
}

button:hover {
  background-color: #45a049;
}
</style>
