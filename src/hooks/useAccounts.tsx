import { useQuery } from '@tanstack/react-query';
import { accountService } from '../service/accountService';

// Todas las cuentas
export function useAccounts() {
  return useQuery({
    queryKey: ['accounts'], 
    queryFn: accountService.getAccounts, 
    staleTime: 2 * 60 * 1000, // 2 minutos antes de considerar datos viejos
  });
}

//  Cuenta específica
export function useAccount(accountId: string) {
  return useQuery({
    queryKey: ['accounts', accountId], 
    queryFn: () => accountService.getAccountById(accountId),
    enabled: !!accountId, // Solo ejecuta si hay accountId
  });
}

//Transacciones por cuenta
export function useAccountTransactions(accountId: string) {
  return useQuery({
    queryKey: ["transactions", accountId],
    queryFn: () => accountService.getAccountTransactions(accountId),
    enabled: !!accountId,
    staleTime: 2 * 60 * 1000,
  });
}