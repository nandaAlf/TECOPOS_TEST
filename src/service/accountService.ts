import type { BankAccount, Transaction } from "../types/type";
import { api } from "./api";

export const accountService = {
  // Obtener todas las cuentas
  getAccounts: async (): Promise<BankAccount[]> => {
    const response = await api.get("/account");
    return response.data;
  },

  // Obtener cuenta por ID
  getAccountById: async (id: string): Promise<BankAccount> => {
    const response = await api.get(`/account/${id}`);
    console.log("response",response)
    return response.data;
  },

  // Obtener transacciones de una cuenta por ID
  getAccountTransactions: async (accountId: string): Promise<Transaction[]> => {
    const response = await api.get(`/transactions`, {
      params: { accountId }, 
    });
    return response.data;
  },
  // Obtener transacciones de una cuenta por ID
  createTransaction: async (transactionData: Omit<Transaction, 'id' | 'date' | 'status' | 'reference'>): Promise<Transaction> => {
    const newTransaction = {
      ...transactionData,
      date: new Date().toISOString(),
      status: 'Completada',
      reference: `REF-${Date.now()}`
    };

    const response = await api.post('/transactions', newTransaction);
    console.log("resp post",response)
    return response.data;
  },
};
