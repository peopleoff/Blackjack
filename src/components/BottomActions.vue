<template>
  <section id="actions" class="flex justify-around p-6">
    <button
      v-if="gameState == 'playing'"
      id="stand"
      type="button"
      class="
        inline-flex
        items-center
        px-6
        py-3
        border border-transparent
        shadow-sm
        text-base
        font-medium
        rounded-md
        text-white
        bg-indigo-600
        hover:bg-indigo-700
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-indigo-500
      "
      @click="playerAction('stand')"
    >
      <HandIcon class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
      Stand
    </button>
    <button
      v-if="gameState == 'playing'"
      id="double"
      type="button"
      class="
        inline-flex
        items-center
        px-6
        py-3
        border border-transparent
        shadow-sm
        text-base
        font-medium
        rounded-md
        text-white
        bg-indigo-600
        hover:bg-indigo-700
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-indigo-500
      "
      @click="playerAction('double')"
    >
      <MailIcon class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
      Double
    </button>
    <button
      v-if="gameState == 'playing'"
      id="hit"
      type="button"
      class="
        inline-flex
        items-center
        px-6
        py-3
        border border-transparent
        shadow-sm
        text-base
        font-medium
        rounded-md
        text-white
        bg-indigo-600
        hover:bg-indigo-700
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-indigo-500
      "
      @click="playerAction('hit')"
    >
      <DocumentAddIcon class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
      Hit
    </button>
    <button
      v-if="gameState == 'notStarted'"
      type="button"
      class="
        inline-flex
        items-center
        px-6
        py-3
        border border-transparent
        shadow-sm
        text-base
        font-medium
        rounded-md
        text-white
        bg-indigo-600
        hover:bg-indigo-700
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-indigo-500
      "
      @click="startRound"
    >
      <MailIcon class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
      Deal
    </button>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { MailIcon, HandIcon, DocumentAddIcon } from "@heroicons/vue/outline";

const store = useStore();

const gameState = computed(() => {
  return store.getters.getGameState;
});

function startRound() {
  store.dispatch("startRound");
}
function playerAction(action) {
  store.dispatch("playerAction", action);
}
</script>

<style></style>
