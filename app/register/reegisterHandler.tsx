'use server'

export async function registerUser(user: { name: string; email: string; password: string; }) {
    const response = await fetch('https://api-priv.onrender.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        const resp = await response.json()
        throw new Error(resp.error);
    }
    return response.json();
}
