<template>
  <section class="flex justify-around p-6">
    <button
      v-if="gameState == 'playing'"
      type="button"
      class="inline-flex items-center px-4 py-2 border border-transparent text-4xl font-medium rounded-md shadow-xl text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      @click="playerStand"
    >
      Stand
    </button>
    <button
      v-if="gameState == 'playing'"
      type="button"
      class="inline-flex items-center px-4 py-2 border border-transparent text-4xl font-medium rounded-md shadow-xl text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-300"
      @click="playerHit"
    >
      Hit
    </button>
    <button
      v-if="gameState == 'playing'"
      type="button"
      class="inline-flex items-center px-4 py-2 border border-transparent text-4xl font-medium rounded-md shadow-xl text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-300"
      @click="playerDouble"
    >
      Double
    </button>

    <button
      v-if="gameState == 'notStarted'"
      type="button"
      class="inline-flex items-center px-4 py-2 border border-transparent text-4xl font-medium rounded-md shadow-xl text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300"
      @click="startRound"
    >
      Deal
    </button>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const gameState = computed(() => {
  return store.getters.getGameState;
});

function startRound() {
  store.dispatch("startRound");
}
function playerHit() {
  store.dispatch("playerHit");
}
function playerStand() {
  store.dispatch("playerStand");
}
function playerDouble() {
  store.dispatch("playerDoublesDown");
}
</script>

<style></style>
