import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "design-system"; // bring in shared tokens

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
