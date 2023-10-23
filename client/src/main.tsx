import { App, ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes/index.tsx";
import { theme } from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App>
      <ConfigProvider theme={theme}>
        <Routes />
      </ConfigProvider>
    </App>
  </React.StrictMode>
);
