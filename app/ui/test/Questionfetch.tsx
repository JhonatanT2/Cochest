'use server'
import { revalidatePath } from "next/cache";

export default  async function fetchQuestions(testId: string) {
    const response = await fetch(`https://api-priv.onrender.com/test/${testId}/preguntas`);
    if (!response.ok) {
      throw new Error('Error al obtener las preguntas del test');
    }
    revalidatePath(`/examenes/B/${testId}`)
    return response.json();
}
