import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { accountService } from "../../service/accountService";

interface TransactionFormProps {
  accountId: string;
  currency: string;
  accountNumber: string;
  balance: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TransactionForm({
  accountId,
  balance,
  currency,
  accountNumber,
  onSuccess,
  onCancel,
}: TransactionFormProps) {
  const [type, setType] = useState<"Depósito" | "Retiro">("Depósito");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    amount?: string;
    description?: string;
    destinationAccount?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (type === "Retiro" && Number(amount) > balance) {
      newErrors.amount = "Fondos insuficientes";
    }
    
    if (!amount) {
      newErrors.amount = "Monto requerido";
    } else {
      const numAmount = Number(amount);
      if (numAmount <= 0) newErrors.amount = "Monto debe ser mayor a 0";
      else if (numAmount > 1000000) newErrors.amount = "Monto máximo: $1,000,000";
    }

    if (!description) newErrors.description = "Descripción requerida";
    else if (description.length < 5) newErrors.description = "Mínimo 5 caracteres";

    if (type === "Depósito" && !destinationAccount) {
      newErrors.destinationAccount = "Cuenta destino requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);


     try {
      await accountService.createTransaction({
        accountId,
        type,
        amount: type === "Retiro" ? -Number(amount) : Number(amount),
        description,
        ...(type === "Depósito" && { destinationAccount })
      });

      onSuccess();
    } catch (error) {
      console.error("Error:", error);
      // Puedes mostrar un mensaje de error al usuario
    } finally {
      setIsLoading(false);
    }
    

  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Nueva Transacción</h2>
          <p className="text-gray-500 text-xs mt-1">Cuenta: {accountNumber}</p>
        </div>
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Formulario más compacto */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Tipo de Operación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "Depósito" | "Retiro")}
              disabled={isLoading}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
            >
              <option value="Depósito">Depósito</option>
              <option value="Retiro">Retiro</option>
            </select>
          </div>

          {/* Cuenta Destino (solo depósitos) */}
          {type === "Depósito" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cuenta Destino
              </label>
              <input
                type="text"
                placeholder="Número de cuenta"
                value={destinationAccount}
                onChange={(e) => setDestinationAccount(e.target.value)}
                disabled={isLoading}
                className={`w-full p-2 border rounded text-sm focus:ring-1 focus:ring-blue-500 ${
                  errors.destinationAccount ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.destinationAccount && (
                <p className="text-red-500 text-xs mt-1">{errors.destinationAccount}</p>
              )}
            </div>
          )}

          {/* Monto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monto ({currency})
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
              className={`w-full p-2 border rounded text-sm focus:ring-1 focus:ring-blue-500 ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              placeholder="Concepto del pago..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              rows={2}
              className={`w-full p-2 border rounded text-sm focus:ring-1 focus:ring-blue-500 resize-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
            <p className="text-gray-400 text-xs text-right mt-1">
              {description.length}/200
            </p>
          </div>

          {/* Botones más pequeños */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 py-2 px-3 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2 px-3 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                `Realizar ${type}`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}