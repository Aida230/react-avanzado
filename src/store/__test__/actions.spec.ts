import { describe, test, expect } from "vitest";
import type { Advert } from "@/pages/adverts/types";
import { AdvertsLoadedFulfilled, AuthLogout } from "../actions";

//Accion sincrona

describe("AuthLogout", () => {
  test("should return an action with type 'auth/logout'", () => {
    const action = {
      type: "auth/logout",
    };
    const result = AuthLogout();
    expect(result).toEqual(action);
  });
});

//Accion asincrona

describe("AdvertsLoadedFulfilled", () => {
  test("should return an action with type 'adverts/loaded/fulfilled' action", () => {
    const adverts: Advert[] = [
      {
        id: "1",
        name: "Advert 1",
        sale: true,
        price: 10,
        tags: ["lifestyle"],
        photo: "photo",
      },
    ];
    const action = {
      type: "adverts/loaded/fulfilled",
      payload: adverts,
    };
    const result = AdvertsLoadedFulfilled(adverts);
    expect(result).toEqual(action);
  });
});

