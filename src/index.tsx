import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import * as serviceWorker from "./serviceWorker";
import { HttpClient } from "lib/http";
import { ServiceProvider } from "lib/service-provider";
import { ServiceContext } from "lib/service-provider-react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { TestService } from "services/test-service";
import { configureStore } from "store";
import { BrowserRouter } from "react-router-dom";

function initDependencies() {
  const http = new HttpClient();
  const testService = new TestService(http);
  const dependencies: [string, () => any][] = [
    ["http", () => http],
    ["test-service", () => testService]
  ];

  const dependencyInjection = new ServiceProvider();

  for (const [k, v] of dependencies) {
    dependencyInjection.set(k, v);
  }

  return dependencyInjection;
}

const di = initDependencies();

const { store, persistor } = configureStore(di);

const app = (
  <ServiceContext.Provider value={di}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ServiceContext.Provider>
);

ReactDOM.render(app, document.getElementById("root"));

serviceWorker.unregister();
