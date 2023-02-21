import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { fetchPokemons } from "../api/fetchPokemons";
import styles from "./pokemons.module.css"
import LoadingScreen from "../Components/LoadingScreen";

function Pokemons(){
    const [isLoanding, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const fetchAllPokemons = async () => {
            
            setIsLoading(true);           
            const allPokemons = await fetchPokemons();
            setPokemons(allPokemons); 
            setIsLoading(false);
        }
        fetchAllPokemons();
    },[])

    if(isLoanding || !pokemons) {
        return <LoadingScreen/>
    }

    const filteredPokemons = pokemons?.slice(0, 151).filter(pokemon => {
        return pokemon.name.toLowerCase().match(query.toLowerCase());
    });

    return (
        <>
            <Header query={query} setQuery={setQuery}/>
            <main>
                <nav className={styles.nav}>
                    {filteredPokemons?.slice(0,151).map(pokemon => (
                        <Link key={pokemon.id} className={styles.listItem} to={`/pokemons/${pokemon.name.toLowerCase()}`}>
                            <img 
                                className={styles.listItemIcon}
                                src={pokemon.imgSrc} 
                                alt={pokemon.name} />
                            <div className={styles.listItemText}>
                                <span>{pokemon.id}</span>
                                <span>{pokemon.name}</span>
                            </div>                    
                        </Link>
                    ))}
                </nav>
            </main>
            <Footer />
        </>
    )
}

export default Pokemons;