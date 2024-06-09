"use server"

export async function loginUser(email: string, password: string ) {
    const response = await fetch('https://api-priv.onrender.com/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
    });
    if (!response.ok) {
        const resp = await response.json();
        throw new Error(resp.error);
    }

    return response.json();
}

