import { createStore } from "redux";
import { reducer } from "./reducers";

//vamos a crear el store

export default function configureStore() {
  const store = createStore(reducer);
  return store;
};
  





//vamos a crear tipos
//export type AppStore = typeof store;
//export type AppGetState = AppStore["getState"];
//export type RootState = ReturnType<AppGetState>;
//export type AppDispatch = AppStore["dispatch"];



