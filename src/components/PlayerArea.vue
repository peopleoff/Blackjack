<template>
  <div class="player flex items-start justify-center flex-grow">
    <transition-group
      name="list"
      tag="div"
      class="cards flex gap-3 relative"
      :class="{ 'player-doubled': playerDoubled }"
      v-if="playerCards"
      appear
    >
      <card
        v-for="card in playerCards"
        :key="card.id"
        :card="card"
        :inPlay="true"
      />
    </transition-group>
    <span
      v-if="playerValue"
      class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800"
    >
      {{ playerValue }} Player
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import card from "../components/Card.vue";

const store = useStore();

const playerCards = computed(() => {
  return store.getters.getPlayerCards;
});
const playerValue = computed(() => {
  return store.getters.getPlayerValue;
});

const playerDoubled = computed(() => {
  return store.getters.getPlayerDoubled;
});
</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active{
  transition: all 500ms ease;
}
.list-leave-active {
  transition: all 250ms ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
