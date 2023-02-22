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
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const fetchAllPokemons = async () => {
            
            setIsLoading(true);           
            const allPokemons = await fetchPokemons();
            setPokemons(allPokemons); 
            setIsLoading(false);
        }
        fetchAllPokemons();
    },[])

    useEffect(() => {
        setCurrentPage(0); 
    }, [query]);

    if(isLoanding || !pokemons) {
        return <LoadingScreen/>
    }


    const filteredPokemons = () => {
        if(query.length === 0)
            return pokemons.slice(currentPage, currentPage +10)
        const filtered = pokemons.filter( pokemon => pokemon.name.includes(query))
        return filtered.slice(currentPage, currentPage+10)
    }

    const nextPage = () => {
        if(pokemons.filter( pokemon => pokemon.name.includes(query)).length > currentPage + 10)
            setCurrentPage(currentPage + 10);
    }

    const prevPage = () => {
        if(currentPage > 0)
            setCurrentPage(currentPage -10);
    }

    return (
        <>
            <Header query={query} setQuery={setQuery}/>
            <div className={styles.pagination}>
                <button
                    onClick={prevPage}
                    className={styles.paginationButton}>
                    Anterior
                </button>
                <button 
                    onClick={nextPage}
                    className={styles.paginationButton}>
                    Siguiente
                </button>
            </div>
            <main>
                <nav className={styles.nav}>
                    {filteredPokemons().map(pokemon => (
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