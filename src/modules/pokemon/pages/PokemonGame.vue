<template>
  <section
    v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokemons</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Quién es este Pokémon?</h1>
    <!-- <h2 class="capitalize">{{ gameStatus }}</h2> -->
    <button
      class="bg-blue-500 text-white shadow-md rounded-lg p-3 m-2 w-50"
      v-if="gameStatus !== GameStatus.Playing"
      @click="getNextRound()"
    >
      ¿Jugar de nuevo?
    </button>
    <!-- Pokemon Picture -->
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />
    <!-- Pokemon Options -->
    <PokemonOptions
      :block-selection="gameStatus !== GameStatus.Playing"
      :options="options"
      :correct-answer="randomPokemon.id"
      @selected-options="checkAnswer"
    />
  </section>
</template>

<script setup lang="ts">
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const {
  gameStatus,
  isLoading,
  randomPokemon,
  pokemonsOptions: options,
  checkAnswer,
  getNextRound,
} = usePokemonGame();

console.log(options);
</script>
