"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { updateScore } from '../context/testResult';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { AutoRedirectToLogin } from '../redirect/redirection';

// Definición de tipo para las preguntas
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
  questions: Question[];
  testId: string;
}
export default function QuestionListClient({ questions, testId }: QuestionListClientProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState<boolean[]>(Array(questions.length).fill(false));
  const [testCorrected, setTestCorrected] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const { user } = useAuth();
  const router = useRouter();

  // Funciones de manejo de paginación
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
      handleAnswerSelect(null);
    }
  };

  const handleCorrectTest = () => {
    setShowResults(true);
    setTestCorrected(true);
    const correctCount  = selectedAnswers.reduce<number>((count, answerIndex, questionIndex) => {
      if (answerIndex !== null && questions[questionIndex].respuestas[answerIndex].correcta) {
        return count + 1;
      }
      return count;
    }, 0);
    if(user){
      try {
        updateScore(user.id,testId,correctCount);
        console.log("Actualizado")
      } catch (error) {
        console.log("NO Actualizado")
        console.error('Error al actualizar el resultado del test:', error);
      }
    } 
    setCorrectAnswersCount(correctCount);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const toggleExplanation = (index: number) => {
    const newShowExplanation = [...showExplanation];
    newShowExplanation[index] = !newShowExplanation[index];
    setShowExplanation(newShowExplanation);
  };

  if (!questions || questions.length === 0) {
    return <div>No hay preguntas disponibles.</div>;
  }

  return (
    <div>
      {user || testId === "a3dc7368-20fe-4adf-8085-ce8831e718f1" ? (
        <div>
        <div className="mt-4 p-4 border rounded-lg shadow-md max-w-screen-lg mx-auto bg-gray-100 text-center flex justify-between">
          {testCorrected && (
          <div className={`border-2 ${correctAnswersCount >= 27 ? 'border-green-400' : 'border-red-400'} rounded-lg`}>
          <p className="text-lg font-semibold">
            Aciertos {correctAnswersCount}/{questions.length}.
          </p>
          <p className={`${correctAnswersCount >= 27 ? 'text-green-500' : 'text-red-500'}`}>
            {correctAnswersCount >= 27 ? 'APROBADO✅' : 'SUSPENSO'}
          </p>
        </div>
          )}
          <div className="flex justify-center mt-4">
            {!testCorrected ? (
                <button 
                  onClick={handleCorrectTest} 
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
                >
                  Corregir Test 
                </button>
              ) : (
                <Link href={usePathname().substring(0,11)} passHref>
                <p className="px-4 py-2 bg-sky-500 text-white rounded">
                  Regresar	
                </p>
              </Link>
              )}
          </div> 
        </div>
      
      <div className="my-4 p-4 border rounded-lg shadow-md max-w-screen-lg mx-auto min-h-96 bg-white">
        <h2 className="text-lg font-semibold">Pregunta {currentQuestionIndex+1}</h2>
        <p className="mb-2">{currentQuestion.enunciado}</p>

        <div className='md:flex'>
        {currentQuestion.img && (
          <div className="relative w-full h-64 max-w-[300px] mx-auto md:order-last">
            <Image 
              src={`https://api-priv.onrender.com${currentQuestion.img}`} 
              alt="Imagen de la pregunta" 
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{objectFit:"cover"}}
              className="rounded-lg"        
            />
          </div>
        )}       
        <ul className="ml-6 mt-2 list-none">
          {currentQuestion.respuestas.map((respuesta, index) => {
            const isSelected = selectedAnswers[currentQuestionIndex] === index;
            const isCorrect = respuesta.correcta;
            const isIncorrect = !respuesta.correcta;
            const showResultClass = showResults 
              ? isCorrect ? 'bg-green-200' 
              : isSelected && isIncorrect ? 'bg-red-200' 
              : ''
              : '';
            return (          
              <li key={index} className={`my-3 md:mx-2 bg-gray-100 rounded-md hover:bg-gray-300 ${showResultClass}`} >
                <label className={`flex items-center space-x-2 p-2 `}>
                <div className="flex gap-2">
                  <input 
                    type="radio" 
                    checked={isSelected}
                    onChange={(e) => handleCheckboxChange(e, index)}
                    className="  dark:focus:ring-blue-600 bg-sky-200 w-6 h-6 border-2 border-gray-400 rounded-full  focus:ring-offset-1 "
                    disabled={testCorrected}
                  />
                  <div className="absolute w-2 h-2 rounded-full mx-auto ml-[6px] ">{index === 0 ? 'A' : index === 1 ? 'B' : index === 2 ? 'C' : ''}</div>
                </div>
                  <span>{respuesta.texto}</span>
                </label>
              </li>
            );
          })}
        </ul>
        </div>
        {showResults && (
          <button 
            onClick={() => toggleExplanation(currentQuestionIndex)}
            className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded">       
            Explicación
          </button>
        )}       
        {showResults && showExplanation[currentQuestionIndex] && (
          <div className='border-2 rounded-md border-yellow-500'>
            <p className="mt-2 text-gray-700">{currentQuestion.explication}</p>
          </div>
        )}
      </div>  
      <div className="flex justify-around mt-4">
        <button 
          onClick={handlePreviousQuestion} 
          disabled={currentQuestionIndex === 0}
          className="hover:bg-blue-700 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
          Anterior
        </button>
        <button 
          onClick={handleNextQuestion} 
          disabled={currentQuestionIndex === questions.length - 1}
          className="hover:bg-blue-700 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 ">       
          Siguiente
        </button>
      </div>     


      <div className="flex flex-wrap justify-center mt-4 space-x-2">
        {questions.map(({ respuestas }, index) => {
          const isAnswered = selectedAnswers[index] !== null;
          const isCorrectAnswer = isAnswered && questions[index].respuestas[selectedAnswers[index]!].correcta;
          const resultClass = showResults 
            ? isCorrectAnswer ? 'bg-green-500 text-white border-2 border-green-500' 
            : 'bg-red-500 text-white border-2 border-red-500'
            : '';
          const buttonClass = `hover:bg-gray-300 px-2 py-1 m-1 rounded border rounded-lg shadow-md  ${index === currentQuestionIndex ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} ${isAnswered ? resultClass : ''} ${isAnswered ? 'border-2 border-blue-500' : ''}`;
          return (
            <button
              key={index}
              onClick={() => handleQuestionSelect(index)}
              className={buttonClass}>        
              {index + 1}
            </button>
          );
        })}
      </div>
      </div>
      ) : (
        <AutoRedirectToLogin />
      )}
    </div>
  );
}