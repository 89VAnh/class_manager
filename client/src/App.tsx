import { ConfigProvider } from "antd";
import Routes from "./routes/index.tsx";
import { theme } from "./theme.ts";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Routes />
    </ConfigProvider>
  );
}

export default App;
