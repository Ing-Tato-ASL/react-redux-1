import axios from 'axios'

// constantes
const dataInicial = {
    array : [],
    next: null,
    previous: null,
    results: [],
    offset: 0
};

//types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO';
const OBTENER_POKEMONES_SIGUIENTE_EXITO = 'OBTENER_POKEMONES_SIGUIENTE_EXITO';
const OBTENER_POKEMONES_ANTERIOR_EXITO = 'OBTENER_POKEMONES_ANTERIOR_EXITO';

// reducer
export default function pokeReducer(state = dataInicial, action) {
    switch(action.type) {
        case OBTENER_POKEMONES_EXITO:
            return {...state, ...action.payload};
        case OBTENER_POKEMONES_SIGUIENTE_EXITO:
                return {...state, ...action.payload};
        case OBTENER_POKEMONES_ANTERIOR_EXITO:
            return {...state, ...action.payload};
        default:
            return state;
    };
};

// acciones
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`);

        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        });
    }
    catch (error) {
        console.log(error);
    }
};

export const siguientePokemonesAccion = () => async (dispatch, getState) => {
    const {next} = getState().pokemones;

    try {
        const res = await axios.get(next);

        dispatch({
            type: OBTENER_POKEMONES_SIGUIENTE_EXITO,
            payload: res.data
        });
    }
    catch (error) {
        console.log(error);
    }
};

export const anteriorPokemonesAccion = () => async (dispatch, getState) => {
    const {previous} = getState().pokemones;

    try {
        const res = await axios.get(previous);

        dispatch({
            type: OBTENER_POKEMONES_SIGUIENTE_EXITO,
            payload: res.data
        });
    }
    catch (error) {
        console.log(error);
    }
};