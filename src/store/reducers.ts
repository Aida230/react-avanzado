import type { Advert, Tags } from "../pages/adverts/types"
import type { Actions } from "./actions";

//en los reducer lo primero que hacemos es definir el estado, el objeto con la forma de mi estado
export type State = {
  auth: boolean;
  adverts: Advert[] | null;
  tags: Tags,
  ui: {
    pending: boolean,
    error: Error | null
  }
};

//cuando inicialicemos el estado vamos a estar sin autenticar y no vamos a tener anuncios
const defaultState: State = {
  auth: false,
  adverts: null,
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
    //Carga de anuncios
    case "adverts/loaded/pending":
      return []; // Se indica que se está cargando
    case "adverts/loaded/fulfilled":
      return action.payload;
    //Creación de un anuncio
    case "adverts/created/pending":
      return [...(state ?? [])]; // Mantenemos el estado actual mientras se crea
    case "adverts/created/fulfilled":
      return [...(state ?? []), action.payload]; // Agregamos el nuevo anuncio
    case "adverts/created/rejected":
      return state; // No cambiamos el estado si falla la creación
    //Detalle de un anuncio
    case "advert/detail/pending":
      return state; // No cambiamos nada hasta que se cargue el anuncio
    case "advert/detail/fulfilled":
      return (state ?? []).map(ad =>
        ad.id === action.payload.id ? action.payload : ad
      ); // Reemplazamos el anuncio actualizado sin duplicarlo
    case "advert/detail/rejected":
      return state; // No cambiamos el estado si falla la carga del detalle
    //Eliminación de un anuncio
    case "adverts/deleted/pending":
      return state; // Mantenemos el estado actual hasta que la eliminación sea exitosa
    case "adverts/deleted/fulfilled":
      return (state ?? []).filter(advert => advert.id !== action.payload); // Eliminamos el anuncio de la lista
    case "adverts/deleted/rejected":
      return state; // No cambiamos el estado si falla la eliminación
    default:
      return state;
  }
}



// Reducer para manejar los tags
export function tags(state = defaultState.tags, action: Actions): State["tags"] {
  switch (action.type) {
    case "tags/loaded/fulfilled":
      return action.payload;  // Cargamos los tags
    default:
      return state;
  }
}
// Reducer para manejar la UI
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


