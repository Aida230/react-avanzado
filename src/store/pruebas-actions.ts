import type { Credentials } from "@/pages/auth/types";
import type { Advert, Tags } from "../pages/adverts/types";
import { login } from "@/pages/auth/service";
import { isApiClientError } from "@/api/error";
import type { AppThunk } from ".";
import { getAdverts } from "@/pages/adverts/service";

//primero creamos las acciones que queremos manejar

//manejamos si el usuario esta logado o no

type AuthLoginPending = {
  type: "auth/login/pending",
};

type AuthLoginFulfilled = {
  type: "auth/login/fulfilled",
};

type AuthLoginRejected = {
  type: "auth/login/rejected",
  payload: Error;
};


type AuthLogout = {
  type: "auth/logout";
};

//Carga de anuncios
type AdvertsLoaded = {
  type: "adverts/loaded";
  payload: Advert[],
};

type AdvertsLoadedPending = {
  type: "adverts/loaded/pending";
  payload: [],
};

type AdvertsLoadedFulfilled = {
  type: "adverts/loaded/fulfilled";
  payload: Advert[],
};

type AdvertsLoadedRejected = {
  type: "adverts/loaded/Rejected";
  payload: Error,
};

// Creación de anuncios
type AdvertsCreated = {
  type: "adverts/created",
  payload: Advert;
};


type AdvertsCreatedPending = {
  type: "adverts/created/pending",
  payload: [];
};

type AdvertsCreatedFulfilled = {
  type: "adverts/created/fulfilled",
  payload: Advert;
};

type AdvertsCreatedRejected = {
  type: "adverts/created/rejected",
  payload: Error;
};

// Detalle de anuncio

type AdvertDetailPending = {
  type: "advert/detail/pendig";
  payload: [];
};

type AdvertDetailFulfilled = {
  type: "advert/detail/fulfilled";
  payload: Advert;
};

type AdvertDetailRejected = {
  type: "advert/detail/rejected";
  payload: Error;
};

// Borrado de anuncio

type AdvertsDeletedPending = {
  type: "adverts/deleted/pending";
  payload: ""; // ID del anuncio eliminado
};

type AdvertsDeletedFulfilled = {
  type: "adverts/deleted/fulfilled";
  payload: string; // ID del anuncio eliminado
};

type AdvertsDeletedRejected = {
  type: "adverts/deleted/rejected";
  payload: Error; // ID del anuncio eliminado
};

//Carga de Tags

type TagsLoadedPending = {
  type: "tags/loaded/pending";
  payload: []; // Lista de tags disponibles
};

type TagsLoadedFulfilled = {
  type: "tags/loaded/fulfilled";
  payload: Tags; // Lista de tags disponibles
};

type TagsLoadedRejected = {
  type: "tags/loaded/rejected";
  payload: Error; // Lista de tags disponibles
};

type UiResetError = {
  type: "ui/reset-error"
};

//Actions creators para login

export const AuthLoginPending = (): AuthLoginPending => ({
  type: "auth/login/pending",
});

export const AuthLoginFulfilled = (): AuthLoginFulfilled => ({
  type: "auth/login/fulfilled",
});

export const AuthLoginRejected = (error: Error): AuthLoginRejected => ({
  type: "auth/login/rejected",
  payload: error
});

//Middleware
export function authLogin(credentials: Credentials, remember: boolean): AppThunk<Promise<void>> {
  return async function (dispatch) {
    dispatch(AuthLoginPending());
    try {
      await login(credentials, remember);
      dispatch(AuthLoginFulfilled())
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(AuthLoginRejected(error))
      } 
    }
  }
}

// actions creators para logout

export const AuthLogout = (): AuthLogout => ({
  type: "auth/logout",
});

//Action creators para Loaded
//en este aso necesita de su payload como parametro
export const AdvertsLoaded = (adverts: Advert[]): AdvertsLoaded => ({
  type: "adverts/loaded",
  payload: adverts,
}); 


export const AdvertsLoadedPending = (): AdvertsLoadedPending => ({
  type: "adverts/loaded/pending",
  payload: [],
});

export const AdvertsLoadedFulfilled = (adverts: Advert[]): AdvertsLoadedFulfilled => ({
  type: "adverts/loaded/fulfilled",
  payload: adverts,
});

export const AdvertsLoadedRejectd = (error: Error): AdvertsLoadedRejected => ({
  type: "adverts/loaded/Rejected",
  payload: error,
});


//Action creators para Created
export const AdvertsCreated = (advert: Advert): AdvertsCreated => ({
  type: "adverts/created",
  payload: advert,
});

export const AdvertsCreatedPending = (): AdvertsCreatedPending => ({
  type: "adverts/created/pending",
  payload: [],
});

export const AdvertsCreatedFulfilled = (advert: Advert): AdvertsCreatedFulfilled => ({
  type: "adverts/created/fulfilled",
  payload: advert,
});

export const AdvertsCreatedRejected = (error: Error): AdvertsCreatedRejected => ({
  type: "adverts/created/rejected",
  payload: error,
});


//Action creators para Detail

export const AdvertDetailPending = (): AdvertDetailPending => ({
  type: "advert/detail/pendig",
  payload: [],
})

export const AdvertDetailFulfilled = (advert: Advert): AdvertDetailFulfilled => ({
  type: "advert/detail/fulfilled",
  payload: advert,
})

export const AdvertDetailRejected = (error: Error): AdvertDetailRejected => ({
  type: "advert/detail/rejected",
  payload: error,
})


//Action creators para Delete

export const AdvertsDeletedPending = (): AdvertsDeletedPending => ({
  type: "adverts/deleted/pending",
  payload: "",
});

export const AdvertsDeletedFulfilled = (advertId: string): AdvertsDeletedFulfilled => ({
  type: "adverts/deleted/fulfilled",
  payload: advertId,
});

export const AdvertsDeletedRejected = (error: Error): AdvertsDeletedRejected => ({
  type: "adverts/deleted/rejected",
  payload: error,
});


//Action creators para Tags

export const TagsLoadedPending = (): TagsLoadedPending => ({
  type: "tags/loaded/pending",
  payload: [],
});

export const TagsLoadedFulfilled = (tags: string[]): TagsLoadedFulfilled => ({
  type: "tags/loaded/fulfilled",
  payload: tags,
});

export const TagsLoadedRejected = (error: Error): TagsLoadedRejected => ({
  type: "tags/loaded/rejected",
  payload: error,
});

// Action creators para reset

export const uiResetError = (): UiResetError => ({
  type: "ui/reset-error",
});

export type Actions =
AuthLoginPending | 
AuthLoginFulfilled | 
AuthLoginRejected | 

AuthLogout | 

AdvertsLoadedPending |
AdvertsLoadedFulfilled |
AdvertsLoadedRejected |

AdvertsCreatedPending | 
AdvertsCreatedFulfilled | 
AdvertsCreatedRejected | 

AdvertDetailPending| 
AdvertDetailFulfilled| 
AdvertDetailRejected| 

AdvertsDeletedPending | 
AdvertsDeletedFulfilled | 
AdvertsDeletedRejected | 

TagsLoadedPending | 
TagsLoadedFulfilled | 
TagsLoadedRejected | 

UiResetError;





