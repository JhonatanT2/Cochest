import QuestionListClient from '@/app/ui/test/QuestionListClient';
import ErrorRedirect from '@/app/ui/redirect/errorExamans';
// Definición de tipos para los parámetros
interface TestPageProps {
  params: {
    id: string;
  };
}
export default function TestPage({ params }: TestPageProps) {
  return (
    <div className='min-h-screen'>
        <QuestionListClientWrapper testId={params.id} />
    </div>
  );
}

function QuestionListClientWrapper({ testId }: { testId: string }) {
  try {
    return <QuestionListClient testId={testId} />;
  } catch (error) {
    return <ErrorRedirect />;
  }
}
