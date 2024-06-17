"use client"
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { updateScore } from '../context/testResult';
import { useAuth } from '../context/AuthContext';
import { AutoRedirectToLogin } from '../redirect/redirection';
import Results from './Results';
import QuestionDetails from './QuestionDetails';
import QuestionNavigation from './QuestionNavigation';
import fetchQuestions from './Questionfetch';
import { QuestionLoader } from '../skeleton/question';
// Definicion de tipo para las preguntas
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
// Propiedades del componente QuestionListClient
interface QuestionListClientProps {
  //questions: Question[];
  testId: string;
}

export default function QuestionListClient({  testId }: QuestionListClientProps) {

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState<boolean[]>([]);
  const [testCorrected, setTestCorrected] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const backPath = usePathname().substring(0, 11);
  const { user } = useAuth();

  useEffect(() => {
    async function loadQuestions() {
      try {
        const questions = await fetchQuestions(testId);
        setQuestions(questions);
        setSelectedAnswers(Array(questions.length).fill(null));
        setShowExplanation(Array(questions.length).fill(false));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
    loadQuestions();
  }, [testId]);
  // Funciones para el manejo de paginacion
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
  };
  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };
  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, answerIndex: number) => {
    if (event.target.checked) {
      handleAnswerSelect(answerIndex);
    } else {
      handleAnswerSelect(0);
    }
  };
  //Funciones para actualizar resultados del user
  const handleCorrectTest = () => {
    setShowResults(true);
    setTestCorrected(true);
    const correctCount = selectedAnswers.reduce<number>((count, answerIndex, questionIndex) => {
      if (answerIndex !== null && questions[questionIndex].respuestas[answerIndex].correcta) {
        return count + 1;
      }
      return count;
    }, 0);
    if (user) {
      try {
        updateScore(user.id, testId, correctCount);
      } catch (error) {
        console.error('Error al actualizar el resultado del test:', error);
      }
    }
    setCorrectAnswersCount(correctCount);
  };
  const toggleExplanation = (index: number) => {
    const newShowExplanation = [...showExplanation];
    newShowExplanation[index] = !newShowExplanation[index];
    setShowExplanation(newShowExplanation);
  };
  if (isLoading) {
    return(
      <div>
        <QuestionLoader/>
      </div>
    ) 
  }
  // if (!questions || questions.length === 0) {
  //   return <div>No hay preguntas disponibles.</div>;
  // }
  return (
    <div>
      {user || testId === "a3dc7368-20fe-4adf-8085-ce8831e718f1" ? (
        <div className=''>
          <Results
            testCorrected={testCorrected}
            correctAnswersCount={correctAnswersCount}
            questionsLength={questions.length}
            backPath={backPath}
            handleCorrectTest={handleCorrectTest}
          />
          <QuestionDetails
            currentQuestion={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswers={selectedAnswers}
            handleCheckboxChange={handleCheckboxChange}
            showResults={showResults}
            showExplanation={showExplanation}
            toggleExplanation={toggleExplanation}
            testCorrected={testCorrected}
          />
          <QuestionNavigation
            currentQuestionIndex={currentQuestionIndex}
            handlePreviousQuestion={handlePreviousQuestion}
            handleNextQuestion={handleNextQuestion}
            questionsLength={questions.length}
            selectedAnswers={selectedAnswers}
            questions={questions}
            showResults={showResults}
            handleQuestionSelect={handleQuestionSelect}
          />
        </div>
      ) : (
        <AutoRedirectToLogin />
      )}
    </div>
  );
}