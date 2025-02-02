<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-show="state.isActive.value"
        class="absolute flex w-full h-screen top-0 left-0 justify-center px-8 bg-black bg-opacity-30"
        style="overflow-y: scroll"
      >
        <Transition name="modal-inner">
          <div
            v-if="state.isActive.value"
            class="p-4 bg-white text-black self-start mt-32 max-w-screen-md"
          >
            <component :is="state.content.value" @close="hide" @onClose="hide"/>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useRouter } from "vue-router";
import { modalState } from "../composables/modal";

const router = useRouter()
const state = modalState();

function show(modal) {
  state.content.value = modal;
  state.show();
}

function hide(isLoaded) {
  state.content.value = null;
  state.hide();
  if (isLoaded) {
    router.push("/game");
  }
}

defineExpose({
  show,
});
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}
.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
