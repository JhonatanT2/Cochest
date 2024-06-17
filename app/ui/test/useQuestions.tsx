import { useEffect, useState } from 'react';
import fetchQuestions from './Questionfetch';

interface Respuesta {
  id: number;
  texto: string;
  correcta: boolean;
}

interface Question {
  id: number;
  enunciado: string;
  img: string | null;
  explication: string;
  respuestas: Respuesta[];
}

export const useQuestions = (testId: string) => {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestionsData = async () => {
      try {
        const questions = await fetchQuestions(testId);
        console.log(testId+"AQUI");
        setQuestions(questions);
      } catch (error) {
        setError('Error fetching questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionsData();
  }, [testId]);

  return { questions, loading, error };
};
