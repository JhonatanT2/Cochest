'use client'
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { getUserResults } from "../context/testResult";
import { useEffect, useState } from "react";
import UserApprovalStats from "../home/stats";

interface Test {
    id: string;
    description: string;
}
interface TestResult {
    test_id: string;
    score: number;
}
interface TestListClientProps {
    tests: Test[];
    type: string;
}
export default function TestListClient({ tests, type }: TestListClientProps) {
    const { user } = useAuth();
    
    const [userTestResults, setUserTestResults] = useState<TestResult[]>([]);
    console.log(userTestResults)
    useEffect(() => {
        const fetchUserResults = async () => {
            if (user) {
                const results = await getUserResults(user.id);
                setUserTestResults(results);
            }
        };

        fetchUserResults();
    }, [user]);
    const getUserScoreForTest = (testId: string) => {
        const result = userTestResults.find(result => result.test_id === testId);
        return result ? result.score : null;
    };
    
    return (
        <div className="">
            <div className=" p-6 bg-gray-200 shadow-md rounded-md md:flex md:justify-around">
                <section className="order-1 flex md:mt-60 mb-8">
                    <div>
                        { user ? (
                            <UserApprovalStats userId={user.id} testType={type}/>
                        ) : (
                            <></>
                        )}
                    </div>
                </section>
                <div className="md:w-2/5 min-w-64 w-auto border-2 border-primary-color p-6 rounded-lg">
                    <h1 className="text-2xl font-bold mb-4">Tests de tipo {type}</h1>
                    { user ? (
                            <></>
                        ) : (
                            <p>Registrate o inicia sesión para tener acceso a todos los test</p>                 
                        )
                    }
                    <ul className="space-y-2 ">
                        {tests.map((test, index) => (
                            <Link key={test.id} href={index > 0 && !user ? '/login' :`/examenes/${type}/${test.id}`} className="m-2">
                                <li  className="flex items-center justify-between p-4 w-auto bg-primary-color text-white rounded-md shadow-sm hover:bg-blue-800 transform transition duration-500 hover:scale-110">                      
                                    {test.description}
                                    {user && (
                                        <p className={`border-4 rounded-md p-1 ${
                                            getUserScoreForTest(test.id) === null ? 'border-gray-200' :
                                            (getUserScoreForTest(test.id) ?? 0) >= 27 ? 'border-green-400' :
                                            (getUserScoreForTest(test.id) ?? 0) >= 23 ? 'border-yellow-400' : 'border-red-600'
                                        }`}>
                                        Puntuación: {getUserScoreForTest(test.id) ? `${getUserScoreForTest(test.id)}/30` : 'Sin realizar'}
                                        </p>                                      
                                    )}                                               
                                </li>                              
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>          
        </div>
    );
}