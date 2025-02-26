import { combineReducers, createStore } from "redux";
import *as reducers  from "./reducers";

//vamos a crear el store

export default function configureStore() {
  const rootReducer = combineReducers(reducers);
  const store = createStore(
    rootReducer, /* preloadedState, */
    //@ts-expect-error
    window.__REDUX_DEVTOOLS_EXTENSION__ && 
    //@ts-expect-error
      window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
  





//vamos a crear tipos
//export type AppStore = typeof store;
//export type AppGetState = AppStore["getState"];
//export type RootState = ReturnType<AppGetState>;
//export type AppDispatch = AppStore["dispatch"];



