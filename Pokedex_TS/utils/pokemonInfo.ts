import {pokeApi} from "@/api";
import { FullPokemon } from "@/types";

export const getPokemonInfo = async (name:string) => {
  try {
    const { data: pokemon } = await pokeApi.get<FullPokemon>(`/pokemon/${name}`);

    return {
      name: pokemon.name,
      id: pokemon.id,
      sprites: pokemon.sprites
    }
  } catch (error) {
    return null
  }
}
