import { useQuery } from '@tanstack/react-query';
import { accountService } from '../service/accountService';




// Hook para obtener todas las cuentas
export function useAccounts() {
  return useQuery({
    queryKey: ['accounts'], // Key única para el cache
    queryFn: accountService.getAccounts, // Función que trae los datos
    staleTime: 2 * 60 * 1000, // 2 minutos antes de considerar datos "viejos"
  });
}

// Hook para obtener cuenta específica
export function useAccount(accountId: string) {
  return useQuery({
    queryKey: ['accounts', accountId], // Cache por cuenta individual
    queryFn: () => accountService.getAccountById(accountId),
    enabled: !!accountId, // Solo ejecuta si hay accountId
  });
}
