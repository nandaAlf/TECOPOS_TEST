export type BankAccount = {
  id: string;
  accountNumber: string;
  accountType: "Ahorro" | "Corriente" | "Inversión"
  balance: number;
  currency: "CUP" | "USD" | "EUR";
  status: "Activa" | "Bloqueada" | "Inactiva"
  createdAt: string
};