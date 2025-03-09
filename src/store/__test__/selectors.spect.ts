import { describe, test, expect } from "vitest";
import { getAdvertSelector } from "../selectors";
import type { Advert } from "@/pages/adverts/types";
import type { RootState } from "..";

describe("getAdvertSelector", () => {
  // Definir los datos comunes fuera de los tests para reutilizarlos
  const advert: Advert = {
    id: "1",
    name: "Advert 1",
    sale: true,
    price: 10,
    tags: ["lifestyle"],
    photo: "photo",
  };

  const state: RootState = {
    adverts: [advert],
    auth: false,
    tags: [],
    ui: {
      pending: false,
      error: null,
    },
  };

  test("should return a advert with id 1", () => {
    const result = getAdvertSelector(state, "1");
    expect(result).toBe(advert);
  });

  test("should return undefined when advert with id 2 does not exist", () => {
    const result = getAdvertSelector(state, "2");
    expect(result).toBeUndefined();
  });
});
