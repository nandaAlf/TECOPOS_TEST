import React from "react";
import { CreditCard, ArrowRight, Eye } from "lucide-react";
import { Button } from "./button";
import type { BankAccount } from "../types/type";
import { Link } from "react-router-dom";

interface AccountCardProps {
  account: BankAccount;
}

export const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const { status, accountType, currency, balance, accountNumber, id } = account;

  const styles = {
    status: {
      Activa: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Bloqueada: "bg-rose-50 text-rose-700 border-rose-200",
      Inactiva: "bg-slate-100 text-slate-500 border-slate-200",
    },
    type: {
      Ahorro: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Corriente: "bg-amber-50 text-amber-700 border-amber-200",
      Inversión: "bg-violet-50 text-violet-700 border-violet-200",
    },
    currency: {
      USD: "text-emerald-600 bg-emerald-50 border-emerald-200",
      EUR: "text-yellow-600 bg-yellow-50 border-yellow-200",
      CUP: "text-slate-600 bg-slate-50 border-slate-200",
    },
  };

  const statusStyle = styles.status[status];
  const typeStyle = styles.type[accountType];
  const currencyStyle = styles.currency[currency];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{accountType}</h3>
            <p className="text-sm text-gray-500 font-mono">{accountNumber}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 text-xs rounded-full border ${statusStyle}`}
        >
          {status}
        </span>
      </div>

      {/* Balance */}
      <div className="mb-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-gray-900">
              ${balance.toLocaleString()}
            </p>
            <span
              className={`px-2 py-1 text-xs rounded-full border ${currencyStyle}`}
            >
              {currency}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 text-xs rounded-full border ${typeStyle}`}>
          {accountType}
        </span>

        <Link to={`/accounts/${id}`}>
          <Button
            variant="outline"
            className="gap-2 hover:bg-blue-50 hover:text-blue-700 text-gray-600"
          >
            <Eye className="w-4 h-4" />
            Detalles
            <ArrowRight className="w-3 h-3" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
