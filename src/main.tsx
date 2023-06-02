import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { initializeIcons } from "@fluentui/react";
import "./index.css";
// import MyPDFViewer from "./react-pdf.tsx";
import PsPDFViewr from "./pspdf.tsx";
// import Viewer from "./pdf-viewer.tsx";

initializeIcons();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <PsPDFViewr /> */}
    <App />
    {/* <App /> */}
  </React.StrictMode>
);
