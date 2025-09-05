import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ShoppyAPIProvider } from "./context/ShoppyAPIProvider";
import { Firebaseprovider } from "./context/FirebaseProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ShoppyAPIProvider>
        <Firebaseprovider>
          <div className="max-w-6xl m-auto">
            <Header />
            <Outlet />
          </div>
        </Firebaseprovider>
      </ShoppyAPIProvider>
    </QueryClientProvider>
  );
}

export default App;
