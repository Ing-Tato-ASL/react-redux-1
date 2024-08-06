import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { obtenerPokemonesAccion, siguientePokemonesAccion, anteriorPokemonesAccion } from '../redux/pokeDucks';

const Pokemones = () => {
    const dispatch = useDispatch();
    const pokemones = useSelector(store => store.pokemones.results);
    const next = useSelector(store => store.pokemones.next);
    const previous = useSelector(store => store.pokemones.previous);


    return (
        <div>
            <h1>Lista de pokemones</h1>
            <br />
            {
                pokemones.length === 0 && <button onClick={() => dispatch(obtenerPokemonesAccion())}>Get Pokemones</button>
            }
            {
                next && <button onClick={() => dispatch(siguientePokemonesAccion())}>Siguiente</button>
            }
            {
                previous && <button onClick={() => dispatch(anteriorPokemonesAccion())}>Anterior</button>
            }
            <ul>
                {
                    pokemones.map(item => (
                        <li key={item.name}>{item.name}</li>
                    ))
                }
            </ul>
        </div>
    );
}
 
export default Pokemones;