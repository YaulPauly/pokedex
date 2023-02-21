import Pokemon from "../pages/Pokemon";

export async function fetchPokemon(name){
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
    );

    if(!response.ok) {
        throw new Error(`Error fetching ${name}`)
    }

    const result = await response.json();

    const skills = 
            {
            name: result.name,
            id: result.id,
            imgSrc: result.sprites.front_default,
            hp: result.stats[0].base_stat,
            attack: result.stats[1].base_stat,
            defense: result.stats[2].base_stat
        }
        return skills;
    };


