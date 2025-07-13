import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "@/components/app/App";
import { store } from "@/store";

import "./main.css";

const rootElem = document.getElementById("root")!;
const root = createRoot(rootElem);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
