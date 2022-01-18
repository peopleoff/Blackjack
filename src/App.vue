<template>
  <main class="container mx-auto flex flex-col h-full">
    <game-over />
    <div class="flex flex-grow h-full">
      <discard-pile />
      <play-area />
      <shoe />
    </div>
    <bottom-actions />
  </main>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import Shoe from "./components/Shoe.vue";
import DiscardPile from "./components/DiscardPile.vue";
import PlayArea from "./views/PlayArea.vue";
import BottomActions from "./components/BottomActions.vue";
import GameOver from "./components/GameOver.vue";

const store = useStore();

onMounted(() => {
  store.dispatch("initializeGame");
});
</script>

<style></style>
