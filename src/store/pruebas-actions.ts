import type { Credentials } from "@/pages/auth/types";
import type { Advert, Tags } from "../pages/adverts/types";
import { login } from "@/pages/auth/service";
import { isApiClientError } from "@/api/error";
//import type { ThunkAction } from "redux-thunk";
import type { AppThunk } from ".";

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

type AdvertsLoadedPending = {
  type: "adverts/loaded/pending";
  payload: Advert[],
};

type AdvertsLoadedFulfilled = {
  type: "adverts/loaded/fulfilled";
  payload: Advert[],
};

type AdvertsLoadedRejected = {
  type: "adverts/loaded/Rejected";
  payload: Advert[],
};

// Creación de anuncios

type AdvertsCreatedPending = {
  type: "adverts/created/pending",
  payload: Advert;
};

type AdvertsCreatedFulfilled = {
  type: "adverts/created/fulfilled",
  payload: Advert;
};

type AdvertsCreatedRejected = {
  type: "adverts/created/rejected",
  payload: Advert;
};

// Detalle de anuncio

type AdvertDetailPending = {
  type: "advert/detail/pendig";
  payload: Advert;
};

type AdvertDetailFulfilled = {
  type: "advert/detail/fulfilled";
  payload: Advert;
};

type AdvertDetailRejected = {
  type: "advert/detail/rejected";
  payload: Advert;
};

// Borrado de anuncio

type AdvertsDeletedPending = {
  type: "adverts/deleted/pending";
  payload: string; // ID del anuncio eliminado
};

type AdvertsDeletedFulfilled = {
  type: "adverts/deleted/fulfilled";
  payload: string; // ID del anuncio eliminado
};

type AdvertsDeletedRejected = {
  type: "adverts/deleted/rejected";
  payload: string; // ID del anuncio eliminado
};

//Carga de Tags

type TagsLoadedPending = {
  type: "tags/loaded/pending";
  payload: Tags; // Lista de tags disponibles
};

type TagsLoadedFulfilled = {
  type: "tags/loaded/fulfilled";
  payload: Tags; // Lista de tags disponibles
};

type TagsLoadedRejected = {
  type: "tags/loaded/rejected";
  payload: Tags; // Lista de tags disponibles
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

export const AdvertsLoadedPending = (adverts: Advert[]): AdvertsLoadedPending => ({
  type: "adverts/loaded/pending",
  payload: adverts,
});

export const AdvertsLoadedFulfilled = (adverts: Advert[]): AdvertsLoadedFulfilled => ({
  type: "adverts/loaded/fulfilled",
  payload: adverts,
});

export const AdvertsLoadedRejectd = (adverts: Advert[]): AdvertsLoadedRejected => ({
  type: "adverts/loaded/Rejected",
  payload: adverts,
});


//Action creators para Created

export const AdvertsCreatedPending = (advert: Advert): AdvertsCreatedPending => ({
  type: "adverts/created/pending",
  payload: advert,
});

export const AdvertsCreatedFulfilled = (advert: Advert): AdvertsCreatedFulfilled => ({
  type: "adverts/created/fulfilled",
  payload: advert,
});

export const AdvertsCreatedRejected = (advert: Advert): AdvertsCreatedRejected => ({
  type: "adverts/created/rejected",
  payload: advert,
});


//Action creators para Detail

export const AdvertDetailPending = (advert: Advert): AdvertDetailPending => ({
  type: "advert/detail/pendig",
  payload: advert,
})

export const AdvertDetailFulfilled = (advert: Advert): AdvertDetailFulfilled => ({
  type: "advert/detail/fulfilled",
  payload: advert,
})

export const AdvertDetailRejected = (advert: Advert): AdvertDetailRejected => ({
  type: "advert/detail/rejected",
  payload: advert,
})

//Action creators para Delete

export const AdvertsDeletedPending = (advertId: string): AdvertsDeletedPending => ({
  type: "adverts/deleted/pending",
  payload: advertId,
});

export const AdvertsDeletedFulfilled = (advertId: string): AdvertsDeletedFulfilled => ({
  type: "adverts/deleted/fulfilled",
  payload: advertId,
});

export const AdvertsDeletedRejected = (advertId: string): AdvertsDeletedRejected => ({
  type: "adverts/deleted/rejected",
  payload: advertId,
});


//Action creators para Tags

export const TagsLoadedPending = (tags: string[]): TagsLoadedPending => ({
  type: "tags/loaded/pending",
  payload: tags,
});

export const TagsLoadedFulfilled = (tags: string[]): TagsLoadedFulfilled => ({
  type: "tags/loaded/fulfilled",
  payload: tags,
});

export const TagsLoadedRejected = (tags: string[]): TagsLoadedRejected => ({
  type: "tags/loaded/rejected",
  payload: tags,
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





