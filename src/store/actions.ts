import type { Advert } from "../pages/adverts/types";

//primero creaos las acciones que queremos manejar

//manejamos si el usuario esta logado o no

type AuthLogin = {
  type: "auth/login";
};

type AuthLogout = {
  type: "auth/logout";
};


//manejamos la carga de anuncios

type AdvertsLoaded = {
  type: "adverts/loaded";
  payload: Advert[],
}
type AdvertsCreated = {
  type: "adverts/created",
  payload: Advert;
}

//Actions creators

export const authLogin = (): AuthLogin => ({
  type: "auth/login",
});

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

export type Actions = AuthLogin | AuthLogout | AdvertsLoaded | AdvertsCreated;




