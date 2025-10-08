import { useParams, Link } from "react-router-dom";
import { useAccount, useAccountTransactions } from "../hooks/useAccounts";
import { TransactionRow } from "../components/TransactionRow";
import { useState } from "react";
import type { BankAccount, Transaction } from "../types/type";
import { TransactionForm } from "../components/form/TransactionForm";

export function AccountDetailsPage() {
  const { id: accountId } = useParams();
  const [showForm, setShowForm] = useState(false);

  const { data: account, isLoading: accountLoading,  refetch: refetchAccount  } = useAccount(accountId!);
  const { data: transactions, isLoading: transactionsLoading,  refetch: refetchTransactions  } = useAccountTransactions(accountId!);

  if (!accountId) {
    return <div className="p-4 text-red-600">ID de cuenta no válido</div>;
  }
  const handleTransactionSuccess = () => {
    setShowForm(false);
    refetchAccount();
    refetchTransactions();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 min-w-full">
      <Link
        to="/accounts"
        className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6"
      >
        ← Volver a Cuentas
      </Link>

      {accountLoading ? (
        <AccountSkeleton />
      ) : !account ? (
        <div className="p-4 border border-red-200 rounded-lg bg-red-50 text-red-700">
          Cuenta no encontrada
        </div>
      ) : (
        <AccountInfo account={account} />
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Operaciones</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          + Nueva Operación
        </button>
      </div>

      {/* Formulario */}

      {showForm && account && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-5- flex items-center justify-center p-4 z-50">
          <TransactionForm
            accountId={account.id}
            currency={account.currency}
            accountNumber={account.accountNumber}
            onSuccess={handleTransactionSuccess}
            onCancel={() => setShowForm(false)}
            balance={account.balance}
          />
        </div>
      )}

      {/* Lista de Transacciones */}
      <TransactionList
        transactions={transactions}
        loading={transactionsLoading}
      />
    </div>
  );
}

function AccountInfo({ account }: { account: BankAccount }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {account.accountType}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{account.accountNumber}</p>
        </div>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          {account.status}
        </span>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <p className="text-blue-700 text-sm mb-1">Saldo Disponible</p>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold text-gray-900">
            ${account.balance.toLocaleString()}
          </p>
          <span className="bg-white text-blue-600 px-2 py-1 rounded text-sm border">
            {account.currency}
          </span>
        </div>
      </div>
    </div>
  );
}

function TransactionList({
  transactions,
  loading,
}: {
  transactions?: Transaction[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <TransactionSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-200">
        No hay operaciones registradas aún.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <TransactionRow key={tx.id} transaction={tx} />
      ))}
    </div>
  );
}
function AccountSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="h-7 w-48 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
      </div>
      <div className="mb-4">
        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
        <div className="h-8 w-32 bg-gray-200 rounded" />
      </div>
      <div className="flex gap-8">
        <div>
          <div className="h-4 w-16 bg-gray-200 rounded mb-1" />
          <div className="h-5 w-24 bg-gray-200 rounded" />
        </div>
        <div>
          <div className="h-4 w-20 bg-gray-200 rounded mb-1" />
          <div className="h-5 w-28 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

function TransactionSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 animate-pulse">
      <div className="flex items-center gap-4 flex-1">
        <div className="w-10 h-10 bg-gray-200 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-48 bg-gray-200 rounded" />
          <div className="flex gap-3">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
      <div className="h-6 w-24 bg-gray-200 rounded" />
    </div>
  );
}
