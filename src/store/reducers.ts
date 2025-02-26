import type { Advert } from "../pages/adverts/types"
import type { Actions } from "./actions";
//en los reducer lo primero que hacemos es definir el estado, el objeto con la forma de mi estado

type State = {
  auth: boolean;
  adverts: Advert[];
};

//cuando inicialicemos el estado vamos a estar sin autenticar y no vamos a tener anuncios
const defaultState: State = {
  auth: false,
  adverts: [],
};


//vamos a crear nuestro reducer

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
