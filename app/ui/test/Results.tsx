import React from 'react';
import Link from 'next/link';

interface ResultsProps {
  testCorrected: boolean;
  correctAnswersCount: number;
  questionsLength: number;
  backPath: string;
  handleCorrectTest: () => void;
}

const Results: React.FC<ResultsProps> = ({
  testCorrected,
  correctAnswersCount,
  questionsLength,
  backPath,
  handleCorrectTest,
}) => {
  return (
    <div className="mt-4 p-4 border rounded-lg shadow-md max-w-screen-lg mx-auto bg-gray-100 text-center flex justify-between">
      {testCorrected && (
        <div className={`border-2 ${correctAnswersCount >= 27 ? 'border-green-400' : 'border-red-400'} rounded-lg`}>
          <p className="text-lg font-semibold">
            Aciertos {correctAnswersCount}/{questionsLength}.
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
          <Link href={backPath} passHref>
            <p className="px-4 py-2 bg-sky-500 text-white rounded">
              Regresar
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Results;
