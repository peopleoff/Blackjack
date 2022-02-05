<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <dl class="flex flex-col gap-2 text-center">
      <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Win Percentage
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ winPercentage }}%
        </dd>
      </div>

      <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Perfect Strategy Percentage
        </dt>
        <dd class="mt-1 text-3xl font-semibold text-gray-900">
          {{ PerfectStrategyPercentage }}%
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const winPercentage = computed(() => {
  return store.getters.getWinPercentage;
});
const PerfectStrategyPercentage = computed(() => {
  return store.getters.getPerfectStrategyPercentage;
});
</script>