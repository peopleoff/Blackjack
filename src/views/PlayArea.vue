<template>
  <section id="play-area" class="flex-grow w-full justify-center py-6">
    <div class="flex flex-col h-full justify-between">
      <dealer-area />
      <actions />
      <player-area />
    </div>
  </section>
</template>

<script setup>
import PlayerArea from "../components/PlayerArea.vue";
import DealerArea from "../components/DealerArea.vue";
import Actions from "../components/BottomActions.vue";
</script>

<style></style>
