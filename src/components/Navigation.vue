<template>
  <header class="sticky bg-tennis-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-tennis-text py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <ion-icon
            name="tennisball"
            style="font-size: 30px"
            class="text-tennis-text"
          ></ion-icon>
          <p class="text-2xl">Champagne Tennis Tournament</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <ion-icon
          name="reload-circle"
          title="Reload last opened game"
          style="font-size: 22px"
          class="text-tennis-offtext hover:text-tennis-text duration-150 cursor-pointer"
          @click="$router.push('game')"
        ></ion-icon>
        <ion-icon
          name="add-circle"
          title="Create game"
          style="font-size: 22px"
          class="text-tennis-offtext hover:text-tennis-text duration-150 cursor-pointer"
          @click="showModal(markRaw(ModalCreate))"
        ></ion-icon>
        <ion-icon
          name="arrow-redo-circle"
          title="Import game"
          style="font-size: 22px"
          class="text-tennis-offtext hover:text-tennis-text duration-150 cursor-pointer"
          @click="showModal(markRaw(ModalImport))"
        ></ion-icon>
        <ion-icon
          name="information-circle"
          title="Information"
          style="font-size: 22px"
          class="text-tennis-offtext hover:text-tennis-text duration-150 cursor-pointer"
          @click="showModal(markRaw(ModalInfo))"
        ></ion-icon>
      </div>
      <Modal ref="modal" />
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import Modal from "./Modal.vue";
import { markRaw, ref } from "vue";
import ModalInfo from "./ModalInfo.vue";
import ModalCreate from "./ModalCreate.vue";
import ModalImport from "./ModalImport.vue";

const modal = ref(null);

const showModal = (content) => {
  modal.value.show(content);
};
</script>
