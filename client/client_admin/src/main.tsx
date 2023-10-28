import { App, ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes/index.tsx";
import { theme } from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App>
      <ConfigProvider
        theme={theme}
        locale={viVN}
        pagination={{
          showSizeChanger: true,
        }}>
        <Routes />
      </ConfigProvider>
    </App>
  </React.StrictMode>
);
