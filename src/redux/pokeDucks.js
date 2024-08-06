import axios from 'axios'

// constantes
const dataInicial = {
    array : [],
    offset: 0
};

//types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO';
const OBTENER_POKEMONES_SIGUIENTE_EXITO = 'OBTENER_POKEMONES_SIGUIENTE_EXITO';

// reducer
export default function pokeReducer(state = dataInicial, action) {
    switch(action.type) {
        case OBTENER_POKEMONES_EXITO:
            return {...state, array: action.payload}
        case OBTENER_POKEMONES_SIGUIENTE_EXITO:
                return {...state, array: action.payload.array, offset: action.payload.offset}
        default:
            return state
    };
};

// acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
    const {offset} = getState().pokemones;

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data.results
        });
    }
    catch (error) {
        console.log(error);
    }
};

export const siguientePokemonesAccion = (numero) => async (dispatch, getState) => {
    const {offset} = getState().pokemones;
    const siguiente = offset + numero;

    console.log('siguiente: ', siguiente);

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20`);
        dispatch({
            type: OBTENER_POKEMONES_SIGUIENTE_EXITO,
            payload: {
                array: res.data.results,
                offset: siguiente
            }
        });
    }
    catch (error) {
        console.log(error);
    }
};