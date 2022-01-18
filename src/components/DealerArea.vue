<template>
  <div class="dealer flex items-start justify-center flex-grow">
    <transition-group
      name="list"
      tag="div"
      class="cards flex gap-3"
      :class="{ showing: dealerShowing }"
      v-if="dealerCards"
    >
      <card
        v-for="card in dealerCards"
        :key="card.id"
        :card="card"
        :inPlay="true"
      />
    </transition-group>
    <span
      v-if="dealerValue"
      class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800"
    >
      {{ dealerValue }} Dealer
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import card from "../components/Card.vue";

const store = useStore();

const dealerCards = computed(() => {
  return store.getters.getDealerCards;
});

const dealerValue = computed(() => {
  return store.getters.getDealerValue;
});

const dealerShowing = computed(() => {
  return store.getters.getDealerShowing;
});
</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active {
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
