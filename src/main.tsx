import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import TransactionsMonitor from "./TransactionsMonitor.tsx";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TransactionsMonitor />
  </StrictMode>,
);
