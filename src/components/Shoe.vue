<template>
  <section id="shoe" class="hidden flex-col w-40 md:flex">
    <div class="deck shoe">
      <card v-for="card in shoe" :key="card.id" :card="card" />
    </div>
    <div>
      {{ shoe.length }}
    </div>
  </section>
</template>

<script setup>
import { computed, onUpdated } from "vue";
import { useStore } from "vuex";
import Card from "./Card.vue";

const store = useStore();
const shoe = computed(() => {
  return store.getters.getshoe;
});
const cutCardIndex = computed(() => {
  return store.getters.getCutCard;
});


onUpdated(() => {
  const cards = document.querySelectorAll(".shoe .card");
  //The index of the cut card is towards the end of the shoe, when rendered that puts it at the bottom of the deck.
  //Subtract the legnth of the cards minus the cut card Index to find the reverse position.
  // const cutCard = cards[cards.length - cutCardIndex.value];
  cards.forEach((card, index) => {
    card.style.top = `${index * 1.5}px`;
  });
  // cutCard.style.background = "red";
});
</script>

<style></style>
