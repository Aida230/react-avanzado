import type { Advert } from "../pages/adverts/types"
import type { Actions } from "./actions";
//en los reducer lo primero que hacemos es definir el estado, el objeto con la forma de mi estado

export type State = {
  auth: boolean;
  adverts: Advert[];
};

//cuando inicialicemos el estado vamos a estar sin autenticar y no vamos a tener anuncios
const defaultState: State = {
  auth: false,
  adverts: [],
};



export function auth(state = defaultState.auth, action: Actions): State["auth"] {
  switch (action.type) {
    case "auth/login":
      return true;
    case "auth/logout":  //solamente devolvemos la parte del booleano
      return false;
    default:
      return state;
  }
}

export function adverts(state = defaultState.adverts, action: Actions): State["adverts"] {
  switch (action.type) {
    case "adverts/loaded":
      return action.payload;
    case "adverts/created":
      //return state.concat(action.payload)
      return [ ...state, action.payload ]
    default:
      return state
  }
}


//vamos a crear nuestro reducer

//export const reducer = combineReducers({ auth, adverts });

/*
Esto es lo mismo que el combineReducers
export function reducer(state = defaultState, action: Actions): State {
  return {
    auth: auth(state.auth, action),
    adverts: adverts(state.adverts, action),
  }
}
*/





/*
export function reducer(state = defaultState, action: Actions): State {
  switch (action.type) {
    case 'auth/login':
      return { ...state, auth: true };
      //return { adverts: state.adverts, auth: true};
    case 'auth/logout':
      return { ...state, auth: false };
    case 'adverts/loaded':
      return { ...state, adverts: action.payload };
    case 'adverts/created':
      //return { ...state, adverts: state.adverts.concat(action.payload) };
      return { ...state, adverts: [ ...state.adverts, action.payload ]} //tenemos un nuevo array que tiene los elementos que haya en el estado y le agregamos el que acabamos de crear

    default:
      return state;  //siempre tenemos que acordarnos de devolver el estado para que no sea undefined
  }
}
*/
