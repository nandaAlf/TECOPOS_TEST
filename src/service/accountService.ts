import type { BankAccount } from "../types/type";
import { api } from "./api";

export const accountService = {
  
  // Obtener todas las cuentas
  getAccounts: async (): Promise<BankAccount[]> => {
    const response = await api.get('/account');
    return response.data;
  },

  // Obtener cuenta por ID
  getAccountById: async (id: string): Promise<BankAccount> => {
    const response = await api.get(`/account/${id}`);
    return response.data;
  },

};