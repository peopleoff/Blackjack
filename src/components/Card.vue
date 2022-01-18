<template>
  <div
    class="card bg-white drop-shadow-xl rounded-xl h-42 w-28 md:h-56 md:w-40"
    :class="{ back: !inPlay }"
  >
    <div class="card-topleft">
      <div class="card-corner-rank">{{ card.value }}</div>
      <div :class="'card-corner-suit card--' + card.suit">
        <div class="card__symbol"></div>
      </div>
    </div>
    <div class="card-center text-4xl font-bold">
      {{ card.value }}
    </div>
    <div class="card-bottomright">
      <div class="card-corner-rank">{{ card.value }}</div>
      <div :class="'card-corner-suit card--' + card.suit">
        <div class="card__symbol"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  card: Object,
  inPlay: {
    type: Boolean,
    default: false,
  },
});
</script>
