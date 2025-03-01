import { applyMiddleware, combineReducers, createStore } from "redux";
import *as reducers  from "./reducers";
import { useDispatch, useSelector } from "react-redux";
import type { State } from './reducers'
import { composeWithDevTools } from "@redux-devtools/extension"
import * as thunk from "redux-thunk"
import type { Actions } from "./actions";

//vamos a crear el store

export default function configureStore(preloadedState: Partial<State>) {
  const rootReducer = combineReducers(reducers);
  const store = createStore(
    rootReducer,
    preloadedState as never,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument<State, Actions>())), //aplicamos el middleware de redux-thunk
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

export type AppThunk<ReturnType = void> = thunk.ThunkAction<ReturnType, RootState, undefined, Actions>;



