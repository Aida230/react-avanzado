import type { Advert, Tags } from "../pages/adverts/types";
import type { Actions } from "./actions";

// Definir el estado, el objeto con la forma de mi estado
export type State = {
  auth: boolean;
  adverts: Advert[];
  tags: Tags;
  ui: {
    pending: boolean;
    error: Error | null;
  };
};

// Estado inicial
const defaultState: State = {
  auth: false,
  adverts: [],
  tags: [] as Tags,
  ui: {
    pending: false,
    error: null
  }
};

// Reducer para manejar la autenticación
export function auth(state = defaultState.auth, action: Actions): State["auth"] {
  switch (action.type) {
    case "auth/login/fulfilled":
      return true;
    case "auth/logout":
      return false;
    default:
      return state;
  }
}

// Reducer para el listado de anuncios
export function adverts(state = defaultState.adverts, action: Actions): State["adverts"] {
  switch (action.type) {
    case "adverts/loaded/pending":
      return []; // Aquí podrías manejar el estado cuando los anuncios están en proceso de carga
    case "adverts/loaded/fulfilled":
      return action.payload; // Carga de anuncios con éxito
    case "adverts/loaded/Rejected":
      return []; // Si la carga de anuncios falla, podrías retornar el estado anterior o un arreglo vacío
    case "adverts/created/pending":
      return [...state]; // Añadir lógica si se desea cambiar el estado al crear un anuncio
    case "adverts/created/fulfilled":
      return [...state, action.payload]; // Anuncio creado con éxito
    case "adverts/created/rejected":
      return state; // Si falla la creación, no se cambian los anuncios
    case "advert/detail/pendig":
      return [...state]; // Similar a un estado pendiente para los detalles
    case "advert/detail/fulfilled":
      return state.map(advert => 
        advert.id === action.payload.id ? action.payload : advert
      ); // Actualizar detalles del anuncio
    case "advert/detail/rejected":
      return state; // Si falla el detalle, no cambiar nada
    case "adverts/deleted/pending":
      return state; // Aquí podrías añadir lógica si es necesario cuando se está eliminando un anuncio
    case "adverts/deleted/fulfilled":
      return state.filter(advert => advert.id !== action.payload); // Anuncio eliminado con éxito
    case "adverts/deleted/rejected":
      return state; // Si la eliminación falla, no se cambian los anuncios
    default:
      return state;
  }
}

// Reducer para manejar los tags
export function tags(state = defaultState.tags, action: Actions): State["tags"] {
  switch (action.type) {
    case "tags/loaded/pending":
      return []; // Estado de carga de tags
    case "tags/loaded/fulfilled":
      return action.payload; // Cargar los tags con éxito
    case "tags/loaded/rejected":
      return []; // Si falla la carga de tags, puedes retornar un arreglo vacío
    default:
      return state;
  }
}

// Reducer para la UI (estado de carga y errores)
export function ui(state = defaultState.ui, action: Actions): State["ui"] {
  switch (action.type) {
    case "ui/reset-error":
      return { ...state, error: null }; // Resetear el error
    case "auth/login/pending":
      return { pending: true, error: null }; // Login en proceso
    case "auth/login/fulfilled":
      return { pending: false, error: null }; // Login exitoso
    case "auth/login/rejected":
      return { pending: false, error: action.payload }; // Error en login
    case "adverts/loaded/pending":
    case "adverts/created/pending":
    case "advert/detail/pendig":
    case "adverts/deleted/pending":
    case "tags/loaded/pending":
      return { ...state, pending: true }; // Estado pendiente de otras acciones
    case "adverts/loaded/fulfilled":
    case "adverts/created/fulfilled":
    case "advert/detail/fulfilled":
    case "adverts/deleted/fulfilled":
    case "tags/loaded/fulfilled":
      return { ...state, pending: false }; // Cambiar a estado no pendiente después de éxito
    case "adverts/loaded/Rejected":
    case "adverts/created/rejected":
    case "advert/detail/rejected":
    case "adverts/deleted/rejected":
    case "tags/loaded/rejected":
      return { ...state, pending: false, error: new Error("Error en la acción") }; // Manejo de errores
    default:
      return state;
  }
}
