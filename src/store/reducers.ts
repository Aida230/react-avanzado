import type { Advert, Tags } from "../pages/adverts/types"
import type { Actions } from "./actions";

//en los reducer lo primero que hacemos es definir el estado, el objeto con la forma de mi estado
export type State = {
  auth: boolean;
  adverts: Advert[];
  tags: Tags,
  ui: {
    pending: boolean,
    error: Error | null
  }
};

//cuando inicialicemos el estado vamos a estar sin autenticar y no vamos a tener anuncios
const defaultState: State = {
  auth: false,
  adverts: [],
  tags: [] as Tags,
  ui: {
    pending: false,
    error: null
  }
};



export function auth(state = defaultState.auth, action: Actions): State["auth"] {
  switch (action.type) {
    case "auth/login/fulfilled":
      return true;
    case "auth/logout":  //solamente devolvemos la parte del booleano
      return false;
    default:
      return state;
  }
}

//reducer para el listado de anuncios
export function adverts(state = defaultState.adverts, action: Actions): State["adverts"] {
  switch (action.type) {
    case "adverts/loaded":
      return action.payload;
    case "adverts/created":
      //return state.concat(action.payload)
      return [ ...state, action.payload ];
    case "advert/detail":
      return [ ...state, action.payload]; //detalle del anuncio
    case "adverts/deleted":
      return state.filter(advert => (advert.id )!== action.payload);
    default:
      return state
  }
};


// Reducer para manejar los tags
export function tags(state = defaultState.tags, action: Actions): State["tags"] {
  switch (action.type) {
    case "tags/loaded":
      return action.payload;  // Cargamos los tags
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action: Actions): State["ui"] {
  switch (action.type) {
    case "ui/reset-error":
      return { ...state, error: null }
    case "auth/login/pending":
      return { pending: true, error: null };
    case "auth/login/fulfilled":
      return { pending: false, error: null };
    case "auth/login/rejected":
      return { pending: false, error: action.payload };
      default:
        return state;
  }
}


