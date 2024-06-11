// app/ui/test/ErrorRedirect.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ErrorRedirect() {
  const router = useRouter();

  useEffect(() => {
    alert('Hubo un error al cargar las preguntas. Porfavor intenta de nuevo.');
    router.push('/examenes/B');
  }, [router]);

  return <p>Hubo un error al cargar las preguntas.</p>;
}
