import { useEffect, useState } from 'react';
import { getByUserAndTestType } from '../context/testResult';

interface TestResult {
    test_id: string;
    score: number;
}
interface UserApprovalStatsProps {
    userId: string;
    testType: string;
}
export default function UserApprovalStats({ userId, testType }: UserApprovalStatsProps) {
    const [approvalRate, setApprovalRate] = useState<number | null>(null);
    const [averageCorrectAnswers, setAverageCorrectAnswers] = useState<number | null>(null);
    
    useEffect(() => {
        const calculateApprovalRate = async () => {
            try {
                const userResults: TestResult[] = await getByUserAndTestType(userId, testType);
                
                const passingScore = 27; // Define el puntaje de aprobación
                const totalTests = userResults.length;

                // Contar los tests aprobados
                const passedTests = userResults.filter(result => result.score >= passingScore).length;

                // Calcular la tasa de aprobación
                const approvalRate = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;

                // Calcular la media de preguntas correctas por test
                const totalCorrectAnswers = userResults.reduce((sum, result) => sum + result.score, 0);
                const averageCorrectAnswers = totalTests > 0 ? totalCorrectAnswers / totalTests : 0;

                setApprovalRate(approvalRate);
                setAverageCorrectAnswers(averageCorrectAnswers);

                setAverageCorrectAnswers(Math.round(averageCorrectAnswers));
            } catch (error) {
                console.error('Error al calcular la estadística de aprobación:', error);
                setApprovalRate(null);
                setAverageCorrectAnswers(null);
            }
        };
        calculateApprovalRate();
    }, [userId, testType]);

    return (
        <div className={`p-4 bg-white shadow-md rounded-md border-4 ${averageCorrectAnswers >= 0 && averageCorrectAnswers <= 22 ? 'border-red-500' : averageCorrectAnswers >= 23 && averageCorrectAnswers <= 26 ? 'border-yellow-500' : 'border-green-500'}`}>
            <h1 className="text-2xl font-bold mb-4">Tus Estadísticas de Aprobación</h1>
            {approvalRate !== null && averageCorrectAnswers !== null ?  (
                <>
                    <p className="text-lg">Tasa de aprobación: {approvalRate.toFixed(2)}%</p>
                    <p className="text-lg">Media de preguntas acertadas por test: {averageCorrectAnswers.toFixed(0)}</p>
                </>
            ) : (
                <p className="text-lg">Cargando estadísticas...</p>
            )}
        </div>
    );
}