import type { Credentials } from "@/pages/auth/types";
import type { Advert, Tags } from "../pages/adverts/types";
import { login } from "@/pages/auth/service";
import { isApiClientError } from "@/api/error";
import type { AppThunk } from ".";
import { createAdvert, getAdverts } from "@/pages/adverts/service";
//import { adverts } from "./reducers";

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


//manejamos la carga de anuncios

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

//Creacion de anuncios
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


//Detalle de anuncio

type AdvertDetail = {
  type: "advert/detail";
  payload: Advert;
};

//Eliminacion de anuncios

type AdvertsDeleted = {
  type: "adverts/deleted";
  payload: string; // ID del anuncio eliminado
};

//Carga de tags

type TagsLoaded = {
  type: "tags/loaded";
  payload: Tags; // Lista de tags disponibles
};

//Resetear errores

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

//Actions creators para anuncios

export const AdvertsLoadedPending = (): AdvertsLoadedPending => ({
  type: "adverts/loaded/pending",
  payload: [],
});

export const AdvertsLoadedFulfilled = (adverts: Advert[]): AdvertsLoadedFulfilled => ({
  type: "adverts/loaded/fulfilled",
  payload: adverts,
});

export const AdvertsLoadedRejected = (error: Error): AdvertsLoadedRejected => ({
  type: "adverts/loaded/Rejected",
  payload: error,
});

//Middleware

export function advertsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();
    if (state.adverts) {
      return;
    }
    dispatch(AdvertsLoadedPending());
    try {
      const adverts = await getAdverts();
      dispatch(AdvertsLoadedFulfilled(adverts));
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(AdvertsLoadedRejected(error))
      }
    }
  }
}

//Actions creators para crear anuncios

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

//Middleware

export function advertsCreate(advertContent: Pick<Advert, "tags" | "name" | "sale" | "price"> & { photo?: File }): AppThunk<Promise<void>> {
  return async function (dispatch) {
    dispatch(AdvertsCreatedPending());
    try {
      // Creamos el anuncio con los datos correctos
      const createdAdvert = await createAdvert(advertContent);
      
      // Despachamos la acción con el anuncio recién creado
      dispatch(AdvertsCreatedFulfilled(createdAdvert));

      // Recargamos la lista de anuncios para asegurarnos de que la UI esté actualizada
      const adverts = await getAdverts();
      dispatch(AdvertsLoadedFulfilled(adverts));
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(AdvertsCreatedRejected(error));
      }
    }
  };
}

//Actions creators para detalle de anuncio

export const AdvertDetail = (advert: Advert): AdvertDetail => ({
  type: "advert/detail",
  payload: advert,
})

export const AdvertsDeleted = (advertId: string): AdvertsDeleted => ({
  type: "adverts/deleted",
  payload: advertId,
});

export const TagsLoaded = (tags: string[]): TagsLoaded => ({
  type: "tags/loaded",
  payload: tags,
});

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
AdvertDetail| 
AdvertsDeleted | 
TagsLoaded | 
UiResetError;




