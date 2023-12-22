<template>
  <main class="container text-white">
    <div class="flex flex-col gap-2">
      <CardPlayers />
      <CardRound>1</CardRound>
      <CardBracket />
    </div>
    <SaveFAB />
  </main>
</template>

<script setup>
import CardBracket from "@/components/CardBracket.vue";
import CardPlayers from "@/components/CardPlayers.vue";
import CardRound from "@/components/CardRound.vue";
import SaveFAB from "@/components/SaveFAB.vue";
</script>
