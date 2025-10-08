import { Building2 } from "lucide-react";
import { LoginForm } from "../components/form/Login";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 h-screen  ">
      <div className="w-full max-w-md space-y-2 bg-blue-100 rounded-2xl">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center justify-center w-16 h-16  ">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold t">SafePay</h1>
          <p className="font-bold">Sistema de Gestión Bancaria</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
