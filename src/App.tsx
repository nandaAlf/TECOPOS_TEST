import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AccountsPage from "./pages/accounts";
import AccountDetailsPage from "./pages/AccountDetails";
import DashboardLayout from "./pages/dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Rutas del dashboard con layout fijo */}
          <Route path="/accounts" element={<DashboardLayout />}>
            <Route index element={<AccountsPage />} />
            <Route path=":id" element={<AccountDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
