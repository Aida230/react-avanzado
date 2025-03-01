// src/store/adverts/actions.ts

import type { Advert } from "../../pages/adverts/types";

// Tipos de ACCIONES

type AdvertsLoaded = {
  type: "adverts/loaded";
  payload: Advert[];
};

type AdvertsCreated = {
  type: "adverts/created";
  payload: Advert;
};

type AdvertsDeleted = {
  type: "adverts/deleted";
  payload: number; // ID del anuncio eliminado
};

type TagsLoaded = {
  type: "tags/loaded";
  payload: string[]; // Lista de tags disponibles
};

// Action creators

export const AdvertsLoaded = (adverts: Advert[]): AdvertsLoaded => ({
  type: "adverts/loaded",
  payload: adverts,
});

export const AdvertsCreated = (advert: Advert): AdvertsCreated => ({
  type: "adverts/created",
  payload: advert,
});

export const AdvertsDeleted = (advertId: number): AdvertsDeleted => ({
  type: "adverts/deleted",
  payload: advertId,
});

export const TagsLoaded = (tags: string[]): TagsLoaded => ({
  type: "tags/loaded",
  payload: tags,
});

// Exportamos las acciones como tipo
export type Actions = AdvertsLoaded | AdvertsCreated | AdvertsDeleted | TagsLoaded;


//REDUCERS

// Reducer para el detalle de un anuncio
export function advertDetail(state = defaultState.advertDetail, action: Actions): State["advertDetail"] {
  switch (action.type) {
    case "adverts/detailLoaded":
      return action.payload;
    default:
      return state;
  }
}

// Reducer para los tags
export function tags(state = defaultState.tags, action: Actions): State["tags"] {
  switch (action.type) {
    case "tags/loaded":
      return action.payload;
    default:
      return state;
  }
}

// Reducer combinado
export const reducer = {
  adverts,
  advertDetail,
  tags,
};

//SELECTORES
// Obtener el detalle de un anuncio
export const selectAdvertDetail = (state: RootState): Advert | null => state.adverts.advertDetail;

// Obtener todos los tags disponibles
export const selectTags = (state: RootState): string[] => state.adverts.tags;