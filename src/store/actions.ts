import type { Credentials } from "@/pages/auth/types";
import type { Advert, Tags } from "../pages/adverts/types";
import { login } from "@/pages/auth/service";
import { isApiClientError } from "@/api/error";
//import type { ThunkAction } from "redux-thunk";
import type { AppThunk } from ".";
import { getAdverts } from "@/pages/adverts/service";
//import { getAdvertsSelector } from "./selectors";

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


type AdvertsCreated = {
  type: "adverts/created",
  payload: Advert;
};

type AdvertDetail = {
  type: "advert/detail";
  payload: Advert;
};

type AdvertsDeleted = {
  type: "adverts/deleted";
  payload: string; // ID del anuncio eliminado
};

type TagsLoaded = {
  type: "tags/loaded";
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

export const AdvertsCreated = (advert: Advert): AdvertsCreated => ({
  type: "adverts/created",
  payload: advert,
});

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
AdvertsCreated | 
AdvertDetail| 
AdvertsDeleted | 
TagsLoaded | 
UiResetError;




