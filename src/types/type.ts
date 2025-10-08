export type BankAccount = {
  id: string;
  accountNumber: string;
  accountType: "Ahorro" | "Corriente" | "Inversión"
  balance: number;
  currency: "CUP" | "USD" | "EUR";
  status: "Activa" | "Bloqueada" | "Inactiva"
  createdAt: string
};

export interface Transaction { 
  id: string
  accountId: string
  type: "Depósito" | "Retiro" 
  amount: number
  description: string
  date: string
  status: "Completada" | "Pendiente" | "Rechazada"
  reference: string
}