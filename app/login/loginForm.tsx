"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

interface LoginFormProps {
    onSubmit: (email: string, password: string) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);  // Resetear el error al intentar nuevamente

        try {
            await onSubmit(email, password);
            router.push('/');  // Redirigir al usuario a la página principal después del login exitoso
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión');  // Manejar el error de forma adecuada
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[url('/mount.jpg')] bg-no-repeat bg-cover bg-center">
            <div className="px-8 py-6 mt-4 text-left bg-white/70 shadow-lg h-3/5">
                <h3 className="text-2xl font-bold text-center">Inicia Sesión</h3>
                <p className="text-gray-500 dark:text-gray-400">Ingresa tus datos para crear una cuenta.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <div>
                            <label className="block" htmlFor="email">Email:</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                            />
                        </div>
                        <div>
                            <label className="block" htmlFor="password">Password:</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                            />
                        </div>
                        {error && <div className="text-red-500 mt-2">{error}</div>}
                        <div className="text-center text-sm mt-2">
                            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
