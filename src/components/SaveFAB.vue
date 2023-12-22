<template>
  <div class="text-white">
    <button @click="save" class="fab-button bg-tennis-secondary">
      <ion-icon name="save" style="font-size: 24px"></ion-icon>
    </button>
  </div>
</template>

<script setup>
const save = () => {
  window.alert("Pressed save");
};
</script>

<style scoped>
.fab-button {
  position: fixed;
  width: 50px;
  height: 50px;
  right: 50px;
  bottom: 50px;
  z-index: 5;
  flex-direction: center;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.1s ease-in-out;
}

.fab-button:hover {
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
}
</style>
