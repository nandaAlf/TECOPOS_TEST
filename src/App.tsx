import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AccountsPage from "./pages/Accounts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AccountDetailsPage } from "./pages/AccountDetails";
import HomePage from "./pages/Home";
import Layout from "./pages/Layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos de cache
      retry: 2, // 2 veces en caso de error, reintentar
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<HomePage />}></Route>
            {/* Rutas del dashboard con layout fijo */}
            <Route path="/accounts" element={<Layout />}>
              <Route index element={<AccountsPage />} />
              <Route path=":id" element={<AccountDetailsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </>
  );
}

export default App;
