// Reducer para manejar la autenticación
//export function auth(state = defaultState.auth, action: Actions): State["auth"] {
//  switch (action.type) {
//    case "auth/login/fulfilled":
//      return true;
//    case "auth/logout":
//      return false;
//    default:
//      return state;
//  }
//}



// Reducer para manejar los tags
//export function tags(state = defaultState.tags, action: Actions): State["tags"] {
//  switch (action.type) {
//    case "tags/loaded/pending":
//      return []; // Estado de carga de tags
//    case "tags/loaded/fulfilled":
//      return action.payload; // Cargar los tags con éxito
//    case "tags/loaded/rejected":
//      return []; // Si falla la carga de tags, puedes retornar un arreglo vacío
//    default:
//      return state;
//  }
//}
//






//Lista orgiginal de reducres
//reducer para el listado de anuncios
//export function adverts(state = defaultState.adverts, action: Actions): State["adverts"] {
//  switch (action.type) {
//    case "adverts/loaded/pending":
//      return []; //cargando los anuncios
//    case "adverts/loaded/fulfilled":
//      return action.payload;
//      
//    case "adverts/created/pending":
//      return [...state?? []]; 
//    case "adverts/created/fulfilled":
//      //return state.concat(action.payload)
//      return [ ...(state ?? []), action.payload ];
//      case "advert/detail/fulfilled":
//        return (state ?? []).map(ad => ad.id === action.payload.id ? action.payload : ad); //detalle del anuncio que no se duplique
//    case "adverts/deleted/fulfilled":
//      return (state ?? []).filter(advert => (advert.id )!== action.payload);
//    default:
//      return state
//  }
//};