<template>
  <section id="discard-pile" class="hidden flex-col w-40 md:flex">
    <div class="deck discard">
      <card v-for="card in discardPile" :key="card.id" :card="card" />
    </div>
  </section>
</template>

<script setup>
import { computed, onUpdated } from "vue";
import { useStore } from "vuex";
import Card from "./Card.vue";

const store = useStore();
const discardPile = computed(() => {
  return store.getters.getDiscardPile;
});

onUpdated(() => {
  const cards = document.querySelectorAll(".discard .card");
  cards.forEach((card, index) => {
    card.style.top = `${index * 1}px`;
  });
});
</script>

<style></style>
