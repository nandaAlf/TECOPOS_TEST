import { Outlet } from "react-router-dom";
import { Button } from "../components/button";
import { Navigation } from "../components/Navigation";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}
