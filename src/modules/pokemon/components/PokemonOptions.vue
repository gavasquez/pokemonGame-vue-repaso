<template>
  <section class="mt-5 flex flex-col">
    <button
      @click="$emit('selectedOptions', id)"
      v-for="{ id, name } in options"
      :key="id"
      :disabled="blockSelection"
      :class="[
        'capitalize disabled:shadow-none disabled:bg-gray-100',
        {
          correct: id === correctAnswer && blockSelection,
          incorrect: id !== correctAnswer && blockSelection,
        },
      ]"
    >
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';

interface Props {
  options: Pokemon[];
  blockSelection: boolean;
  correctAnswer: number;
}

defineProps<Props>();

defineEmits<{
  selectedOptions: [id: number];
}>();
</script>

<style scoped>
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-400;
}

.correct {
  @apply bg-blue-500 text-white;
}

.incorrect {
  @apply bg-red-300 opacity-70;
}
</style>
