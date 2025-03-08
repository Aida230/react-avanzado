import type { Credentials } from "@/pages/auth/types";
import type { Advert, Tags } from "../pages/adverts/types";
import { login } from "@/pages/auth/service";
import { isApiClientError } from "@/api/error";
import type { AppThunk } from ".";
import { createAdvert, deleteAdvert, getAdvert, getAdverts, getTags } from "@/pages/adverts/service";


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

type AdvertDetailPending = {
  type: "advert/detail/pending";
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

//Eliminacion de anuncios

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

//Carga de tags

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

export const AdvertDetailPending = (): AdvertDetailPending => ({
  type: "advert/detail/pending",
  payload: [],
});

export const AdvertDetailFulfilled = (advert: Advert): AdvertDetailFulfilled => ({
  type: "advert/detail/fulfilled",
  payload: advert,
});

export const AdvertDetailRejected = (error: Error): AdvertDetailRejected => ({
  type: "advert/detail/rejected",
  payload: error,
});

//Middleware detalle de anuncio

export function advertDetail(advertId: string): AppThunk<Promise<void>> {
  return async function (dispatch) {
    dispatch(AdvertDetailPending());
    try {
      const advert = await getAdvert(advertId);
      dispatch(AdvertDetailFulfilled(advert));
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(AdvertDetailRejected(error));
      }
    }
  }
}


//Actions creators para eliminar anuncios

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

//Middleware para eliminar anuncios

export function advertsDelete(advertId: string): AppThunk<Promise<void>> {
  return async function (dispatch) {
    dispatch(AdvertsDeletedPending());
    try {
      await deleteAdvert(advertId);
      dispatch(AdvertsDeletedFulfilled(advertId));
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(AdvertsDeletedRejected(error));
      }
    }
  }
}


//Actions creators para cargar tags

export const TagsLoadedPending = ([]): TagsLoadedPending => ({
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

//Middleware para cargar tags

export function loadTagsMiddle(): AppThunk<Promise<void>> {
  return async function (dispatch) {
    dispatch(TagsLoadedPending([]));
    try {
      const tags = await getTags();
      dispatch(TagsLoadedFulfilled(tags));
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(TagsLoadedRejected(error));
      }
    }
  }
}


//Actions creators para resetear errores
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
AdvertDetailPending |
AdvertDetailFulfilled |
AdvertDetailRejected |  
AdvertsDeletedPending |
AdvertsDeletedFulfilled |
AdvertsDeletedRejected |
TagsLoadedPending | 
TagsLoadedFulfilled |
TagsLoadedRejected | 
UiResetError;




