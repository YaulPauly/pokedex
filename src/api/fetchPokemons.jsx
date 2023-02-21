export async function fetchPokemons(){
    const response = await fetch(
        "https://pokeapi.co/api/v2/pokedex/2"
    )

    if(!response.ok) {
        throw new Error("Failed to fetch pokemons")
    }

    const results = await response.json()

    const pokemons = results.pokemon_entries.map( (pokemon, key) => {
        return {
            key: pokemon.key,
            id: pokemon.entry_number,
            name: pokemon.pokemon_species.name,
            imgSrc: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.entry_number}.png`
        }
    });


    const uniquePokemons = pokemons.filter(
        (pokemon, index) => 
        pokemons.findIndex(other => other.id === pokemon.id) === index
    );
    return uniquePokemons;
}