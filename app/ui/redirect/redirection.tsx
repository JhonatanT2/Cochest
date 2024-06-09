import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AutoRedirectToLogin() {
    const router = useRouter();
  
    useEffect(() => {
      router.push('/login');
    }, [router]);
  
    return null; // Renderiza nada mientras se espera la redirección
}