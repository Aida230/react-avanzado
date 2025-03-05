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
  type: "adverts/created/Rejected",
  payload: Advert;
};

// Detalle de anuncio

type AdvertDetailPending = {
  type: "advert/detail";
  payload: Advert;
};

type AdvertDetailFulfilled = {
  type: "advert/detail";
  payload: Advert;
};

type AdvertDetailRejected = {
  type: "advert/detail";
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

//Action creators para Loaded

export const AdvertsLoaded = (adverts: Advert[]): AdvertsLoaded => ({
  type: "adverts/loaded",
  payload: adverts,
});

export const AdvertsLoaded = (adverts: Advert[]): AdvertsLoaded => ({
  type: "adverts/loaded",
  payload: adverts,
});

export const AdvertsLoaded = (adverts: Advert[]): AdvertsLoaded => ({
  type: "adverts/loaded",
  payload: adverts,
});

//Action creators para Loaded
//Action creators para Loaded
//Action creators para Loaded
//Action creators para Loaded