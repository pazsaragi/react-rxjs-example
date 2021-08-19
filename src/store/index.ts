import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./epics";
import { rootReducer } from "./reducers";
import { ServiceProvider } from "lib/service-provider";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const configureStore = (di: ServiceProvider) => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: di
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const persistConfig = {
    key: "root",
    storage
  };

  const persistentReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistentReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpic);
  const persistor = persistStore(store);
  return { store, persistor };
};
