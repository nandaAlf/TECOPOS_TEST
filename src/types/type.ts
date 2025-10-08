export type BankAccount = {
  id: string;
  accountNumber: string;
  accountType: "Ahorro" | "Corriente" | "Inversión"
  balance: number;
  currency: "MN" | "USD" | "EUR";
  status: "Activa" | "Bloqueada" | "Inactiva"
  createdAt: string
};