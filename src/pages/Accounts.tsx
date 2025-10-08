import { useEffect } from "react";
import { useAccounts } from "../hooks/useAccounts";

export default function AccountsPage() {
  const { data: accounts, isLoading, isError } = useAccounts();
  useEffect(() => {
    if (accounts) {
      console.log("Cuentas obtenidas:", accounts);
    }
  }, [accounts]);
  return <div className="">Cuentas</div>;
}
