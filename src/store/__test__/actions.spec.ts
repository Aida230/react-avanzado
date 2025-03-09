import type { Advert } from "@/pages/adverts/types";
import { AdvertsLoadedFulfilled, authLogin, AuthLogout } from "../actions";
import type { Credentials } from "@/pages/auth/types";
import { ApiClientError } from "@/api/error";

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



//Comprobar el funcionamiento de un componente que ejecuta una acción del store, mockeando la acción
describe("authLogin", () => {
  afterEach(() => {
    dispatch.mockClear();
  });

  const credentials: Credentials = {
    email: "admin@gmail.com",
    password: "password",
  };
  const remember = false;
  const dispatch = vi.fn();
  const thunk = authLogin(credentials, remember);

  let api = {
    login: vi.fn(),
  };

  test("when login resolves", async () => {
    api.login.mockResolvedValue(undefined);
    //@ts-expect-error: getState not used
    await thunk(dispatch, undefined, { login: api.login });

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: "auth/login/pending" });
    //expect(api.login).toHaveBeenCalledWith(credentials, remember);
    //expect(dispatch).toHaveBeenNthCalledWith(2, { type: "auth/login/fulfilled" });
  });

  test("when login rejects", async () => {
    api.login.mockRejectedValue(new ApiClientError("Unauthorized"));

    //@ts-expect-error: getState not used
    await thunk(dispatch, undefined, { login: api.login });

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: "auth/login/pending" });
    //expect(api.login).toHaveBeenCalledWith(credentials, remember);
    //expect(dispatch).toHaveBeenNthCalledWith(2, { type: "auth/login/rejected", payload: new ApiClientError("Unauthorized") });
  });

});

