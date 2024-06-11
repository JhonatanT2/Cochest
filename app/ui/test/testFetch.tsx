'use server'

import { revalidatePath } from "next/cache";

async function fetchTestsByType(type: string) {
    const response = await fetch(`https://api-priv.onrender.com/test/tipo/${type}`);
    if (!response.ok) {
        throw new Error('Error al obtener los tests');
    }
    return response.json();
}

export default async function TestList({ type }: { type: string }) {
    const tests = await fetchTestsByType(type);
    //console.log(tests);
    revalidatePath('/examenes/B')
    return tests;
}

export async function fetchAllTests(type: string) {
    const response = await fetch(`https://api-priv.onrender.com/test/tipo/${type}`);
    if (!response.ok) {
        throw new Error('Error al obtener los tests');
    }
    return response.json();
}