import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { executeRoute, Routes, setBackendURL } from "@2tothe/shared";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

(async () => {
  setBackendURL("http://localhost:8080");
  const response = await executeRoute(Routes.HelloWorld.helloWorldRoute, {
    name: "Josephine",
  });
  console.log(response);
})();
