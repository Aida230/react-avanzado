import type { Advert } from "../pages/adverts/types";

//primero creaos las acciones que queremos manejar

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


export const uiResetError = (): UiResetError => ({
  type: "ui/reset-error",
});

export type Actions = AuthLoginPending | AuthLoginFulfilled | AuthLoginRejected | AuthLogout | AdvertsLoaded | AdvertsCreated | UiResetError;




