import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonsOptions = ref<Pokemon[]>([]);
  const isLoading = computed(() => pokemons.value.length === 0);

  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonsOptions.value.length);
    return pokemonsOptions.value[randomIndex];
  });

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

    const pokemonArray = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts.at(-2) ?? 0;
      return {
        //id: urlParts[urlParts.length - 2],
        id: +id,
        name: pokemon.name,
      };
    });

    return pokemonArray.sort(() => Math.random() - 0.5);
  };

  const getNextRound = (howMany = 4) => {
    gameStatus.value = GameStatus.Playing;
    // Guardamos los 4, cortamos de 0 a 4
    pokemonsOptions.value = pokemons.value.slice(0, howMany);
    // Guardamos todos menos los 4 que ya guardamos, cortamos de 4 para arriba
    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id === id;

    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });
      return;
    }
    gameStatus.value = GameStatus.Lost;
  };

  onMounted(async () => {
    //await new Promise((r) => setTimeout(r, 1000));
    pokemons.value = await getPokemons();
    getNextRound();
    console.log(pokemonsOptions.value);
  });

  return {
    gameStatus,
    isLoading,
    pokemonsOptions,
    randomPokemon,
    // Methods
    getNextRound,
    checkAnswer,
  };
};
