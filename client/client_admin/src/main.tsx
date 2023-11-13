import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { queryClient } from "./lib/react-query.ts";
import "./locale/i18n";
import Routes from "./routes/index.tsx";
import { theme } from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={theme}
          locale={viVN}
          pagination={{
            showSizeChanger: true,
          }}>
          <Routes />
        </ConfigProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);

if (import.meta.hot) {
  import.meta.hot.accept(["./locale/i18n"], () => {});
}
