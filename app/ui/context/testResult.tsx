'use server'

export async function getUserResults(userId: string){
    const response = await fetch(`https://api-priv.onrender.com/results/user/${userId}`);
    if (!response.ok) {
        throw new Error('Error al obtener los resultados del usuario');
    }
    return response.json();
}

export async function updateScore( userId: string, testId: string, score: number) {
    const response = await fetch(`https://api-priv.onrender.com/results/updateTestResult`,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId, testId, score,
        }),
    });
    if (!response.ok) {
        console.error('Error al actualizar el resultado:', response.statusText);
    }
    return response.json();
}

export async function getByUserAndTestType(userId: string, testType: string) {
    const url = `https://api-priv.onrender.com/results/userandtype?userId=${userId}&testType=${testType}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        console.error('Error al actualizar el resultado:', response.statusText);
    }
    return response.json();
}