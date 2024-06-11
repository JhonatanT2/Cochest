// app/examenes/[tipo]/[id]/page.tsx
import QuestionListClient from '@/app/ui/test/QuestionListClient';
import fetchQuestions from '@/app/ui/test/Questionfetch';
import ErrorRedirect from '@/app/ui/redirect/errorExamans';
// Definición de tipos para los parámetros
interface TestPageProps {
  params: {
    id: string;
  };
}

export default async function TestPage({ params }: TestPageProps) {
  try {
    const questions = await fetchQuestions(params.id);
    return (
    <div className='min-h-screen'>
      <QuestionListClient questions={questions} testId={params.id} />
    </div>
  );
  } catch (error) {
    return <ErrorRedirect />; 
  }  
}
