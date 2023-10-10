import { ConfigProvider } from "antd";
import "./App.css";
import AuthProvider from "./components/AuthProvider/AuthProvider.tsx";
import Routes from "./routes/index.tsx";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "hsl(133, 61%, 33%)",
          borderRadius: 6,

          // colorBgContainer: "#f6ffed",
        },
      }}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
