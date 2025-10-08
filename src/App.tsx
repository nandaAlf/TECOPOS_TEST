import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Ruta de login */}
          <Route path="/accounts" element={<DashboardPage/>} />
    
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
