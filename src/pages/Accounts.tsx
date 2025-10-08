import { useAccounts } from "../hooks/useAccounts";
import { Button } from "../components/button";
import { Plus, CreditCard } from "lucide-react";
import { AccountCard } from "../components/AccountsCard";

export default function AccountsPage() {
  const { data: accounts, isLoading, isError } = useAccounts();

  const Header = () => (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Mis Cuentas</h2>
        <p className="text-gray-600">
          {isLoading
            ? "Cargando cuentas..."
            : `${accounts?.length || 0} cuentas`}
        </p>
      </div>

       {/*
       ************
       Hacer form  */}
      <Button className="gap-2">
        <Plus className="w-4 h-4" /> Nueva Cuenta
      </Button>
    </div>
  );

  const renderContent = () => {
    if (isLoading)
      return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => <AccountSkeleton key={i} />)}
        </div>
      );

    if (isError)
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error al cargar las cuentas
          </h3>
          <p className="text-gray-600 mb-6">
            No pudimos cargar tus cuentas. Por favor, intenta nuevamente.
          </p>
        </div>
      );

    if (!accounts?.length)
      return (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No tienes cuentas
          </h3>
          <p className="text-gray-600 mb-6 max-w-sm mx-auto">
            Crea una cuenta para empezar a gestionar tus finanzas.
          </p>
        </div>
      );

    // Carga ok
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Header />
      {renderContent()}
    </div>
  );
}

function AccountSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
      </div>
      <div className="bg-gray-100 rounded-lg p-4 border border-gray-200 mb-4">
        <div className="flex justify-between items-center">
          <div className="h-7 w-20 bg-gray-200 rounded" />
          <div className="h-6 w-12 bg-gray-200 rounded-full" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
        <div className="h-9 w-24 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}
