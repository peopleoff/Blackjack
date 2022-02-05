<template>
  <button
    type="button"
    class="
      fixed
      bottom-10
      right-10
      inline-flex
      items-center
      p-3
      border border-transparent
      rounded-full
      shadow-sm
      text-white
      bg-indigo-600
      hover:bg-indigo-700
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
    "
  >
    <QuestionMarkCircleIcon
      class="h-6 w-6"
      aria-hidden="true"
      @click="getAdvice()"
    />
  </button>
</template>

<script setup>
import { getRecommendedAdvice } from "../js/basicStrategy";
import { QuestionMarkCircleIcon } from "@heroicons/vue/outline";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const playerCards = computed(() => {
  return store.getters.getPlayerCards;
});

const dealerCard = computed(() => {
  return store.getters.getDealerCards;
});



function getAdvice() {
  const advice = getRecommendedAdvice(playerCards.value, dealerCard.value);
  //Based on the advice animate the button
  const button = document.querySelector(`#${advice}`);
  //Remove bounce from all other buttons
  const buttons = document.querySelectorAll("#actions > button");
  buttons.forEach((element) => {
    element.classList.remove("animate-bounce");
  });
  //Add bounce to the advice button
  button.classList.add("animate-bounce");
}
</script>

<style>
</style>