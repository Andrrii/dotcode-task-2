import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import TransactionsMonitor from "./components/TransactionsMonitor/TransactionsMonitor.tsx";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TransactionsMonitor />
  </StrictMode>,
);
