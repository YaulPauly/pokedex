import styles from "./header.module.css"

function Header({query, setQuery}){
    
    return (
        <header className={styles.header}>
            <input 
                className={styles.input} 
                placeholder="Search a Pokemon" 
                type="text" 
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
        </header>
    );
};
export default Header;