import React from "react";
import { ArrowDownLeft, ArrowUpRight, DollarSign } from "lucide-react";
import type { Transaction } from "../types/type";


interface TransactionRowProps {
  transaction: Transaction;
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  const { type, amount, description, reference, date } = transaction;
  
  const isPositive = amount > 0;
  const amountColor = isPositive ? "text-green-600" : "text-gray-900";
  const amountSign = isPositive ? "+" : "-";
  
  const formattedAmount = new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(amount));

  const typeStyles = {
    "Depósito": {
      icon: <ArrowDownLeft className="w-4 h-4 text-green-600" />,
      badge: "bg-green-100 text-green-800 border border-green-200"
    },
    "Retiro": {
      icon: <ArrowUpRight className="w-4 h-4 text-red-600" />,
      badge: "bg-red-100 text-red-800 border border-red-200"
    }
  };

  const currentType = typeStyles[type] || {
    icon: <DollarSign className="w-4 h-4 text-gray-500" />,
    badge: "bg-purple-100 text-purple-800 border border-purple-200"
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100">
          {currentType.icon}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-medium text-gray-900">{description}</p>
            <span className={`px-2 py-1 text-xs rounded-full ${currentType.badge}`}>
              {type}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="font-mono text-xs">{reference}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p className={`text-lg font-bold ${amountColor}`}>
          {amountSign}{formattedAmount}
        </p>
      </div>
    </div>
  );
}