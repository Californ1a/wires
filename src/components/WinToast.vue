<template>
  <div class="container">
    <div class="inner-container">
      <h1>You won!</h1>
      <p>Would you like to play again?</p>
    </div>
    <button type="button" class="action" @click.stop="$emit('close-toast')">
      New Game
    </button>
  </div>
</template>

<script setup>

</script>

<style scoped>
h1 {
  margin-top: 0;
}

.container {
  /* width: 20vw; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;
}

.action {
  /* height: 40px; */
  padding: 10px 9px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  border: thin solid currentColor;
  background-color: #ffffff22;
  font-weight: bold;
  font-size: 1rem;
}

.action:hover {
  background-color: #ffffff44;
}
</style>
