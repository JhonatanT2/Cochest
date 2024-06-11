import React from 'react';

interface QuestionNavigationProps {
  currentQuestionIndex: number;
  handlePreviousQuestion: () => void;
  handleNextQuestion: () => void;
  questionsLength: number;
  selectedAnswers: (number | null)[];
  questions: { id: number; respuestas: { id: number; texto: string; correcta: boolean; }[]; }[];
  showResults: boolean;
  handleQuestionSelect: (index: number) => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  currentQuestionIndex,
  handlePreviousQuestion,
  handleNextQuestion,
  questionsLength,
  selectedAnswers,
  questions,
  showResults,
  handleQuestionSelect,
}) => {
  return (
    <>
      <div className="flex justify-around mt-4">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="hover:bg-blue-700 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
          Anterior
        </button>
        <button
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questionsLength - 1}
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
    </>
  );
}

export default QuestionNavigation;
