import { combineReducers, createStore } from "redux";
import *as reducers  from "./reducers";
import { useDispatch, useSelector } from "react-redux";
import type { State } from './reducers'

//vamos a crear el store

export default function configureStore(preloadedState: Partial<State>) {
  const rootReducer = combineReducers(reducers);
  const store = createStore(
    rootReducer,
    //@ts-expect-error type
    preloadedState,
    //@ts-expect-error type
    window.__REDUX_DEVTOOLS_EXTENSION__ && 
    //@ts-expect-error type
      window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
  

//vamos a crear tipos
export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type RootState = ReturnType<AppGetState>;
export type AppDispatch = AppStore["dispatch"];



//crreamos los hook y dispactch especificos para nuestra aplicacion

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();



