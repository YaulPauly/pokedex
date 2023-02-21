import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPokemon } from "../api/fetchPokemon";
import LoadingScreen from "../Components/LoadingScreen";
import PokeballImg from "../assets/pokeball.png";
import Footer from "../Components/Footer";
import styles from "./pokemon.module.css"

function Pokemon(){
    const [isLoanding, setIsLoading] = useState(false);
    const {name} = useParams();
    const navigate = useNavigate();
    const [skills, setSkills] = useState({});

    useEffect(() => {
        const getPokemon = async () => {
            setIsLoading(true); 
            const fetchedPokemon = await fetchPokemon(name)
            setSkills(fetchedPokemon);
            setIsLoading(false);
        }
        getPokemon();
    }, [name]);

    if(isLoanding || !skills) {
        return <LoadingScreen/>
    }

    return (
        <>
            <button className={styles.pokeballButton} onClick={() => navigate(-1)}>
                <img className={styles.pokeballImg} src={PokeballImg} alt="Pokeball" /> {" "}
                Go Back
            </button>

                <div className={styles.pokemon}>
                    <main className={styles.pokemonInfo}>
                        <div className={styles.pokemonTitle}>{skills.name}</div>
                        <div>Nr. {skills.id}</div>
                        <div>
                            <img 
                                className={styles.pokemonInfoImg}
                                src={skills.imgSrc}
                                alt={skills.name} 
                            />
                        </div>
                        <div>HP: {skills.hp}</div>
                        <div>Attack: {skills.attack}</div>
                        <div>Defense: {skills.defense}</div>                    
                    </main>
                </div>

            <Footer />
        </>
    )
}

export default Pokemon;