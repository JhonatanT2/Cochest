import React from 'react';
import Image from 'next/image';

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

interface QuestionDetailsProps {
  currentQuestion: Question;
  currentQuestionIndex: number;
  selectedAnswers: (number | null)[];
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, answerIndex: number) => void;
  showResults: boolean;
  showExplanation: boolean[];
  toggleExplanation: (index: number) => void;
  testCorrected: boolean;
}

const QuestionDetails: React.FC<QuestionDetailsProps> = ({
  currentQuestion,
  currentQuestionIndex,
  selectedAnswers,
  handleCheckboxChange,
  showResults,
  showExplanation,
  toggleExplanation,
  testCorrected,
}) => {
  return (
    <div className="my-4 p-4 border rounded-lg shadow-md max-w-screen-lg mx-auto min-h-96 bg-white ">
      <h2 className="text-lg font-semibold">Pregunta {currentQuestionIndex + 1}</h2>
      <p className="mb-2">{currentQuestion.enunciado}</p>

      <div className='md:flex justify-between'>
        {currentQuestion.img && (
          <div className="relative w-full h-64 max-w-[300px]  md:order-last">
            <Image
              src={`https://api-priv.onrender.com${currentQuestion.img}`}
              alt="Imagen de la pregunta"
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
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
  );
}

export default QuestionDetails;
