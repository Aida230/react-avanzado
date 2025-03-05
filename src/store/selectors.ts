import type { RootState } from ".";

//selector el login
export const getIsLogged = (state: RootState) => state.auth;

//selector para obtener anuncios
export const getAdvertsSelector = (state: RootState) => state.adverts;

//selector para sacar un anuncio especifico del almacen de redux
export const getAdvertSelector = (state: RootState, advertId?: string) => 
  state.adverts.find((advert) => Number(advert.id) === Number(advertId));


export const getUi = (state: RootState) => state.ui;