import type { Advert, Tags } from "../pages/adverts/types";

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

type AdvertsLoaded = {
  type: "adverts/loaded";
  payload: Advert[],
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


// actions creators para logout

export const AuthLogout = (): AuthLogout => ({
  type: "auth/logout",
});

//en este aso necesita de su payload como parametro
export const AdvertsLoaded = (adverts: Advert[]): AdvertsLoaded => ({
  type: "adverts/loaded",
  payload: adverts,
}); 

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

export type Actions = AuthLoginPending | AuthLoginFulfilled | AuthLoginRejected | AuthLogout | AdvertsLoaded | AdvertsCreated | AdvertDetail| AdvertsDeleted | TagsLoaded | UiResetError;




